import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  // jsdom has no IntersectionObserver, which framer-motion's whileInView needs
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  Element.prototype.scrollIntoView = jest.fn();
});

test('renders all portfolio sections', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  ['About', 'Experience', 'Work', 'Services', 'Contact'].forEach(
    (title) => expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument()
  );
});

test('renders a Matrimony.com project detail page', () => {
  window.location.hash = '/matrimony/call-analysis';
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'Telesales call analysis' })
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Engineering highlights' })).toBeInTheDocument();
  window.location.hash = '';
});
