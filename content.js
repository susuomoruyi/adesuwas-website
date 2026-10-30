// Everything on the site that you'll want to edit lives here.
// Writing is built separately from blog/posts/*.md (run `npm run build`).
// Lines marked TODO are drafts based on your Medium posts. Check and correct them.

window.SITE = {
  name: "Adesuwa",
  fullName: "Adesuwa Omoruyi",
  homeIntro:
    "I lead marketing and growth at Accrue, where we help people move money across Africa in minutes. I write about building a company, and I read… just not enough to be insufferable about it.",
  // Home photo: the first is shown; hovering a link swaps through the rest.
  photos: [
    { src: "images/photo-4.jpg", alt: "Portrait of Adesuwa Omoruyi" },
    { src: "images/portrait.jpg", alt: "Adesuwa Omoruyi looking at the camera" },
    { src: "images/photo-3.jpg", alt: "Adesuwa Omoruyi in a blush top, hand in pocket" },
    { src: "images/photo-2.jpg", alt: "Adesuwa Omoruyi seated on an olive chair" },
    { src: "images/photo-1.jpg", alt: "Adesuwa Omoruyi in a black vest with pearl buttons" },
  ],

  about: [
    "Accrue is a USD stablecoin-powered agent network that helps people and businesses move money across Africa in minutes, and I'm one of its co-founders. We serve 400,000+ users in Nigeria, Ghana, Kenya, Benin Republic and Cameroon, backed by a network of 16,000+ agents. I lead marketing and growth: revenue, acquisition, retention, market expansion and the team behind them.",
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
    { title: "Radical Candor", cover: "images/books/radical-candor.jpg", author: "Kim Scott", learned: "I usually fall off one end of the spectrum. Either I'm so direct I come across as brash, or I'm so empathetic that I water down the very thing I wanted to say. Radical Candor taught me to do both at once: care about the person and challenge them directly. The feedback gets heard, and they know I'm not just being critical." },
    { title: "Neither Bomb nor Bullet", cover: "images/books/neither-bomb-nor-bullet.jpg", author: "Andrew Boyd", learned: "It's the story of Archbishop Benjamin Kwashi of Jos: how he came to faith, how he started ministry, and how he kept going through serious persecution. It inspired me as a Christian. It's not all fun and games. Suffering for Christ is an honour, and God can use it to refine us." },
    { title: "Master the Art of Business Strategy", cover: "images/books/master-the-art-of-business-strategy.jpg", author: "Patrick Bet-David", learned: "Honestly, not my favourite, but it left me with one useful idea: think before you act, and think several moves ahead. Decide for the long term, not just for what helps today. It slows me down in decision-making, and that's a good thing." },
    { title: "The Power of Small", cover: "images/books/the-power-of-small.jpg", author: "Linda Kaplan Thaler & Robin Koval", learned: "One of my favourites, and I've read it many times over the years. There is nothing small about small stuff. We live in a go-big-or-go-home culture, but small things stack up. Want to read more? Don't commit to five chapters, read for two minutes a day, then five, and by the end of the year you've read books instead of nothing." },
    { title: "75 Habits for a Happy Marriage", cover: "images/books/75-habits-for-a-happy-marriage.jpg", author: "Ashley & Daniel Bush", learned: "I'm not married, so I read this out of curiosity. It showed me that a marriage is delicate, not because it's fragile but because it needs tending, like a plant you have to water, put in the sun and weed. I took that into my friendships too: thank-you messages, noticing things I appreciate, gifts they'd like. Love is a fire, and it needs dry wood added every day." },
    { title: "Clear Thinking", cover: "images/books/clear-thinking.jpg", author: "Shane Parrish", learned: "One of the best books I've read. It taught me I need frameworks for decisions and for life, because when I go on a whim I default to emotional, inconsistent choices. Approach life as it is, not as you wish it were, then take responsibility and do your best from there. It also taught me to make rules ahead of time so I'm not renegotiating in the moment: every Wednesday by 5pm, I write. And to pair a goal with a baseline. My goal is 15K steps a day, my baseline is to walk every day, so when I miss the goal I still keep the habit. Parrish also names the defaults that quietly run us when we're not paying attention: ego, emotion, social pressure and inertia." },
    { title: "Vantage", author: "Olumide Soyombo", learned: "I admire Olumide in the tech space, so reading how he started and what he built was a treat. The line that stayed with me: people say it's business, it's not personal. He says it's business and it's personal, because you're doing business with people. That means integrity. You can't run people over and shrug it off as business." },
    { title: "The Hard Thing About Hard Things", cover: "images/books/the-hard-thing-about-hard-things.jpg", author: "Ben Horowitz", learned: "I felt so seen. It shows how chaotic building and running a company can be, and I don't have one specific lesson from it. What I got was encouragement: it's insanely hard, and I'm not the only one going through it. Horowitz calls it the struggle. The hardness is a feature, not a bug, so every day the question is how we keep going and keep charting our own course." },
    { title: "How to Win Friends and Influence People", cover: "images/books/how-to-win-friends-and-influence-people.jpg", author: "Dale Carnegie", learned: "It's making me a better human being and helping me understand people. We like to think we're logical, but we're really about 99% emotional and 1% logical. So if you want to engage someone, start there. Speak to their heart, not just their head. Once you've spoken to the heart, you have a highway into the head, and that's when you can change the way they think." },
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
