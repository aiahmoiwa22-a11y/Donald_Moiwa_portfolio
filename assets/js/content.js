/* =====================================================================
   PORTFOLIO CONTENT — edit this file to update the website.
   ---------------------------------------------------------------------
   Everything you see on the site comes from here. You never need to
   touch the HTML or CSS to change your text, projects or links.

   HOW DRAFTS WORK
   • Any item with `draft: true` is hidden on the live site.
   • Open the site with ?preview at the end of the URL
     (e.g. https://…/index.html?preview) to see drafts, marked in orange,
     so you can check how they will look before publishing them.
   • A section with nothing published in it (for example Experience)
     disappears from the page and from the menu automatically.
   • To publish something: fill in the real details, then delete the
     `draft: true` line.

   RULE OF THUMB: only publish things that are true and you can back up.
   ===================================================================== */

window.PORTFOLIO = {
  /* ---------------- Identity ---------------- */
  person: {
    name: "Aiah Donald Moiwa",
    shortName: "Donald Moiwa",
    initials: "DM",
    title: "Software Engineer",
    location: "Moscow, Russia",
    availability: "Open to opportunities",
    // Set to false to hide the availability card.
    showAvailability: true,
    email: "aiahmoiwa22@gmail.com",
    phone: "+7 933 721 0103", // set to "" to hide
    whatsapp: "https://wa.me/79337210103",
    portrait: "assets/img/portrait",           // .webp + .jpg are both used
    portraitAlt: "Portrait of Aiah Donald Moiwa",
    // Put your CV in assets/ and set the path, e.g. "assets/Donald-Moiwa-CV.pdf".
    // Leave it "" and every "Download resume" button stays hidden.
    resume: "",
  },

  social: {
    github: "https://github.com/aiahmoiwa22-a11y",
    githubUser: "aiahmoiwa22-a11y", // used to load your live repositories
    linkedin: "https://www.linkedin.com/in/aiah-moiwa-3b7937400",
    instagram: "https://www.instagram.com/moiwa22",
    youtube: "https://youtube.com/@yannahtvofficial",
    facebook: "https://www.facebook.com/aiah.moiwa",
  },

  /* ---------------- Hero ---------------- */
  hero: {
    // The giant two-line title. Keep each word short (8–9 letters max).
    bigTitle: ["Software", "Engineer"],
    // Small line above the giant title.
    headline: "Engineering scalable solutions. Building meaningful digital experiences.",
    intro:
      "I build modern web applications, work through complex problems, and care about software that is efficient, scalable and pleasant to use.",
    // Photo behind the whole hero (a dark green tint is laid over it so the
    // title stays readable). Use the full file name incl. extension. Set to "" for the plain green background.
    background: "assets/img/hero-background.jpg",
    // Cut-out photo (transparent background) shown over the title.
    // Either a full file name ("assets/img/me.jpg") or a base name with matching
    // .webp + .png files ("assets/img/portrait-cutout"). Also update index.html (preload + <img>) to match.
    cutout: "assets/img/profile-cutout",
    // Badge on the right of the photo. Set `show: false` to hide it.
    badge: { show: true, small: "Available for", big: "Opportunities", note: "Based in Moscow" },
    // The strip along the bottom of the hero. icon = any name in icons.js.
    cards: [
      { icon: "code-xml", value: "Focus", label: "Web & applications" },
      { icon: "layers", value: "Stack", label: "JavaScript · React · Python" },
      { icon: "clapperboard", value: "Founder", label: "Yannah's Studios" },
      { icon: "map-pin", value: "Based in", label: "Moscow, Russia" },
    ],
  },

  /* ---------------- About ---------------- */
  about: {
    image: "assets/img/about",
    imageAlt: "Donald Moiwa standing in a garden in a navy blazer",
    paragraphs: [
      "I'm Aiah Donald Moiwa, a software engineering student who likes using technology to solve real problems and tell stories that matter.",
      "Most of my time goes into building software: designing interfaces people find easy to use, putting together database-backed systems, and learning the languages and tools that turn an idea into something that works. I'm especially curious about artificial intelligence and where it's heading.",
      "Outside of code I founded Yannah's Studios, where I make AI-assisted films that tell African stories. It's where engineering and storytelling meet for me: both are about understanding people and building something for them.",
      "I'm drawn to entrepreneurship, financial technology and digital products that can open up opportunities for communities across Africa.",
    ],
    statement:
      "I keep learning, write code I'd be happy for someone else to maintain, and aim to build systems that hold up as they grow.",
    // Only add numbers you can stand behind. Empty list = no stats shown.
    // Example: { value: "2+", label: "Years building software" }
    stats: [],
    interests: ["Coding", "Video editing", "Photography", "Modeling", "Travel", "Music"],
  },

  /* ---------------- Skills ----------------
     icon: a Devicon class (https://devicon.dev) or "" for none.
     Only list what you actually use. No percentages on purpose —
     they can't be verified and recruiters tend to distrust them. */
  skills: [
    {
      category: "Languages",
      items: [
        { name: "JavaScript", icon: "devicon-javascript-plain" },
        { name: "Python", icon: "devicon-python-plain" },
        { name: "C++", icon: "devicon-cplusplus-plain" },
        { name: "C#", icon: "devicon-csharp-plain" },
      ],
    },
    {
      category: "Frontend",
      items: [
        { name: "HTML5", icon: "devicon-html5-plain" },
        { name: "CSS3", icon: "devicon-css3-plain" },
        { name: "React", icon: "devicon-react-original" },
        { name: "Responsive design", icon: "" },
      ],
    },
    {
      category: "Backend",
      items: [{ name: "Node.js", icon: "devicon-nodejs-plain" }],
    },
    {
      category: "Tools & workflow",
      items: [
        { name: "Git", icon: "devicon-git-plain" },
        { name: "GitHub", icon: "devicon-github-original" },
        { name: "VS Code", icon: "devicon-vscode-plain" },
        { name: "Figma", icon: "devicon-figma-plain" },
      ],
    },
    {
      category: "Design & media",
      items: [
        { name: "UI/UX design", icon: "" },
        { name: "Premiere Pro", icon: "devicon-premierepro-plain" },
        { name: "After Effects", icon: "devicon-aftereffects-plain" },
        { name: "DaVinci Resolve", icon: "" },
        { name: "CapCut", icon: "" },
      ],
    },
  ],

  /* ---------------- Projects ----------------
     Order here = order on the page. Move an object up or down to reorder.
     category: one of the keys in `projectCategories` below.
     image: path WITHOUT extension if you have .webp + .jpg, or a full path.
            Leave "" to show a generated cover with the project's initials.
     Any link left "" simply doesn't get a button.
     caseStudy: optional; each field is shown only when filled in. */
  projectCategories: {
    web: "Web",
    app: "Applications",
    creative: "Film & creative",
  },

  projects: [
    {
      id: "leh-we-woke",
      title: "Leh We Woke",
      category: "app",
      status: "In progress",
      image: "assets/img/leh-we-woke",
      imageFit: "contain",
      summary:
        "A task marketplace where people can post small everyday jobs and others can find and take them on.",
      problem:
        "People who need quick help with simple tasks, and people looking for short paid work, have no easy place to find each other.",
      solution:
        "An app where anyone can post a task, browse what's available nearby, and pick one up.",
      features: ["Post a task", "Browse open tasks", "Take on a task"],
      tech: [],
      role: "",
      github: "",
      live: "",
      caseStudy: {},
    },
    {
      id: "edos-clothing",
      title: "Edo's Clothing & Design",
      category: "web",
      status: "",
      image: "assets/img/edos-clothing",
      imageFit: "contain",
      summary: "An online storefront for a clothing and design brand, with a clean, modern interface.",
      problem: "",
      solution: "",
      features: [],
      tech: ["HTML", "CSS", "JavaScript"],
      role: "",
      github: "",
      live: "",
      caseStudy: {},
    },
    {
      id: "shattered-destiny",
      title: "Shattered Destiny",
      category: "creative",
      status: "Coming soon",
      image: "assets/img/shattered-destiny",
      imageFit: "cover",
      imagePosition: "center 20%",
      summary:
        "An AI-assisted feature film from Yannah's Studios: a family drama about betrayal, greed and redemption.",
      problem: "",
      solution: "",
      features: [],
      tech: ["CapCut", "AI video tools"],
      role: "Writer & director",
      github: "",
      live: "",
      caseStudy: {},
    },

    {
      id: "eatquick",
      title: "EatQuick",
      category: "web",
      status: "Live pilot",
      image: "assets/img/eatquick-welcome-landscape_1.png",
      imageFit: "cover",
      imagePosition: "center 20%",
      summary:
        "A food-ordering and delivery web app for Freetown, Sierra Leone, with separate areas for customers, restaurants, riders and admin.",
      problem:
        "In Freetown, ordering food usually means phoning a restaurant and arranging delivery yourself. Restaurants have no simple way to take orders online, and there is no shared system for riders.",
      solution:
        "One web app that works on a phone browser: customers order from restaurants in their area and pay cash on delivery, restaurants manage menus and orders on a live dashboard, riders take delivery jobs, and an admin team handles dispatch and finance.",
      features: [
        "Browse restaurants and menus by delivery area",
        "Cart and checkout, cash on delivery",
        "Phone-number sign-in with a one-time code",
        "Restaurant dashboard with a live order board and menu photo upload",
        "Rider delivery jobs and admin dispatch",
        "Restaurant and rider applications, approved by admin",
        "Promo codes, credit and finance reports",
      ],
      tech: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
      role: "Full-stack developer",
      github: "",
      live: "https://eatquicksl.vercel.app",
      caseStudy: {
        architecture:
          "Next.js and TypeScript front end hosted on Vercel, with a Supabase back end: a PostgreSQL database with row-level security rules, so each customer, restaurant, rider and admin can only see their own data. Prices and order rules are checked on the server, not only in the browser.",
        results:
          "Running as a pilot on its own live address. Real SMS codes and online payments are the next steps before opening it to customers.",
      },
    },

    {
      id: "portfolio",
      title: "This portfolio",
      category: "web",
      status: "",
      image: "",
      coverText: "DM", // text on the generated cover when there's no image
      summary:
        "The site you're on: a hand-built, dependency-free portfolio whose content lives in one editable file.",
      problem: "",
      solution: "",
      features: ["Content in a single config file", "Live GitHub repositories", "Accessible, responsive layout"],
      tech: ["HTML", "CSS", "JavaScript"],
      role: "Design & development",
      github: "https://github.com/aiahmoiwa22-a11y/Donald_Moiwa_portfolio",
      live: "",
      caseStudy: {},
    },
    {
      // Was on the old site with a placeholder image. Confirm it's a real
      // project, add a screenshot and links, then delete `draft: true`.
      draft: true,
      id: "taskflow",
      title: "TaskFlow",
      category: "web",
      status: "",
      image: "",
      summary: "A productivity tool for managing tasks, teams and projects.",
      problem: "",
      solution: "",
      features: [],
      tech: ["React", "Node.js", "MongoDB"],
      role: "",
      github: "",
      live: "",
      caseStudy: {
        overview: "",
        problem: "",
        architecture: "",
        process: "",
        challenges: "",
        solutions: "",
        results: "",
      },
    },
  ],

  /* ---------------- Experience ----------------
     Newest first. Delete `draft: true` once it's real. */
  experience: [
    {
      draft: true,
      company: "Company name",
      role: "Job title",
      type: "Internship",
      start: "Month YYYY",
      end: "Present",
      location: "City, Country",
      summary: "One sentence on what the team does and what you owned.",
      highlights: [
        "Start with a verb: built, shipped, reduced, led…",
        "Add a number when you have one (e.g. cut page load from 4s to 1.5s).",
      ],
      tech: ["Tech you used"],
    },
  ],

  /* ---------------- Education & certifications ---------------- */
  education: [
    {
      draft: true,
      institution: "University name",
      degree: "Bachelor's degree",
      field: "Software Engineering",
      start: "YYYY",
      end: "Expected YYYY",
      coursework: ["Data structures", "Databases", "Software design"],
      achievements: [],
    },
  ],

  certifications: [
    {
      draft: true,
      name: "Certification name",
      issuer: "Issuing organisation",
      date: "Month YYYY",
      credentialId: "",
      url: "",
    },
  ],

  /* ---------------- Services ----------------
     icon: any name from assets/js/icons.js */
  services: [
    {
      icon: "panels-top-left",
      title: "Web development",
      text: "Responsive websites and web apps built with HTML, CSS, JavaScript and React.",
    },
    {
      icon: "pen-tool",
      title: "UI/UX design",
      text: "Interfaces designed in Figma first, so we agree on how it works before it's built.",
    },
    {
      icon: "smartphone",
      title: "Application development",
      text: "Turning an idea into a working app, from the data model to the screens people use.",
    },
    {
      icon: "clapperboard",
      title: "Video & AI film",
      text: "Editing and AI-assisted production for short films, promos and social content.",
    },
  ],

  /* ---------------- Process (shown as numbered steps) ---------------- */
  process: [
    { title: "Discovery", text: "Understand the problem, the people it affects, and what success looks like." },
    { title: "Planning", text: "Choose the technologies and architecture that fit the problem, not the trend." },
    { title: "Design", text: "Shape interfaces that are intuitive, accessible and ready to scale." },
    { title: "Development", text: "Write clean, maintainable code in small, reviewable steps." },
    { title: "Testing", text: "Check that it works, performs well and handles the unexpected." },
    { title: "Deployment", text: "Ship it, watch how it's used, and keep improving it." },
  ],

  /* ---------------- GitHub ----------------
     Repositories load live from the GitHub API. List names here to pin
     specific ones first; leave empty to show your most recently updated. */
  github: {
    featuredRepos: [],
    maxRepos: 6,
  },

  /* ---------------- Testimonials ----------------
     Only add real quotes, with the person's permission. */
  testimonials: [
    {
      draft: true,
      quote: "A real quote from someone you've worked with.",
      name: "Their name",
      role: "Their role, Company",
    },
  ],

  /* ---------------- Contact form ----------------
     Messages are delivered to your inbox by FormSubmit (free, no account).
     The FIRST message sent triggers a one-time activation email to the
     address below — click the link in it and every message after that
     arrives normally. */
  contact: {
    endpoint: "https://formsubmit.co/ajax/aiahmoiwa22@gmail.com",
  },

  site: {
    // Your live address. Used for search engines and link previews.
    url: "https://aiahmoiwa22-a11y.github.io/Donald_Moiwa_portfolio/",
    brand: "Donald Tech",
  },
};
