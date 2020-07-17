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
      id: "acceslibre",
      description:
        "Equipe AccesLibre",
      realMailingList: true
    },
    {
      id: "aidantsconnect",
      description:
        "Equipe Aidants Connect",
      realMailingList: true
    },
    {
      id: "aide-territoires",
      description:
        "Equipe Aides Territoires",
      realMailingList: true
    },
    {
      id: "alpha",
      description:
        "Prises de contact externes pour la formation à destination des acteurs de l'innovation du secteur public",
      realMailingList: true
    },
    {
      id: "alumni",
      description:
        'Tous les membres de la partie "Alumni" de beta.gouv.fr/communaute, ajoutés automatiquement par le bot',
      realMailingList: true
    },
    {
      id: "andi",
      description:
        "Equipe Andi",
      realMailingList: true
    },
    {
      id: "biodiversite",
      description:
        "Equipe Biodiversite",
      realMailingList: true
    },
    {
      id: "camino",
      description:
        "Equipe Camino",
      realMailingList: true
    },
    {
      id: "cartobio",
      description:
        "Equipe CartoBio",
      realMailingList: true
    },
    {
      id: "coachs",
      description: "Partage d'informations des coachs",
      realMailingList: true
    },
    {
      id: "codedutravail",
      description: "Equipe code du travail numérique",
      realMailingList: true
    },
    {
      id: "compta",
      description: "Achats, facturation, refacturation...",
      realMailingList: true
    },
    {
      id: "contact",
      description:
        "Toutes demandes entrantes à la communauté beta.gouv.fr.",
      realMailingList: true
    },
    {
      id: "contact@aplus.beta.gouv.fr",
      description: "Liste des redirections sur contact@aplus.beta.gouv.fr"
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
      id: "contact@domifa.beta.gouv.fr",
      description: "L'équipe DomiFa"
    },
    {
      id: "contact@ecolab.beta.gouv.fr",
      description: "L'équipe Ecolab"
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
      id: "dinum",
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
      id: "fast",
      description: "Demandes entrantes des appels à candidature FAST",
      realMailingList: true
    },
    {
      id: "incubateur",
      description:
        "Tous les membres ayant un contrat en cours sur beta.gouv.fr/communaute",
      realMailingList: true
    },
    {
      id: "investigations",
      description:
        "Contacts entrants de l'équipe investigations",
      realMailingList: true
    },
    {
      id: "lapins",
      description: "Liste pour les membres de la Startup d'État Lapins",
      realMailingList: true
    },
    {
      id: "mobilic",
      description:
        "Equipe Mobilic",
      realMailingList: true
    },
    {
      id: "openacademie",
      description:
        "Des solutions numériques pour l’administration scolaire, openacademie.beta.gouv.fr",
      realMailingList: true
    },
    {
      id: 'partenaires',
      description: 'Contacts des incubateurs partenaires de la communauté beta.gouv.fr',
      realMailingList: true
    },
    {
      id: "passculture",
      description: "Équipe du pass culture",
      realMailingList: true
    },
    {
      id: "passculture-bizdev@beta.gouv.fr",
      description: "Les bizdevs du pass culture"
    },
    {
      id: "passculture-dev@beta.gouv.fr",
      description: "Les devs du pass culture"
    },
    {
      id: "peps",
      description:
        "Equipe PEPS",
      realMailingList: true
    },
    {
      id: "plante-et-moi",
      description:
        "Equipe Plante et Moi",
      realMailingList: true
    },
    {
      id: "poubelles-battle",
      description:
        "Equipe Pouvelles Battle",
      realMailingList: true
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
    },
    {
      id: "recrutement-mineco",
      description: "Les recrutements des MEF",
      realMailingList: true
    },
    {
      id: "secretariat",
      description:
        "Equipe PEPS",
      realMailingList: true
    },
    {
      id: "snu",
      description:
        "Equipe SNU",
      realMailingList: true
    },
    {
      id: "solidarite-fde",
      description:
        "Equipe Solidarite FDE",
      realMailingList: true
    }
  ]
};

module.exports = config;
