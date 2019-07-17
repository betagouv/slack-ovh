const config = {
  token: process.env.SLACK_TOKEN,
  ovh: {
    appKey: process.env.OVH_APP_KEY,
    appSecret: process.env.OVH_APP_SECRET,
    consumerKey: process.env.OVH_CONSUMER_KEY
  },
  domain: process.env.DOMAIN,
  slackChannel: "incubateur-secretaria",
  lists: [
    {
      id: "aide-territoires@beta.gouv.fr",
      description:
        "Equipe Aides Territoires",
      realMailingList: true
    },
    {
      id: "alpha",
      description:
        "La formation à destination des acteurs de l'innovation du secteur public",
      realMailingList: true
    },
    {
      id: "alumni",
      description:
        'Tous les membres de la partie "Alumni" de beta.gouv.fr/communaute',
      realMailingList: true
    },
    {
      id: "andi",
      description:
        "Equipe Andi",
      realMailingList: true
    },
    {
      id: "codedutravail@beta.gouv.fr",
      description: "Equipe code du travail numérique"
    },
    {
      id: "compta",
      description: "Achats, facturation, refacturation...",
      realMailingList: true
    },
    {
      id: "contact",
      description:
        "Toutes demandes entrantes. Stratégie. Pour les membres volontaires",
      realMailingList: true
    },
    {
      id: "contact@action-bidonvilles.beta.gouv.fr",
      description: "L'équipe de la startup Action bidonvilles"
    },
    {
      id: "contact@adock.beta.gouv.fr",
      description: "Liste des redirections sur contact@adock.beta.gouv.fr"
    },
    {
      id: "contact@aplus.beta.gouv.fr",
      description: "Liste des redirections sur contact@aplus.beta.gouv.fr"
    },
    {
      id: "contact@beta.gouv.fr",
      description: "Liste des contacts sur beta.gouv.fr"
    },
    {
      id: "contact@civils-de-la-defense.beta.gouv.fr",
      description: "Liste de diffusion pour l'équipe Civils de la défense"
    },
    {
      id: "contact@code-du-travail.beta.gouv.fr",
      description: "L'équipe du code du travail numérique"
    },
    {
      id: "contact@covoiturage.beta.gouv.fr",
      description: "L'équipe de la preuve de covoiturage"
    },
    {
      id: "contact@domifa.beta.gouv.fr",
      description: "L'équipe DomiFa"
    },
    {
      id: "contact@dossiersco.beta.gouv.fr",
      description: "L'équipe DossierSCO"
    },
    {
      id: "contact@embauche.beta.gouv.fr",
      description: "Toute demande entrante pour embauche.beta.gouv.fr"
    },
    {
      id: "contact@emjpm.beta.gouv.fr",
      description: "Liste des redirections sur contact@emjpm.beta.gouv.fr"
    },
    {
      id: "contact@filharmonic.beta.gouv.fr",
      description: "Liste des redirections sur contact@filharmonic.beta.gouv.fr"
    },
    {
      id: "contact@fluctuat.beta.gouv.fr",
      description: "Liste des redirections sur contact@fluctuat.beta.gouv.fr"
    },
    {
      id: "contact@kelrisks.beta.gouv.fr",
      description: "Liste des redirections sur contact@kelrisks.beta.gouv.fr"
    },
    {
      id: "contact@lebontuteur.beta.gouv.fr",
      description: "Liste des redirections sur contact@lebontuteur.beta.gouv.fr"
    },
    {
      id: "contact@locatio.beta.gouv.fr",
      description: "Liste des redirections sur contact@locatio.beta.gouv.fr"
    },
    {
      id: "contact@mobilot.beta.gouv.fr",
      description: "Toute demande entrante pour Mobilot"
    },
    {
      id: "contact@mon-entreprise.beta.gouv.fr",
      description: "Toute demande entrante pour mon-entreprise.fr"
    },
    {
      id: "contact@openacademie.beta.gouv.fr",
      description:
        "Des solutions numériques pour l’administration scolaire, openacademie.beta.gouv.fr"
    },
    {
      id: "contact@place-des-entreprises.beta.gouv.fr",
      description:
        "Liste des redirections sur contact@place-des-entreprises.beta.gouv.fr"
    },
    {
      id: "contact@reso.beta.gouv.fr",
      description: "Liste des redirections sur contact@reso.beta.gouv.fr"
    },
    {
      id: "contact@signalconso.beta.gouv.fr",
      description: "L'équipe SignalConso (ex-Signalement)"
    },
    {
      id: "contact@signalement.beta.gouv.fr",
      description: "Liste des redirections sur contact@signalement.beta.gouv.fr"
    },
    {
      id: "contact@signaux-faibles.beta.gouv.fr",
      description:
        "Liste des redirections sur contact@signaux-faibles.beta.gouv.fr"
    },
    {
      id: "contact@transport.beta.gouv.fr",
      description: "Liste des redirections sur transport.beta.gouv.fr"
    },
    {
      id: "contact@tremplin.beta.gouv.fr",
      description: "L'équipe Tremplin"
    },
    {
      id: "contact@voir-et-localiser.beta.gouv.fr",
      description: "Toute demande entrante pour Voir et Localiser"
    },
    {
      id: "contact@workinfrance.beta.gouv.fr",
      description:
        "Liste des redirections pour contact et support de l'équipe sur contact@workinfrance.beta.gouv.fr"
    },
    {
      id: "contact@zam.beta.gouv.fr",
      description: "Toute demande entrante pour Zam"
    },
    {
      id: "deploiement@transport.beta.gouv.fr",
      description: "Liste pour les bizdev transport.data.gouv.fr "
    },
    {
      id: "dinsic",
      description:
        "Rares éléments administratifs nécessitant un lien contractuel (fiches de paie, gestion des ordres de mission…).",
      realMailingList: true
    },
    {
      id: "e-controle",
      description: "Liste pour les membres de la SE e-controle",
      realMailingList: true
    },
    {
      id: "incubateur",
      description:
        "Tous les membres ayant un contrat en cours sur beta.gouv.fr/communaute",
      realMailingList: true
    },
    {
      id: "openacademie",
      description:
        "Des solutions numériques pour l’administration scolaire, openacademie.beta.gouv.fr",
      realMailingList: true
    },
    {
      id: "passculture-bizdev@beta.gouv.fr",
      description: "Les bizdevs du pass culture"
    },
    {
      id: "preincubation",
      description: "Échanges sur la préincubation.",
      realMailingList: true
    },
    {
      id: "recrutement",
      description: "Tous les recrutements de beta.gouv.fr",
      realMailingList: true
    }
  ]
};

module.exports = config;
