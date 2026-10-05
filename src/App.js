import React, { useEffect, useState } from 'react';
import './App.css';
import { profile, navItems } from './data';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import { WhatsAppFloat } from './components/WhatsApp';

// Minimal hash router: "#/" is the home page, "#/matrimony/<slug>" is a project page.
// Hash routing works on any static host without server rewrites.
const getPath = () => window.location.hash.replace(/^#/, '') || '/';

function App() {
  const [path, setPath] = useState(getPath);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);

  useEffect(() => {
    const onHashChange = () => setPath(getPath());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const projectMatch = path.match(/^\/matrimony\/([\w-]+)/);
  const isHome = !projectMatch;

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
      window.location.hash = '/';
    }
  };

  return (
    <div className="App">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#/" onClick={(e) => goTo(e, 'top')}>
            {profile.name}
          </a>
          <nav className={`site-nav ${menuOpen ? 'open' : ''}`} aria-label="Main">
            {navItems.map((item) => (
              <a key={item.id} href="#/" onClick={(e) => goTo(e, item.id)}>
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
            &copy; {new Date().getFullYear()} {profile.name}
          </span>
          <span className="footer-contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
          </span>
          <a href="#/" onClick={(e) => goTo(e, 'top')}>
            Back to top
          </a>
        </div>
      </footer>

      <WhatsAppFloat />
    </div>
  );
}

export default App;
