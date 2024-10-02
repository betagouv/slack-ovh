const config = require("../config");
const ovh = require("ovh")(config.ovh);
const express = require("express");
const router = express.Router();
const Promise = require("bluebird");
const verification = require("../middlewares/slack");
const messages = require("../lib/messages");

// Helper function to extract mailing list name
function extractMailingListName(mailingList) {
  if (mailingList.includes("@")) {
    return mailingList.split("@'"[0]; // Extracts the part before the '@'
  }
  return mailingList; // Returns the mailing list as is if it doesn't contain '@'
}

// Helper function to extract email address
function extractEmail(email) {
  const match = email.match(/<([^>]+)>|([\w.-]+@[\w.-]+)/);
  return match ? match[1] || match[2] : email; // Returns the extracted email or the original if not found
}

const helpMessage = `Commandes disponibles:
  \t- \`/emails list\`\t\tensemble des listes de diffusions existantes
  \t- \`/emails list id_de_la_liste\`\t\tpersonnes inscrites dans la liste email_de_la_liste@domain.com
  \t- \`/emails join id_de_la_liste email_a_ajouter@domain.com\`\tinscrire email_a_ajouter@domain.com à la liste email_de_la_liste@domain.com
  \t- \`/emails leave id_de_la_liste email_a_ajouter@domain.com\`\tenlever email_a_ajouter@domain.com de la liste email_de_la_liste@domain.com

  Pour lire comment ajouter une nouvelle liste, c'est ici 👉 https://doc.incubateur.net/communaute/outils/liste-de-diffusion-et-adresses-de-contact#la-commande-slack-emails`;

const redirections = config.lists.reduce((acc, current) => {
  if (!current.realMailingList) {
    acc.push(current.id);
  }

  return acc;
}, []);

function printAndReturnError(err, res) {
  console.log(err);
  if (res) {
    return res.send(messages.error(err));
  }
}

function fillDescription(id) {
  let maillingList = config.lists.find((list) => list.id === id);

  if (!maillingList) {
    return `*${id}*: Ajoutez votre description ici 👉 https://github.com/betagouv/slack-ovh/blob/master/config.js`;
  } else {
    return `*${id}*: ${maillingList.description}`;
  }
}

function buildLongDescription(list) {
  return list.sort().reduce((acc, item) => {
    return acc + `- ${fillDescription(item)}\n`;
  }, "Listes de diffusions existantes:\n");
}

function getMailingLists() {
  return ovh
    .requestPromised("GET", `/email/domain/${config.domain}/mailingList`)
    .then((list) =>
      list.filter((l) => !l.startsWith("set-")).concat(redirections)
    )
    .then(buildLongDescription)
    .catch(printAndReturnError);
}

function getSubscribers(mailingList) {
  if (redirections.indexOf(mailingList) >= 0) {
    return getRedirections(mailingList)
      .then((list) => {
        return list.reduce((acc, item) => {
          return acc + `- ${item.to}\n`;
        }, `Personnes inscrites à ${mailingList}:\n`);
      })
      .catch(printAndReturnError);
  }
  mailingList = extractMailingListName(mailingList);
  return ovh
    .requestPromised(
      "GET",
      `/email/domain/${config.domain}/mailingList/${mailingList}/subscriber`
    )
    .then((list) => {
      return list.reduce((acc, item) => {
        return acc + `- ${item}\n`;
      }, `Personnes inscrites à ${mailingList}:\n`);
    })
    .catch(printAndReturnError);
}

function getRedirections(mailingList) {
  return ovh
    .requestPromised("GET", `/email/domain/${config.domain}/redirection`, {
      from: `${mailingList}`,
    })
    .then((redirectionIds) => {
      const mapper = (id) =>
        ovh
          .requestPromised(
            "GET",
            `/email/domain/${config.domain}/redirection/${id}`
          )
          .catch(printAndReturnError);

      return Promise.map(redirectionIds, mapper);
    })
    .catch(printAndReturnError);
}

function findExistingRedirection(email) {
  return (list) => {
    const found = list.find((redirection) => {
      return redirection.to === email;
    });

    if (!found) {
      throw {
        message: `Impossible de trouver ${email} dans cette mailing-liste.`,
      };
    }

    return found;
  };
}

function removeRedirection(redirection) {
  return ovh.requestPromised(
    "DELETE",
    `/email/domain/${config.domain}/redirection/${redirection.id}`
  );
}

function list(res, mailingList) {
  let getListPromise;

  if (mailingList) {
    getListPromise = getSubscribers(mailingList);
  } else {
    getListPromise = getMailingLists();
  }

  return getListPromise
    .then((text) => res.send(messages.ephemeral(text)))
    .catch((err) => printAndReturnError(err, res));
}

function help(res) {
  return res.send(messages.ephemeral(helpMessage));
}

function create(res, name, ownerEmail) {
  let createPromise;
  name = name.split("@")[0]; // if someone give the adress instead of the name
  ownerEmail = extractEmail(ownerEmail)
  // Subscribe from mailing-list
  createPromise = ovh
    .requestPromised("POST", `/email/domain/${config.domain}/mailingList`, {
      name,
      ownerEmail,
      language: "fr",
      options: {
        moderatorMessage: false,
        subscribeByModerator: false,
        usersPostOnly: false,
      },
    })
    .catch((err) => printAndReturnError(err, res));

  const successText = `Creation de *${name}* réussie.`;

  return createPromise
    .then(() => res.send(messages.inChannel(successText)))
    .catch((err) => printAndReturnError(err, res));
}

function del(res, mailingList) {
  let deletePromise;
  mailingList = mailingList.split("@")[0]; // if someone give the adress instead of the name
  // Subscribe from mailing-list
  deletePromise = ovh
    .requestPromised(
      "DELETE",
      `/email/domain/${config.domain}/mailingList/${mailingList}`
    )
    .catch((err) => printAndReturnError(err, res));

  const successText = `Suppresion de *${mailingList}* réussie.`;

  return deletePromise
    .then(() => res.send(messages.inChannel(successText)))
    .catch((err) => printAndReturnError(err, res));
}

function join(res, mailingList, email) {
  let subscribePromise;
  email = extractEmail(email);

  const isSpecial = redirections.find((item) => item === mailingList);
  if (isSpecial) {
    // Add redirection
    console.log(
      `${mailingList} is not an OVH mailing-list, adding redirection`
    );
    subscribePromise = ovh
      .requestPromised("POST", `/email/domain/${config.domain}/redirection`, {
        from: isSpecial,
        to: email,
        localCopy: false,
      })
      .catch((err) => res.send(messages.error(err)));
  } else {
    // Subscribe from mailing-list
    mailingList = extractMailingListName(mailingList)
    subscribePromise = ovh
      .requestPromised(
        "POST",
        `/email/domain/${config.domain}/mailingList/${mailingList}/subscriber`,
        { email }
      )
      .catch((err) => printAndReturnError(err, res));
  }

  const successText = `Inscription de *${email}* à la liste *${mailingList}* réussie.`;

  return subscribePromise
    .then(() => res.send(messages.inChannel(successText)))
    .catch((err) => printAndReturnError(err, res));
}

function leave(res, mailingList, email) {
  let leavePromise;
  email = extractEmail(email);
  if (redirections.indexOf(mailingList) >= 0) {
    // Remove redirection
    leavePromise = getRedirections(mailingList)
      .then(findExistingRedirection(email))
      .then(removeRedirection);
  } else {
    // Unsubscribe from mailing-list
    mailingList = extractMailingListName(mailingList)
    leavePromise = ovh.requestPromised(
      "DELETE",
      `/email/domain/${config.domain}/mailingList/${mailingList}/subscriber/${email}`
    );
  }

  const successText = `Désinscription de *${email}* à la liste *${mailingList}* réussie.`;

  return leavePromise
    .then(() => res.send(messages.inChannel(successText)))
    .catch((err) => printAndReturnError(err, res));
}

router.post("/", verification, function (req, res, next) {
  console.log("POST")
  console.info(JSON.stringify(req.body));
  if (!req.body || !req.body.text) {
    return help(res);
  }
  console.log("Received command: " + req.body.text);
  let [cmd, mailingList, email] = req.body.text
    .replace(/\s\s+/g, " ")
    .trim()
    .split(" ");

  let access_control = process.env.ACCESS_CONTROLS
    ? JSON.parse(process.env.ACCESS_CONTROLS)
    : null;
  if (access_control && mailingList && access_control["lists"][mailingList]) {
    let list_access = access_control["lists"][mailingList];
    if (
      list_access.allowusers &&
      !list_access.allowusers.includes(req.body.user_name)
    ) {
      return printAndReturnError(
        "Utilisateur non autorisé sur cette mailing liste",
        res
      );
    }
  }

  if (access_control && access_control["cmd"]) {
    let cmd_access = access_control["cmd"][cmd];
    console.log(cmd, cmd_access, access_control["cmd"]);
    if (
      cmd_access &&
      cmd_access.allowusers &&
      !cmd_access.allowusers.includes(req.body.user_name)
    ) {
      return printAndReturnError(
        "Utilisateur non autorisé sur cette commande",
        res
      );
    }
  }

  switch (cmd) {
    case "join":
      console.log("Interpreted command as `join`");
      return join(res, mailingList, email);
    case "leave":
      console.log("Interpreted command as `leave`");
      return leave(res, mailingList, email);
    case "create":
      console.log("Interpreted command as `create`");
      return create(res, mailingList, email);
    case "list":
      console.log("Interpreted command as `list`");
      return list(res, mailingList);
    case "delete":
      console.log("Interpreted command as `delete`");
      return del(res, mailingList);
    default:
      console.log("Command unknown, returning help");
      return help(res);
  }
});

module.exports = router;
