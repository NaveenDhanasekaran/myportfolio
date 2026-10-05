// Keeps the title, description, canonical URL and social tags in step with the current page
// while visitors navigate in the browser. The first load of every URL already has the right
// tags baked in by scripts/prerender.js.

const setTag = (selector, create, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', value);
};

const meta = (attr, key) => () => {
  const el = document.createElement('meta');
  el.setAttribute(attr, key);
  return el;
};

export function setPageMeta({ title, description, path = '/' }) {
  const url = window.location.origin + path;
  document.title = title;
  setTag('meta[name="description"]', meta('name', 'description'), description);
  setTag('meta[property="og:title"]', meta('property', 'og:title'), title);
  setTag('meta[property="og:description"]', meta('property', 'og:description'), description);
  setTag('meta[property="og:url"]', meta('property', 'og:url'), url);
  setTag('meta[name="twitter:title"]', meta('name', 'twitter:title'), title);
  setTag('meta[name="twitter:description"]', meta('name', 'twitter:description'), description);
  setTag(
    'link[rel="canonical"]',
    () => {
      const el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      return el;
    },
    url
  );
}
