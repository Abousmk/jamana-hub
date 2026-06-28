"use client";

import { createContext, useContext, useEffect, useState } from "react";

const translations = {
  fr: {
    nav: {
      accueil: "Accueil",
      hub: "Hub",
      media: "Média",
      postuler: "Postuler",
    },
    hub: {
      sections: {
        manifeste: "Manifeste",
        ecosysteme: "Écosystème",
        realite: "Réalité",
        selection: "Sélection",
      },
      sectionHeadings: {
        manifeste: {
          title: "Nos convictions",
          subtitle: "La foi, l'ambition et l'excellence guident tout ce qu'on construit.",
        },
        realite: {
          title: "Une réalité qui parle",
          subtitle: "Ces chiffres montrent l'écart. Et pourquoi on ne peut pas attendre.",
        },
        selection: {
          title: "Pas pour tout le monde",
          subtitle: "Pour ceux qui partagent la même vision.",
        },
      },
      ecosystem: {
        eyebrow: "Écosystème",
        title: "Ce qu'on bâtit",
        subtitle:
          "Quatre piliers en construction. Ils grandiront avec la communauté.",
      },
    },
    stats: {
      eyebrow: "Chiffres",
      title: "Les chiffres de notre communauté",
      subtitle: "Recensement 2021, Statistique Canada",
      source: "Statistique Canada, Recensement 2021",
      items: [
        {
          number: "421 000+",
          label: "musulmans au Québec",
          description: "Une communauté jeune et en pleine croissance.",
        },
        {
          number: "91 %",
          label: "dans le Grand Montréal",
          description: "Une concentration urbaine qui appelle des solutions locales.",
        },
        {
          number: "30 ans",
          label: "âge médian",
          description: "vs 41 ans pour la population générale québécoise.",
        },
        {
          number: "17,1 %",
          label: "chômage jeunes musulmans",
          description: "vs 7,2 % pour l'ensemble de la population.",
        },
        {
          number: "53 %",
          label: "sous leur niveau de compétence",
          description: "Plus de la moitié sont déqualifiés sur le marché du travail.",
        },
        {
          number: "2×",
          label: "moins de rappels à CV égal",
          description: "Un candidat québécois d'origine est rappelé deux fois plus souvent.",
        },
      ],
    },
    selection: {
      title: "Pas pour tout le monde",
      lead: "Jamana Hub n'est pas ouvert à tous.",
      body: "On rassemble des gens qui partagent nos valeurs : foi sincère, ambition concrète, engagement réel. Ce n'est pas de l'arrogance. C'est protéger un espace où chacun peut grandir sans trahir ce qui compte.",
      closing:
        "Si cette vision vous parle, vous êtes peut-être au bon endroit.",
      cta: "Candidater",
    },
    hero: {
      eyebrow: "Foi · Ambition · Excellence",
      title: "Le réseau de ceux qui bâtissent sans se renier.",
      subtitle:
        "Des jeunes professionnels et entrepreneurs musulmans qui avancent sans renier leurs valeurs.",
      scrollLabel: "Découvrir le Hub",
    },
    bridge: {
      scrollFloat: "Tout Jamana, en un coup d'œil",
    },
    intro: {
      eyebrow: "À propos",
      title: "Plus qu'un réseau. Un mouvement.",
      body: "Jamana Hub rassemble la communauté musulmane autour du réseautage, du savoir et de l'entrepreneuriat éthique. Lancé par de jeunes entrepreneurs africains canadiens, au Québec.",
      caption: "Jamana Networking Summit · Montréal",
    },
    prob: {
      eyebrow: "Le problème",
      title: "Une réalité qui parle.",
      lead: "La jeunesse musulmane du Québec a du talent et de l'ambition. Mais elle bute sur des obstacles réels.",
      stats: [
        {
          n: "17,1%",
          l: "de chômage chez les jeunes musulmans",
          s: "Presque trois fois la moyenne québécoise (7,2 %).",
        },
        {
          n: "53%",
          l: "travaillent sous leur niveau de compétence",
          s: "Plus de la moitié sont déqualifiés.",
        },
        {
          n: "2×",
          l: "moins de rappels à CV égal",
          s: "Un Québécois d'origine est rappelé deux fois plus souvent.",
        },
        {
          n: "0",
          l: "réseau professionnel musulman au Québec",
          s: "Aucune plateforme dédiée n'existe aujourd'hui.",
        },
      ],
      close: "Jamana Hub existe pour combler ce fossé.",
      cta: "Faire partie de la solution",
    },
    glance: {
      eyebrow: "Chiffres",
      title: "Un espace vierge, une génération prête.",
      lead: "Au Québec, plus de 421 000 musulmans. Jeunes, qualifiés, et sans plateforme dédiée.",
      stats: [
        { n: "421", suf: "K+", l: "Musulmans au Québec" },
        { n: "91", suf: "%", l: "dans le Grand Montréal" },
        { n: "30", suf: " ans", l: "âge médian (vs 41)" },
        {
          n: "10–20",
          suf: "K",
          l: "jeunes ciblés (5–10 % de la jeunesse du Grand Montréal)",
        },
      ],
      note: "Source : Statistique Canada, Recensement 2021",
    },
    eco: {
      eyebrow: "Écosystème",
      title: "Quatre piliers, une trajectoire.",
      cards: [
        {
          k: "Jamana Rezo",
          t: "Réseautage",
          d: "Reverse networking, speed mentoring, panels et connexions intergénérationnelles.",
        },
        {
          k: "Jamana Academy",
          t: "Formation",
          d: "Leadership halal, finances islamiques, personal branding et développement professionnel.",
        },
        {
          k: "Jamana Media",
          t: "Storytelling",
          d: "Contenu inspirant, témoignages de réussite et capsules éducatives.",
        },
        {
          k: "Jamana Global",
          t: "Mobilité",
          d: "Placement et opportunités d'affaires vers les pays musulmans.",
        },
      ],
    },
    unique: {
      eyebrow: "Positionnement unique",
      title: "Un océan bleu au Québec.",
      caption: "Brotherhood Night · networking fraternel",
      points: [
        {
          t: "Aucun concurrent direct",
          d: "Le networking professionnel musulman au Québec est un espace vierge. Jamana l'occupe.",
        },
        {
          t: "Foi et excellence, ensemble",
          d: "Chaque activité s'ancre dans nos valeurs, de la salat aux partenariats 100 % halal.",
        },
        {
          t: "Pipeline vers le monde musulman",
          d: "Jamana Global crée un corridor unique entre les talents québécois et les opportunités internationales.",
        },
      ],
    },
    bento: {
      eyebrow: "Le Hub",
      title: "Tout Jamana, en un coup d'œil",
      subtitle:
        "Manifeste, écosystème, réalité, engagement. Tout en un coup d'œil.",
      cards: [
        {
          section: "manifeste",
          cardKey: "about",
          label: "À propos",
          title: "Qu'est-ce que Jamana Hub ?",
          description:
            "Un écosystème musulman pour grandir. Plus qu'un simple réseau.",
          variant: "hero",
        },
        {
          section: "manifeste",
          label: "Manifeste",
          title: "Foi · Ambition · Excellence",
          description:
            "Trois piliers qui guident nos activités, nos partenariats, nos choix.",
        },
        {
          section: "manifeste",
          label: "Manifeste",
          title: "Excellence exigée",
          description:
            "On refuse la médiocrité. On vise l'excellence dans nos carrières et nos affaires.",
        },
        {
          section: "manifeste",
          cardKey: "manifeste",
          id: "manifeste",
          label: "Manifeste",
          title: "Bâtir sans se renier",
          description:
            "Aucun rêve ne se réalise seul. La réussite, ça se construit ensemble.",
          variant: "hero",
        },
        {
          section: "ecosysteme",
          label: "Écosystème",
          title: "Jamana Rezo",
          description:
            "Réseautage en construction : reverse networking, mentoring et connexions intergénérationnelles.",
        },
        {
          section: "ecosysteme",
          label: "Écosystème",
          title: "Jamana Academy",
          description:
            "Formation à venir : leadership halal, finances islamiques et développement professionnel.",
        },
        {
          section: "ecosysteme",
          label: "Écosystème",
          title: "Jamana Media",
          description:
            "Série documentaire en préparation. Des portraits de parcours, bientôt.",
          href: "/media",
        },
        {
          section: "ecosysteme",
          label: "Écosystème",
          title: "Jamana Global",
          description:
            "Mobilité à développer : placement et opportunités vers les pays musulmans.",
        },
      ],
    },
    testimonials: {
      eyebrow: "Témoignages",
      title: "Les voix de notre communauté, bientôt",
      message:
        "Des témoignages de membres Jamana Hub arriveront ici. On ne publie que des mots vrais.",
      hint: "Vous pourriez être parmi les premières voix.",
      cta: "Postuler",
    },
    mediaPage: {
      eyebrow: "Jamana Media",
      title: "Bientôt disponible.",
      intro:
        "Jamana Media, c'est une série documentaire sur des jeunes musulmans qui réussissent sans trahir leurs valeurs. Chaque épisode parle de foi, d'ambition et d'excellence au quotidien.",
      episodesNote:
        "Les premiers épisodes seront annoncés sur nos réseaux.",
      instagram: "Instagram",
      email: "Nous écrire",
      contact: {
        title: "Envie de collaborer ?",
        intro:
          "Vous souhaitez partager votre histoire, contribuer en tant que vidéaste ou explorer un partenariat ? Écrivez-nous.",
        fields: {
          name: "Nom",
          email: "Email",
          type: "Type",
          message: "Message",
        },
        types: [
          { value: "filme", label: "Être filmé" },
          { value: "videaste", label: "Vidéaste" },
          { value: "partenariat", label: "Partenariat" },
          { value: "autre", label: "Autre" },
        ],
        submit: "Envoyer",
        sending: "Envoi en cours…",
        success: "Message envoyé. Merci, on vous répond bientôt.",
        errors: {
          name: "Veuillez entrer votre nom.",
          email: "Veuillez entrer une adresse courriel valide.",
          message: "Veuillez écrire un message.",
          generic: "Une erreur est survenue. Réessayez ou contactez-nous par courriel.",
        },
      },
    },
    closer: {
      line: [
        "Jamana n'est pas pour tout le monde.",
        "Mais pour le bon profil, ça change tout.",
      ],
      cta: "Rejoindre le mouvement",
    },
    foot: {
      tag: "Unis par la foi, guidés par l'excellence.",
      nav: "Naviguer",
      follow: "Suivre",
      comingSoon: "YouTube · TikTok · bientôt",
      rights: "Tous droits réservés.",
    },
    footer: {
      tagline: "Foi · Ambition · Excellence",
      rights: "Tous droits réservés.",
      links: {
        accueil: "Accueil",
        hub: "Hub",
        media: "Média",
        postuler: "Postuler",
      },
    },
    tally: {
      title: "Candidature Jamana Hub",
      close: "Fermer le formulaire",
    },
    postuler: {
      title: "Postuler à Jamana Hub",
      back: "Retour à l'accueil",
    },
  },
  en: {
    nav: {
      accueil: "Home",
      hub: "Hub",
      media: "Media",
      postuler: "Apply",
    },
    hub: {
      sections: {
        manifeste: "Manifesto",
        ecosysteme: "Ecosystem",
        realite: "Reality",
        selection: "Selection",
      },
      sectionHeadings: {
        manifeste: {
          title: "Our convictions",
          subtitle: "Faith, ambition, and excellence guide everything we build.",
        },
        realite: {
          title: "A reality that speaks",
          subtitle: "These numbers show the gap. And why we can't wait.",
        },
        selection: {
          title: "Not for everyone",
          subtitle: "For those who share the same vision.",
        },
      },
      ecosystem: {
        eyebrow: "Ecosystem",
        title: "What we're building",
        subtitle:
          "Four pillars in development. They'll grow with the community.",
      },
    },
    stats: {
      eyebrow: "Numbers",
      title: "Our community in numbers",
      subtitle: "2021 Census, Statistics Canada",
      source: "Statistics Canada, 2021 Census",
      items: [
        {
          number: "421,000+",
          label: "Muslims in Quebec",
          description: "A young, fast-growing community.",
        },
        {
          number: "91%",
          label: "in Greater Montreal",
          description: "An urban concentration that calls for local solutions.",
        },
        {
          number: "30 yrs",
          label: "median age",
          description: "vs 41 years for Quebec's general population.",
        },
        {
          number: "17.1%",
          label: "unemployment among Muslim youth",
          description: "vs 7.2% for the population as a whole.",
        },
        {
          number: "53%",
          label: "work below their skill level",
          description: "More than half are underemployed in the labour market.",
        },
        {
          number: "2×",
          label: "fewer callbacks for equal resumes",
          description: "A Quebec-born candidate gets called back twice as often.",
        },
      ],
    },
    selection: {
      title: "Not for everyone",
      lead: "Jamana Hub is not open to everyone.",
      body: "We bring together people who share our values: sincere faith, real ambition, genuine commitment. This isn't arrogance. It's protecting a space where everyone can grow without betraying what matters.",
      closing: "If this vision speaks to you, you might be in the right place.",
      cta: "Apply now",
    },
    hero: {
      eyebrow: "Faith · Ambition · Excellence",
      title: "The network for those who build without compromise.",
      subtitle:
        "Young Muslim professionals and entrepreneurs moving forward without giving up their values.",
      scrollLabel: "Explore the Hub",
    },
    bridge: {
      scrollFloat: "All of Jamana, at a glance",
    },
    intro: {
      eyebrow: "About",
      title: "More than a network. A movement.",
      body: "Jamana Hub brings the Muslim community together through networking, knowledge, and ethical entrepreneurship. Started by young African-Canadian entrepreneurs in Quebec.",
      caption: "Jamana Networking Summit · Montreal",
    },
    prob: {
      eyebrow: "The problem",
      title: "A reality that speaks.",
      lead: "Quebec's Muslim youth has talent and drive. But real obstacles stand in the way.",
      stats: [
        {
          n: "17.1%",
          l: "unemployment among Muslim youth",
          s: "Nearly three times Quebec's average (7.2%).",
        },
        {
          n: "53%",
          l: "work below their skill level",
          s: "More than half are underemployed.",
        },
        {
          n: "2×",
          l: "fewer callbacks for equal resumes",
          s: "A Quebec-born candidate gets called back twice as often.",
        },
        {
          n: "0",
          l: "dedicated Muslim professional network in Quebec",
          s: "No dedicated platform exists today.",
        },
      ],
      close: "Jamana Hub exists to close that gap.",
      cta: "Be part of the solution",
    },
    glance: {
      eyebrow: "Numbers",
      title: "An open space, a generation ready.",
      lead: "In Quebec, over 421,000 Muslims. Young, qualified, and without a dedicated platform.",
      stats: [
        { n: "421", suf: "K+", l: "Muslims in Quebec" },
        { n: "91", suf: "%", l: "in Greater Montreal" },
        { n: "30", suf: " yrs", l: "median age (vs 41)" },
        {
          n: "10–20",
          suf: "K",
          l: "young people targeted (5–10% of Greater Montreal youth)",
        },
      ],
      note: "Source: Statistics Canada, 2021 Census",
    },
    eco: {
      eyebrow: "Ecosystem",
      title: "Four pillars, one trajectory.",
      cards: [
        {
          k: "Jamana Rezo",
          t: "Networking",
          d: "Reverse networking, speed mentoring, panels and intergenerational connections.",
        },
        {
          k: "Jamana Academy",
          t: "Training",
          d: "Halal leadership, Islamic finance, personal branding and professional development.",
        },
        {
          k: "Jamana Media",
          t: "Storytelling",
          d: "Inspiring content, success testimonials and educational capsules.",
        },
        {
          k: "Jamana Global",
          t: "Mobility",
          d: "Placement and business opportunities toward Muslim countries.",
        },
      ],
    },
    unique: {
      eyebrow: "Unique positioning",
      title: "A blue ocean in Quebec.",
      caption: "Brotherhood Night · fraternal networking",
      points: [
        {
          t: "No direct competitor",
          d: "Muslim professional networking in Quebec is wide open. Jamana fills it.",
        },
        {
          t: "Faith and excellence, together",
          d: "Every activity is rooted in our values, from salat to 100% halal partnerships.",
        },
        {
          t: "Pipeline to the Muslim world",
          d: "Jamana Global creates a unique corridor between Quebec talent and international opportunities.",
        },
      ],
    },
    bento: {
      eyebrow: "The Hub",
      title: "All of Jamana at a glance",
      subtitle:
        "Manifesto, ecosystem, reality, commitment. All in one glance.",
      cards: [
        {
          section: "manifeste",
          cardKey: "about",
          label: "About",
          title: "What is Jamana Hub?",
          description:
            "A Muslim ecosystem for growth. More than just a network.",
          variant: "hero",
        },
        {
          section: "manifeste",
          label: "Manifesto",
          title: "Faith · Ambition · Excellence",
          description:
            "Three pillars that guide our activities, partnerships, and choices.",
        },
        {
          section: "manifeste",
          label: "Manifesto",
          title: "Excellence required",
          description:
            "We refuse mediocrity. We aim for excellence in our careers and businesses.",
        },
        {
          section: "manifeste",
          cardKey: "manifeste",
          id: "manifeste",
          label: "Manifesto",
          title: "Build without compromise",
          description: "No dream happens alone. Success is built together.",
          variant: "hero",
        },
        {
          section: "ecosysteme",
          label: "Ecosystem",
          title: "Jamana Rezo",
          description:
            "Networking in development: reverse networking, mentoring, and intergenerational connections.",
        },
        {
          section: "ecosysteme",
          label: "Ecosystem",
          title: "Jamana Academy",
          description:
            "Training coming soon: halal leadership, Islamic finance, and professional development.",
        },
        {
          section: "ecosysteme",
          label: "Ecosystem",
          title: "Jamana Media",
          description:
            "Documentary series in the works. Journey portraits, coming soon.",
          href: "/media",
        },
        {
          section: "ecosysteme",
          label: "Ecosystem",
          title: "Jamana Global",
          description:
            "Mobility in development: placement and opportunities toward Muslim countries.",
        },
      ],
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "Voices from our community, coming soon",
      message:
        "Testimonials from Jamana Hub members will land here. We only publish words that are true.",
      hint: "You could be among the first voices.",
      cta: "Apply",
    },
    mediaPage: {
      eyebrow: "Jamana Media",
      title: "Coming soon.",
      intro:
        "Jamana Media is a documentary series about young Muslims succeeding without betraying their values. Each episode covers faith, ambition, and excellence in everyday life.",
      episodesNote:
        "First episodes will be announced on our social channels.",
      instagram: "Instagram",
      email: "Email us",
      contact: {
        title: "Want to collaborate?",
        intro:
          "Want to share your story, contribute as a videographer, or explore a partnership? Get in touch.",
        fields: {
          name: "Name",
          email: "Email",
          type: "Type",
          message: "Message",
        },
        types: [
          { value: "filme", label: "Be filmed" },
          { value: "videaste", label: "Videographer" },
          { value: "partenariat", label: "Partnership" },
          { value: "autre", label: "Other" },
        ],
        submit: "Send",
        sending: "Sending…",
        success: "Message sent. Thanks, we'll be in touch soon.",
        errors: {
          name: "Please enter your name.",
          email: "Please enter a valid email address.",
          message: "Please write a message.",
          generic: "Something went wrong. Try again or email us directly.",
        },
      },
    },
    closer: {
      line: [
        "Jamana is not for everyone.",
        "But for the right profile, it changes everything.",
      ],
      cta: "Join the movement",
    },
    foot: {
      tag: "United by faith, guided by excellence.",
      nav: "Navigate",
      follow: "Follow",
      comingSoon: "YouTube · TikTok · coming soon",
      rights: "All rights reserved.",
    },
    footer: {
      tagline: "Faith · Ambition · Excellence",
      rights: "All rights reserved.",
      links: {
        accueil: "Home",
        hub: "Hub",
        media: "Media",
        postuler: "Apply",
      },
    },
    tally: {
      title: "Jamana Hub Application",
      close: "Close form",
    },
    postuler: {
      title: "Apply to Jamana Hub",
      back: "Back to home",
    },
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState("fr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("jamana-lang");
    if (saved === "fr" || saved === "en") {
      setLangState(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang;
    localStorage.setItem("jamana-lang", lang);
  }, [lang, mounted]);

  const setLang = (newLang) => {
    if (newLang === "fr" || newLang === "en") {
      setLangState(newLang);
    }
  };

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within LangProvider");
  }
  return context;
}
