/* eslint-disable no-console */
// Runs after `react-scripts build` (see package.json). For every page it writes an HTML file
// with the page's own title, description, canonical URL, social tags and JSON-LD, and the
// page's text inside #root. Search engines and AI crawlers that do not run JavaScript can
// then read the full content; React replaces the static text when the app loads.
// It also writes sitemap.xml, robots.txt and llms.txt.
//
// Site URL, in order of preference: SITE_URL, then Vercel's production domain.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const buildDir = path.join(root, 'build');

const SITE_URL = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:3000'
).replace(/\/$/, '');

// The content files are ES modules with no imports; evaluate them as plain scripts.
function loadModule(file) {
  let src = fs.readFileSync(path.join(root, file), 'utf8');
  const names = [...src.matchAll(/export const (\w+)/g)].map((m) => m[1]);
  src = src.replace(/export const /g, 'const ');
  // eslint-disable-next-line no-new-func
  return new Function(`${src}\nreturn { ${names.join(', ')} };`)();
}

const { profile, services, experience, products, websites, faqs } = loadModule('src/data.js');
const { company, matrimonyProjects } = loadModule('src/matrimonyProjects.js');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const url = (p) => SITE_URL + p;
const ogImage = url('/og-image.png');
const phoneE164 = profile.phone.replace(/\s/g, '');

// ---------- Structured data ----------

const person = {
  '@type': 'Person',
  '@id': url('/#person'),
  name: profile.fullName,
  alternateName: profile.name,
  jobTitle: profile.title,
  description: profile.description,
  url: url('/'),
  image: url('/logo512.png'),
  email: `mailto:${profile.email}`,
  telephone: phoneE164,
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  knowsAbout: profile.stack,
  sameAs: profile.profiles,
  alumniOf: experience
    .filter((e) => !['Independent clients'].includes(e.company))
    .map((e) => ({ '@type': 'Organization', name: e.company })),
};

const website = {
  '@type': 'WebSite',
  '@id': url('/#website'),
  url: url('/'),
  name: `${profile.fullName} | ${profile.title}`,
  inLanguage: 'en',
  publisher: { '@id': url('/#person') },
};

const homeGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    person,
    website,
    {
      '@type': 'ProfilePage',
      '@id': url('/#profile'),
      url: url('/'),
      name: `${profile.fullName} | ${profile.title}`,
      isPartOf: { '@id': url('/#website') },
      mainEntity: { '@id': url('/#person') },
    },
    {
      '@type': 'ItemList',
      name: `${company.name} projects by ${profile.fullName}`,
      itemListElement: matrimonyProjects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: url(`/matrimony/${p.slug}`),
        name: p.title,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ],
};

const projectGraph = (p) => ({
  '@context': 'https://schema.org',
  '@graph': [
    person,
    website,
    {
      '@type': 'CreativeWork',
      '@id': url(`/matrimony/${p.slug}#work`),
      url: url(`/matrimony/${p.slug}`),
      name: p.title,
      headline: `${p.title}: ${p.category} at ${company.name}`,
      description: p.summary,
      genre: p.category,
      keywords: p.stack.join(', '),
      author: { '@id': url('/#person') },
      creator: { '@id': url('/#person') },
      sourceOrganization: { '@type': 'Organization', name: company.name },
      isPartOf: { '@id': url('/#website') },
      image: ogImage,
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: url('/') },
        { '@type': 'ListItem', position: 2, name: `${company.name} projects`, item: url('/#work') },
        { '@type': 'ListItem', position: 3, name: p.title, item: url(`/matrimony/${p.slug}`) },
      ],
    },
  ],
});

// ---------- Static page content (replaced by React on load) ----------

const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

const homeContent = () => `
<header><a href="/">${esc(profile.fullName)}</a></header>
<main>
<h1>${esc(profile.fullName)}: ${esc(profile.title)}</h1>
<p>${esc(profile.headline)}</p>
<p>${esc(profile.intro)}</p>
<section id="about"><h2>About</h2>${profile.about.map((p) => `<p>${esc(p)}</p>`).join('')}
<p>Technologies: ${esc(profile.stack.join(', '))}.</p></section>
<section id="experience"><h2>Experience</h2>${list(
  experience.map((e) => `<strong>${esc(e.company)}</strong> (${esc(e.role)}, ${esc(e.duration)}): ${esc(e.description)}`)
)}</section>
<section id="work"><h2>Work</h2>
<h3>${esc(company.name)} projects</h3><p>${esc(company.intro)}</p>${list(
  matrimonyProjects.map((p) => `<a href="/matrimony/${p.slug}">${esc(p.title)}</a> (${esc(p.category)}): ${esc(p.summary)}`)
)}
<h3>Products</h3>${list(
  products.map((p) => `${p.link ? `<a href="${esc(p.link)}">${esc(p.title)}</a>` : esc(p.title)} (${esc(p.category)}): ${esc(p.description)}`)
)}
<h3>Websites</h3>${list(websites.map((p) => `<a href="${esc(p.link)}">${esc(p.title)}</a>: ${esc(p.description)}`))}
</section>
<section id="services"><h2>Services</h2>${list(services.map((s) => `<strong>${esc(s.title)}</strong>: ${esc(s.description)}`))}</section>
<section id="faq"><h2>Questions</h2>${faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('')}</section>
<section id="contact"><h2>Contact</h2>
<p>Email: <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></p>
<p>Phone and WhatsApp: <a href="tel:${phoneE164}">${esc(profile.phone)}</a></p></section>
</main>`;

const projectContent = (p) => `
<header><a href="/">${esc(profile.fullName)}</a></header>
<main><article>
<p><a href="/#work">All ${esc(company.name)} projects</a></p>
<h1>${esc(p.title)}</h1>
<p>${esc(p.summary)}</p>
<p>${esc(company.name)}, ${esc(company.role)}, ${esc(company.team)}. Built by ${esc(profile.fullName)}.</p>
<h2>The problem</h2>${p.problem.map((t) => `<p>${esc(t)}</p>`).join('')}
<h2>What I built</h2>${p.built.map((t) => `<p>${esc(t)}</p>`).join('')}${p.builtList ? list(p.builtList.map(esc)) : ''}
<h2>Engineering highlights</h2>${p.highlights.map((h) => `<h3>${esc(h.title)}</h3><p>${esc(h.text)}</p>`).join('')}
${p.outcome ? `<h2>Outcome</h2>${p.outcome.map((t) => `<p>${esc(t)}</p>`).join('')}` : ''}
<h2>Technology</h2><p>${esc(p.stack.join(', '))}</p>
</article></main>`;

// ---------- Write pages ----------

const template = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');

function renderPage({ title, description, pagePath, graph, content }) {
  const head = [
    `<link rel="canonical" href="${url(pagePath)}"/>`,
    `<meta property="og:url" content="${url(pagePath)}"/>`,
    `<meta property="og:image" content="${ogImage}"/>`,
    `<meta name="twitter:image" content="${ogImage}"/>`,
    `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`,
  ].join('');
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(description)}"`)
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${esc(description)}"`)
    // Function replacements so "$" in content is never treated as a replacement pattern.
    .replace('</head>', () => `${head}</head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${content.replace(/\n/g, '')}</div>`);
}

// CRA minifies the HTML and strips comments, so inject before </head> and into the empty #root.
if (!template.includes('</head>') || !template.includes('<div id="root"></div>')) {
  throw new Error('build/index.html has no </head> or empty <div id="root"></div> to fill');
}

fs.writeFileSync(
  path.join(buildDir, 'index.html'),
  renderPage({
    title: `${profile.fullName} | ${profile.title}`,
    description: profile.description,
    pagePath: '/',
    graph: homeGraph,
    content: homeContent(),
  })
);

fs.mkdirSync(path.join(buildDir, 'matrimony'), { recursive: true });
for (const p of matrimonyProjects) {
  // vercel.json has cleanUrls, so /matrimony/<slug> serves this file.
  fs.writeFileSync(
    path.join(buildDir, 'matrimony', `${p.slug}.html`),
    renderPage({
      title: `${p.title} | ${company.name} | ${profile.fullName}`,
      description: p.summary,
      pagePath: `/matrimony/${p.slug}`,
      graph: projectGraph(p),
      content: projectContent(p),
    })
  );
}

// ---------- sitemap.xml, robots.txt, llms.txt ----------

const today = new Date().toISOString().slice(0, 10);
const pages = ['/', ...matrimonyProjects.map((p) => `/matrimony/${p.slug}`)];
fs.writeFileSync(
  path.join(buildDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) =>
      `  <url><loc>${url(p)}</loc><lastmod>${today}</lastmod><priority>${p === '/' ? '1.0' : '0.8'}</priority></url>`
  )
  .join('\n')}
</urlset>
`
);

const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
];
fs.writeFileSync(
  path.join(buildDir, 'robots.txt'),
  `User-agent: *
Allow: /

# AI search and assistant crawlers are welcome
${aiCrawlers.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${url('/sitemap.xml')}
`
);

fs.writeFileSync(
  path.join(buildDir, 'llms.txt'),
  `# ${profile.fullName}

> ${profile.description}

${profile.intro}

Contact: ${profile.email}, ${profile.phone} (phone and WhatsApp).

## ${company.name} case studies

${company.role}, ${company.team}, ${company.duration}.

${matrimonyProjects.map((p) => `- [${p.title}](${url(`/matrimony/${p.slug}`)}): ${p.summary}`).join('\n')}

## Products

${products.map((p) => `- ${p.link ? `[${p.title}](${p.link})` : p.title}: ${p.description}`).join('\n')}

## Websites

${websites.map((p) => `- [${p.title}](${p.link}): ${p.description}`).join('\n')}

## Experience

${experience.map((e) => `- ${e.company} (${e.role}, ${e.duration}): ${e.description}`).join('\n')}

## Questions

${faqs.map((f) => `### ${f.question}\n\n${f.answer}`).join('\n\n')}
`
);

console.log(`Prerendered ${pages.length} pages, sitemap.xml, robots.txt and llms.txt for ${SITE_URL}`);
