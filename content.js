// Everything on the site that you'll want to edit lives here.
// Writing is built separately from blog/posts/*.md (run `npm run build`).
// Lines marked TODO are drafts based on your Medium posts. Check and correct them.

window.SITE = {
  name: "Adesuwa",
  fullName: "Adesuwa Omoruyi",
  tagline: "Co-founder & CMO at Accrue, helping people move money across Africa in minutes.",
  intro:
    "I lead marketing and growth at Accrue, and I write about building a company in public: raising money, finding customers, hiring, pivoting, and the things that go wrong along the way.",
  portrait: { src: "images/portrait.jpg", alt: "Portrait of Adesuwa Omoruyi" },
  gallery: [
    { src: "images/photo-1.jpg", alt: "Adesuwa Omoruyi in a black vest with pearl buttons" },
    { src: "images/photo-2.jpg", alt: "Adesuwa Omoruyi seated on a green chair" },
    { src: "images/photo-3.jpg", alt: "Adesuwa Omoruyi in a blush cowl-neck top" },
    { src: "images/photo-4.jpg", alt: "Close portrait of Adesuwa Omoruyi" },
  ],

  about: [
    "I'm a co-founder of Accrue, a USD stablecoin-powered agent network that helps people and businesses move money across Africa in minutes. We serve 400,000+ users in Nigeria, Ghana, Kenya, Benin Republic and Cameroon, backed by a network of 16,000+ agents. I lead marketing and growth: revenue, acquisition, retention, market expansion and the team behind them.",
    "In June 2026 I was named to the Forbes Africa 30 Under 30 list. Outside work I'm usually reading, writing, or learning something hard on purpose. Last year that was French, which I took from zero to intermediate in four months.", // TODO: edit freely
  ],

  // ---- Work ----------------------------------------------------------
  now: {
    company: "Accrue",
    role: "Co-Founder, CMO",
    dates: "May 2021 – Present",
    summary:
      "A USD stablecoin-powered agent network that helps people and businesses move money across Africa in minutes.",
    highlights: [
      "Grew Accrue to 400,000+ users across Nigeria, Ghana, Kenya, Benin Republic and Cameroon.",
      "Built and scaled a network of 16,000+ agents that facilitates intra-Africa payments in minutes.",
      "Led growth and marketing across acquisition, activation, retention, brand and revenue.",
      "Launched intra-Africa payments, so people can send money from one African country to another in minutes.",
      "Raised $2M+, including a $1.58M seed round, with backing from Lattice Fund, Lava Capital and notable angels. Part of Alliance DAO.",
      "Named to the Forbes Africa 30 Under 30 list (June 2026).",
    ],
  },
  before: [], // add earlier roles: { company, role, dates, summary }

  // ---- Books ---------------------------------------------------------
  // Add `learned: "..."` to any finished book to show a "What I learned" takeaway,
  // `rating: 1-5` for stars, and `cover: "images/books/<file>.jpg"` for a real cover
  // (without one, a typographic cover is drawn). Leave `reading` empty to hide that block.
  reading: [],
  read: [
    { title: "Radical Candor", author: "Kim Scott", note: "Continued from last year.", learned: "" },
    { title: "Neither Bomb nor Bullet", author: "Andrew Boyd", learned: "" },
    { title: "Master the Art of Business Strategy", author: "Patrick Bet-David", learned: "" },
    { title: "The Power of Small", author: "Linda Kaplan Thaler & Robin Koval", learned: "" },
    { title: "75 Habits for a Happy Marriage", author: "Ashley & Daniel Bush", learned: "" },
    { title: "Clear Thinking", author: "Shane Parrish", learned: "" },
    { title: "Vantage", author: "Olumide Shoyombo", learned: "" },
    { title: "The Hard Thing About Hard Things", author: "Ben Horowitz", learned: "" },
    { title: "How to Win Friends and Influence People", author: "Dale Carnegie", learned: "" },
  ],

  contact: {
    email: "faith.omoruyi99@gmail.com",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/adesuwaomoruyi/" },
      { label: "Medium", url: "https://medium.com/@adesuwaomoruyi" },
      { label: "Accrue", url: "https://useaccrue.com/" },
    ],
  },
};
