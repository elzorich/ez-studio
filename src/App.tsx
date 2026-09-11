import { FormEvent, useEffect, useState } from 'react';

const services = [
  ['✦', 'Web Design', 'Custom, mobile-first design systems that express your brand and build trust from the first interaction.'],
  ['⌘', 'Development', 'Fast, semantic and accessible websites built with modern frontend technology.'],
  ['◎', 'SEO', 'Technical foundations, clear content structure and strong performance so people can find you.'],
  ['◇', 'Responsive Design', 'Thoughtful experiences across phones, tablets and desktop screens.'],
  ['◐', 'Brand Identity', 'A coherent visual language across colour, typography and digital touchpoints.'],
  ['↗', 'CMS & Maintenance', 'Simple content workflows and ongoing care that keep your website useful and secure.'],
] as const;

const projects = [
  { title: 'mencare.cz', category: 'Healthcare / Czech Republic', image: '/preview-mencare.jpg', url: 'https://mencare.cz', description: 'A patient-focused clinic website designed for clarity, accessibility and trust.' },
  { title: 'gynecomente.cz', category: 'Gynaecology / Czech Republic', image: '/preview-gynecomente.jpg', url: 'https://gynecomente.cz', description: 'A specialist clinic website with clear care pathways, doctor profiles and local visibility.' },
  { title: 'zoryx.app', category: 'Health technology', image: '/preview-zoryx.jpg', url: 'https://zoryx.app', description: 'A modern web application experience with a focused interface and smooth onboarding.' },
] as const;

const process = [
  ['01', 'Discovery', 'We listen, understand your goals and define the right scope together.'],
  ['02', 'Design', 'We shape the structure, prototype the experience and establish the visual system.'],
  ['03', 'Develop', 'We turn the design into clean, responsive and accessible code.'],
  ['04', 'Launch & Support', 'We test, launch and continue improving the experience after release.'],
] as const;

function Logo() {
  return <span className="brand-mark" aria-hidden="true">Z</span>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const close = () => setOpen(false);
  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <nav className="navbar" aria-label="Main navigation">
        <div className="container">
          <a className="navbar-brand" href="#home" onClick={close}><Logo />Zorich Studio</a>
          <button className={`nav-toggle${open ? ' is-open' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="nav-menu" aria-label="Toggle navigation"><span /><span /><span /></button>
          <ul className={`nav-menu${open ? ' is-open' : ''}`} id="nav-menu">
            {['Services', 'Portfolio', 'Process', 'About'].map(item => <li key={item}><a className="nav-link" href={`#${item.toLowerCase()}`} onClick={close}>{item}</a></li>)}
            <li><a className="nav-link nav-link--cta" href="#contact" onClick={close}>Start a project</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!formId) { setStatus('error'); return; }
    setStatus('sending');
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Form submission failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="contact__form" onSubmit={submit} aria-label="Contact form">
      <input className="form-honeypot" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-group"><label className="form-label" htmlFor="name">Your name</label><input className="form-input" id="name" name="name" autoComplete="name" placeholder="Your name" required /></div>
      <div className="form-group"><label className="form-label" htmlFor="email">Email address</label><input className="form-input" id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></div>
      <div className="form-group"><label className="form-label" htmlFor="business">Type of business</label><select className="form-input form-select" id="business" name="business" defaultValue="" required><option value="" disabled>Select your industry…</option><option>Healthcare / Clinic</option><option>Physiotherapy</option><option>Beauty / Spa</option><option>Wellness / Coaching</option><option>Other</option></select></div>
      <div className="form-group"><label className="form-label" htmlFor="message">Tell us about your project</label><textarea className="form-input form-textarea" id="message" name="message" rows={5} placeholder="What would you like to create?" required /></div>
      <label className="form-consent"><input type="checkbox" name="privacy-consent" required /><span>I agree that my details may be used to respond to this enquiry.</span></label>
      {status === 'success' && <div className="form-success" role="status"><strong>Thank you.</strong> Your message has been sent.</div>}
      {status === 'error' && <div className="form-error-global" role="alert"><strong>The message could not be sent.</strong> Please email <a href="mailto:hello@zorich.studio">hello@zorich.studio</a>.</div>}
      <button className="btn btn--primary btn--full" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
      <p className="form-privacy">Your details are used only to answer your enquiry.</p>
    </form>
  );
}

export default function App() {
  return <>
    <Header />
    <main>
      <section className="section hero" id="home">
        <div className="hero__visual"><img className="hero__hands" src="/hands-creation-v2.png" alt="" width="1024" height="556" /></div>
        <div className="container"><div className="hero__content">
          <p className="hero__eyebrow">Digital product studio</p>
          <h1 className="hero__headline">Build your <span className="text-accent">digital presence</span></h1>
          <p className="hero__sub">We combine strategy, UX and modern web development to create clear, high-performing digital experiences for purposeful businesses.</p>
          <div className="hero__actions"><a className="btn btn--primary" href="#contact">Start your project</a><a className="btn btn--ghost" href="#portfolio">Explore our work</a></div>
          <div className="hero__trust"><span aria-hidden="true">✦</span><span>Strategy · Design · Technology</span></div>
        </div></div>
      </section>

      <section className="section services" id="services"><div className="container">
        <div className="section-header"><p className="section-eyebrow">What we do</p><h2 className="section-title">Everything you need to grow online</h2><p className="section-sub">From the first strategic decision to a live, search-optimised experience.</p></div>
        <div className="services__grid">{services.map(([icon, title, text]) => <article className="service-card" key={title}><div className="service-card__icon" aria-hidden="true">{icon}</div><h3 className="service-card__title">{title}</h3><p className="service-card__text">{text}</p></article>)}</div>
      </div></section>

      <section className="section portfolio" id="portfolio"><div className="container">
        <div className="section-header"><p className="section-eyebrow">Selected work</p><h2 className="section-title">Digital experiences with purpose</h2><p className="section-sub">A selection of healthcare and technology projects.</p></div>
        <div className="portfolio__grid">{projects.map(project => <a className="portfolio-card" href={project.url} target="_blank" rel="noreferrer" key={project.title}><div className="portfolio-card__image portfolio-card__image--screenshot"><img src={project.image} alt={`${project.title} website`} loading="lazy" /></div><div className="portfolio-card__body"><span className="portfolio-card__tag">{project.category}</span><h3 className="portfolio-card__title">{project.title}</h3><p className="portfolio-card__text">{project.description}</p><span className="portfolio-card__link">View project ↗</span></div></a>)}</div>
      </div></section>

      <section className="section process" id="process"><div className="container"><div className="section-header"><p className="section-eyebrow">How we work</p><h2 className="section-title">From idea to a confident launch</h2></div><ol className="process__steps">{process.map(([number, title, text]) => <li className="process__step" key={number}><div className="process__step-number">{number}</div><div><h3 className="process__step-title">{title}</h3><p className="process__step-text">{text}</p></div></li>)}</ol></div></section>

      <section className="section about" id="about"><img className="about__image" src="/vitruvian.png" alt="" /><div className="container"><div className="about__content"><p className="section-eyebrow">About the studio</p><h2 className="section-title">Where craft meets technology</h2><p className="about__text">We bring design, technology and strategy together to make complex ideas feel simple and human.</p><p className="about__text">Zorich Studio works with a trusted network of specialists to create considered digital experiences from first concept to launch.</p><ul className="about__values"><li><span>✓</span>Human-centred by default</li><li><span>✓</span>Accessible and responsive</li><li><span>✓</span>Built for performance</li><li><span>✓</span>Clear, collaborative process</li></ul></div></div></section>

      <section className="section contact" id="contact"><div className="container"><div className="contact__grid"><div className="contact__info"><p className="section-eyebrow">Get in touch</p><h2 className="section-title">Let’s build something meaningful</h2><p className="contact__sub">Tell us a little about your idea. We’ll reply with useful next steps and no obligation.</p><ul className="contact__details"><li><span aria-hidden="true">✉</span><a href="mailto:hello@zorich.studio">hello@zorich.studio</a></li><li><span aria-hidden="true">☎</span><a href="tel:+420776540503">+420 776 540 503</a></li></ul></div><ContactForm /></div></div></section>
    </main>
    <footer className="site-footer"><div className="container"><div className="footer__grid"><div className="footer__brand"><a className="navbar-brand" href="#home"><Logo />Zorich Studio</a><p className="footer__tagline">Digital solutions for businesses with purpose.</p></div><nav className="footer__nav" aria-label="Footer navigation"><h3 className="footer__nav-title">Explore</h3><ul>{['Services', 'Portfolio', 'Process', 'About'].map(item => <li key={item}><a href={`#${item.toLowerCase()}`}>{item}</a></li>)}</ul></nav><div className="footer__contact"><h3 className="footer__nav-title">Contact</h3><ul><li><a href="mailto:elenazorich@gmail.com">elenazorich@gmail.com</a></li><li><a href="tel:+491739509360">+49 173 9509360</a></li></ul></div></div><div className="footer__bottom"><p>© {new Date().getFullYear()} Zorich Studio. All rights reserved.</p><p>Strategy · UX · Development</p></div></div></footer>
  </>;
}
