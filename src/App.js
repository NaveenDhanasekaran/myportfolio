import React, { useEffect, useState } from 'react';
import './App.css';
import { profile, navItems } from './data';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import { WhatsAppFloat } from './components/WhatsApp';
import Logo from './components/Logo';
import { setPageMeta } from './seo';

// Minimal path router: "/" is the home page, "/matrimony/<slug>" is a project page.
// Real paths (not #hashes) so search engines can index each project page.
// vercel.json serves the prerendered page for each path.
const getPath = () => {
  // Old links used "#/matrimony/<slug>"; move them onto the real path.
  if (window.location.hash.startsWith('#/')) {
    window.history.replaceState(null, '', window.location.hash.slice(1) || '/');
  }
  return window.location.pathname;
};

const navigate = (to) => {
  window.history.pushState(null, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

function App() {
  const [path, setPath] = useState(getPath);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);

  useEffect(() => {
    const onPopState = () => setPath(getPath());
    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onPopState);

    // Handle clicks on internal links ("/..." without a target) without a full page load.
    const onClick = (e) => {
      const a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/') || a.target) return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onPopState);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const projectMatch = path.match(/^\/matrimony\/([\w-]+)/);
  const isHome = !projectMatch;

  useEffect(() => {
    if (isHome) {
      setPageMeta({
        title: `${profile.fullName} | ${profile.title}`,
        description: profile.description,
        path: '/',
      });
    }
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
    if (!scrollTarget) window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  // Scroll to a home-page section, switching back to the home page first if needed.
  const goTo = (e, id) => {
    e?.preventDefault();
    setMenuOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setScrollTarget(id);
      navigate('/');
    }
  };

  return (
    <div className="App">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label={`${profile.fullName}, home`} onClick={(e) => goTo(e, 'top')}>
            <Logo name={profile.name} />
          </a>
          <nav className={`site-nav ${menuOpen ? 'open' : ''}`} aria-label="Main">
            {navItems.map((item) => (
              <a key={item.id} href="/" onClick={(e) => goTo(e, item.id)}>
                {item.label}
              </a>
            ))}
          </nav>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <main>
        {isHome ? (
          <Home
            goTo={goTo}
            scrollTarget={scrollTarget}
            onScrolled={() => setScrollTarget(null)}
          />
        ) : (
          <ProjectPage slug={projectMatch[1]} goTo={goTo} />
        )}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>
            &copy; {new Date().getFullYear()} {profile.fullName}
          </span>
          <span className="footer-contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
          </span>
          <a href="/" onClick={(e) => goTo(e, 'top')}>
            Back to top
          </a>
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  );
}

export default App;
