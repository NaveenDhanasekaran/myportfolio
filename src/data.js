// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Naveen',
  title: 'AI Engineer & Full-Stack Developer',
  headline: 'I build web applications and the machine learning behind them.',
  intro:
    'AI engineer with 1.3 years in the Decision Support System team at Matrimony.com, and a freelance full-stack developer. I work across data platforms, LLM applications, speech and computer vision, and the React and Python code that puts them in front of people.',
  availability: 'Available for freelance work',
  about: [
    'For 1.3 years I worked as an AI engineer in the Decision Support System team at Matrimony.com, building the tools that sit between the company’s data warehouse and the people who need answers from it: a natural-language data platform, an AI pipeline for telesales calls, compliance scanners, and fraud and abuse detection.',
    'Alongside that I take on freelance work, usually from the first prototype through to a deployed product: e-commerce stores, a trading platform, a healthcare portal and corporate sites, often with a chatbot or machine learning component. Earlier, I spent two years with The Term Time in the UK building computer vision and NLP models for education.',
  ],
  stack: ['Python', 'React', 'Node.js', 'Flask', 'FastAPI', 'Hive', 'Vertica', 'PostgreSQL', 'Google Gemini', 'LLM function calling', 'Computer vision', 'Flutter'],
  email: 'naveen16043@gmail.com',
  phone: '+91 91761 86062',
  // WhatsApp number in international format, digits only
  whatsapp: '919176186062',
  whatsappMessage: 'Hi Naveen, I saw your portfolio and would like to discuss a project.',
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export const services = [
  {
    title: 'Web application development',
    description:
      'Responsive applications in React and Node.js, built end to end: interface, API, database and deployment.',
  },
  {
    title: 'Interface design',
    description:
      'Clear layouts and interaction design for products that people need to understand quickly and use often.',
  },
  {
    title: 'Conversational AI',
    description:
      'Chatbots built on large language models that answer customer questions on a website using the business’s own content.',
  },
  {
    title: 'Machine learning automation',
    description:
      'Models and data pipelines that take over repetitive, rule-heavy work and feed results back into existing systems.',
  },
  {
    title: 'Computer vision and NLP',
    description:
      'Image recognition and language understanding models, from prototype to integration in a production application.',
  },
  {
    title: 'E-commerce and trading platforms',
    description:
      'Online stores and trading interfaces with payment gateway integration, analytics and room to scale.',
  },
];

export const experience = [
  {
    company: 'Matrimony.com',
    role: 'AI Engineer, Decision Support System team',
    duration: '1 yr 3 mos',
    description:
      'Built the team’s internal data platform and its chat assistant, an LLM pipeline for telesales call analysis, a DPDP compliance scanner, and fraud, abuse and duplicate-profile detection.',
    link: 'matrimony', // opens this tab in the Work section
  },
  {
    company: 'The Term Time',
    role: 'United Kingdom',
    duration: '2 years',
    description:
      'Prototyped and developed computer vision and NLP models for educational applications, and integrated them into production web applications.',
  },
  {
    company: 'Vei Technology',
    role: 'Contract',
    duration: 'Contract',
    description:
      'Developed machine learning models and analytics pipelines, and built data processing systems for business intelligence.',
  },
  {
    company: 'Independent clients',
    role: 'Freelance',
    duration: 'Ongoing',
    description:
      'Web applications, AI features and business websites, ranging from e-commerce stores to chatbots and automation tools.',
  },
];

// Software products built for clients.
export const products = [
  {
    title: 'Intelox Lease',
    category: 'Real estate management',
    link: 'https://lease.intelox.com.au',
    description:
      'Property management platform for Australian owners and agencies: one record per property covering owners, tenancies, rent and arrears, maintenance jobs, inspections and compliance, with portals for tenants and tradespeople.',
  },
  {
    title: 'Export-import CRM',
    category: 'CRM',
    // TODO: add a link and a fuller description (who it was for, main features)
    description: 'A CRM for managing the day-to-day operations of an export and import business.',
  },
];

// Freelance web development. Each title links to the live site.
export const websites = [
  {
    title: 'MLV Enterprises',
    category: 'mlventerprises.in',
    link: 'https://www.mlventerprises.in',
    description:
      'Website for a Yale authorised dealer installing smart locks, video door phones and digital safes across Tamil Nadu, with product listings and installation booking.',
  },
  {
    title: 'Shivay Interior Decor',
    category: 'shivayinteriordecor.com',
    link: 'https://www.shivayinteriordecor.com',
    description:
      'Portfolio site for an interior design firm, with a filterable residential and commercial project gallery, before-and-after comparisons and a step-by-step process section.',
  },
  {
    title: 'R L Karthik & Associates',
    category: 'rlkca.com',
    link: 'https://www.rlkca.com',
    description:
      'Website for a chartered accountancy firm presenting audit, taxation, ROC compliance and advisory services, with consultation booking.',
  },
  {
    title: 'Amina Garden',
    category: 'thotambooking.com',
    link: 'https://www.thotambooking.com',
    description:
      'Booking site for a nature retreat, with an availability checker and hourly and overnight bookings for pool stays, turf and trekking experiences.',
  },
  {
    title: 'PSH Screws',
    category: 'pshscrews.com',
    link: 'https://www.pshscrews.com',
    description:
      'Website for a fastener manufacturer, with a product catalogue of chipboard, drywall, self-drilling and roofing screws and their specifications.',
  },
  {
    title: 'Lil Sproutz',
    category: 'lilsproutz.com',
    link: 'https://lilsproutz.com',
    description:
      'E-commerce store for children’s clothing, with shop-by-age and category browsing, multi-buy offers, a cart and customer reviews.',
  },
  {
    title: 'Intelox',
    category: 'intelox.com.au',
    link: 'https://www.intelox.com.au',
    description:
      'Website for an Australian company offering AI call agents, workplace automation and cybersecurity services.',
  },
];
