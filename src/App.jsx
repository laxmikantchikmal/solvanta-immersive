import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Leaf, Zap, ShieldCheck, Sun, BatteryCharging, House, Building2, Factory, MoveUpRight, Plus, Minus, Instagram, Linkedin, Menu } from 'lucide-react'
import Navigation from './components/Navigation'
import SolarScene from './components/SolarScene'
import Reveal from './components/Reveal'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { id: '01', name: 'Helio One', type: 'RESIDENTIAL SERIES', power: '440 W', detail: 'High-efficiency modules engineered for modern homes.', tone: 'blue' },
  { id: '02', name: 'Helio Pro', type: 'COMMERCIAL SERIES', power: '580 W', detail: 'Maximum output for ambitious commercial rooftops.', tone: 'silver' },
  { id: '03', name: 'Helio Flex', type: 'INTEGRATED SERIES', power: '420 W', detail: 'A refined solar surface designed to become architecture.', tone: 'green' }
]
const projects = [
  { no: '01', name: 'The quiet achiever', place: 'PRIVATE RESIDENCE · PUNE', capacity: '12.4 kW', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85' },
  { no: '02', name: 'A brighter workplace', place: 'COMMERCIAL · MUMBAI', capacity: '86 kW', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85' },
  { no: '03', name: 'Powering possibility', place: 'INDUSTRIAL · SOLAPUR', capacity: '240 kW', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85' }
]
const faqs = [
  ['How does a solar installation work?', 'We assess your site and energy usage, design a system around your needs, then coordinate installation, commissioning and handover.'],
  ['Can solar work during a power cut?', 'A grid-tied system normally switches off during an outage for safety. A compatible hybrid inverter and battery can provide backup power.'],
  ['How do I know what system size I need?', 'Your monthly electricity consumption, roof area, shading and available connection capacity determine the right system size. We start with an energy assessment.']
]

function Eyebrow({ children }) { return <div className="eyebrow"><span/> {children}</div> }
function SectionHeading({ tag, title, copy, light = false }) { return <div className={`section-heading ${light ? 'light' : ''}`}><div><Eyebrow>{tag}</Eyebrow><h2>{title}</h2></div>{copy && <p>{copy}</p>}</div> }
function ProductVisual({ tone }) { return <div className={`product-visual ${tone}`}><div className="product-glow"/><div className="product-panel"><div className="panel-grid">{Array.from({ length: 24 }, (_, i) => <i key={i}/>)}</div></div><div className="product-stand"/></div> }
function ProductShowcase() {
  const [active, setActive] = useState(0)
  const item = products[active]
  return <section id="technology" className="section products-section"><div className="container">
    <SectionHeading tag="ENGINEERED FOR TOMORROW" title={<>Quietly powerful.<br/><em>Remarkably intelligent.</em></>} copy="Solar technology should do more than generate power. It should fit beautifully into the way you live and work."/>
    <div className="product-layout"><div className="product-tabs">{products.map((p, i) => <button key={p.id} className={active === i ? 'product-tab active' : 'product-tab'} onClick={() => setActive(i)}><span>{p.id}</span><b>{p.name}</b><ArrowUpRight size={17}/></button>)}<div className="product-note"><span>BUILT AROUND YOUR WORLD</span><p>Every system is considered, configured and made to perform in your environment.</p></div></div>
      <div className="product-detail" key={item.id}><ProductVisual tone={item.tone}/><div className="product-info"><span className="mono">{item.type}</span><div><h3>{item.name}</h3><p>{item.detail}</p></div><div className="product-spec"><div><strong>{item.power}</strong><span>MODULE OUTPUT</span></div><a href="#contact" className="round-link" aria-label={`Enquire about ${item.name}`}><ArrowUpRight/></a></div></div></div>
    </div>
  </div></section>
}
function ContactForm() {
  const [status, setStatus] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: 'Residential solar', message: '' })
  const update = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Solar enquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nInterest: ${form.interest}\n\n${form.message}`)
    window.location.href = `mailto:hello@solvanta.example?subject=${subject}&body=${body}`
    setStatus('Your email app should open with your enquiry prepared. Replace hello@solvanta.example with your business email before publishing.')
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Your name<input required name="name" value={form.name} onChange={update} placeholder="Name" autoComplete="name"/></label><label>Email address<input required type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email"/></label></div>
    <div className="form-row"><label>Phone number<input name="phone" value={form.phone} onChange={update} placeholder="+91" autoComplete="tel"/></label><label>I'm interested in<select name="interest" value={form.interest} onChange={update}><option>Residential solar</option><option>Commercial solar</option><option>Industrial solar</option><option>Battery storage</option><option>Solar consultation</option></select></label></div>
    <label>Tell us about your project<textarea required rows="3" name="message" value={form.message} onChange={update} placeholder="A little about your energy goals..."/></label>
    <div className="form-submit"><button className="button button-lime" type="submit">Send enquiry <ArrowUpRight size={17}/></button><span>We typically respond within 1–2 business days.</span></div>
    {status && <p className="form-status" role="status">{status}</p>}
  </form>
}

export default function App() {
  const heroRef = useRef(null)
  const [faqOpen, setFaqOpen] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy > *', { y: 32, autoAlpha: 0, duration: 1, stagger: 0.13, ease: 'power3.out', delay: 0.15 })
      gsap.from('.hero-side-note', { autoAlpha: 0, x: 20, duration: 1, delay: 0.9 })
      gsap.to('.hero-visual', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    }, heroRef)
    return () => ctx.revert()
  }, [])
  return <div id="top" className="site-shell" ref={heroRef}>
    <Navigation/>
    <main>
      <section className="hero">
        <div className="hero-bg-grid"/><div className="hero-glow"/>
        <div className="container hero-inner"><div className="hero-copy"><Eyebrow>THE NEXT ERA OF ENERGY</Eyebrow><h1>Make room<br/>for <span>better</span><br/><em>energy.</em></h1><p>Intelligent solar systems, thoughtfully designed for a world that can't afford to stand still.</p><div className="hero-actions"><a className="button button-lime" href="#contact">Explore solar with us <ArrowUpRight size={17}/></a><a className="text-link" href="#approach">Discover our approach <ArrowDown size={15}/></a></div></div>
          <div className="hero-visual"><SolarScene/><div className="hero-side-note"><span>01 — SOLAR, REIMAGINED</span><p>Designed for daylight.<br/>Built for every day.</p></div></div>
          <div className="hero-bottom"><span>INDEPENDENCE, BY DESIGN</span><span>SCROLL TO EXPLORE <ArrowDown size={13}/></span><span>18° 31' N / 73° 51' E</span></div>
        </div>
      </section>

      <section id="approach" className="section intro-section"><div className="container intro-grid"><Reveal><Eyebrow>A DIFFERENT KIND OF ENERGY COMPANY</Eyebrow><h2>Good energy<br/>changes <em>everything.</em></h2></Reveal><Reveal delay={0.12}><div className="intro-copy"><p className="lead">The future of energy isn't just renewable. It's personal, intelligent and designed around you.</p><p>We bring together considered engineering, dependable technology and a human approach to make switching to solar feel refreshingly simple. From the first conversation to years of clean energy, we're with you at every step.</p><a href="#contact" className="under-link">Get to know us <ArrowUpRight size={15}/></a></div></Reveal></div><div className="container stats-row"><div><strong>01</strong><span>ONE PARTNER<br/>FROM PLAN TO POWER</span></div><div><strong>∞</strong><span>ENERGY FOR<br/>WHAT COMES NEXT</span></div><div><strong>24/7</strong><span>SMARTER ENERGY<br/>MONITORING OPTIONS</span></div><div><strong>100%</strong><span>FOCUSED ON<br/>YOUR ENERGY GOALS</span></div></div></section>

      <ProductShowcase/>

      <section className="section experience-section"><div className="container experience-grid"><div className="experience-copy"><Eyebrow>BEYOND THE PANEL</Eyebrow><h2>See the bigger<br/><em>picture.</em></h2><p>Solar is a system, not a single product. Explore how generation, storage and intelligent control work together to put you in charge.</p><div className="experience-points"><div><span>01</span><b>Generate</b><p>Turn sunlight into dependable everyday power.</p></div><div><span>02</span><b>Store</b><p>Keep more of your energy ready for when you need it.</p></div><div><span>03</span><b>Optimize</b><p>Understand your usage and make every unit count.</p></div></div></div><div className="system-visual"><div className="system-sun"><Sun size={30}/></div><div className="system-line line-a"/><div className="system-line line-b"/><div className="system-node node-panel"><Sun/><span>SOLAR ARRAY</span></div><div className="system-node node-home"><House/><span>YOUR HOME</span></div><div className="system-node node-battery"><BatteryCharging/><span>STORAGE</span></div><div className="system-center"><div className="center-ring"><Zap size={30}/></div><span>ENERGY<br/>MANAGEMENT</span></div><div className="system-caption">A CONNECTED ENERGY ECOSYSTEM <span>02 / 04</span></div></div></div></section>

      <section className="section services-section"><div className="container"><SectionHeading tag="SOLUTIONS FOR EVERY SCALE" title={<>One sun.<br/><em>Many possibilities.</em></>} copy="Whether you're powering a home, a growing business or a large operation, the right solar system starts with understanding what matters to you."/><div className="service-grid"><article className="service-card"><div className="service-icon"><House/></div><span className="mono">01 / RESIDENTIAL</span><h3>Power your<br/>own way.</h3><p>Make your home more energy independent with a solar solution tailored to your roof, routine and future plans.</p><a href="#contact" aria-label="Enquire about residential solar"><ArrowUpRight/></a></article><article className="service-card"><div className="service-icon"><Building2/></div><span className="mono">02 / COMMERCIAL</span><h3>Business as<br/>usual. Better.</h3><p>Turn unused rooftop space into a strategic energy asset that supports your business goals.</p><a href="#contact" aria-label="Enquire about commercial solar"><ArrowUpRight/></a></article><article className="service-card"><div className="service-icon"><Factory/></div><span className="mono">03 / INDUSTRIAL</span><h3>Think bigger.<br/>Generate more.</h3><p>Purpose-built solar infrastructure for demanding facilities and energy-intensive operations.</p><a href="#contact" aria-label="Enquire about industrial solar"><ArrowUpRight/></a></article></div></div></section>

      <section className="section why-section"><div className="container why-grid"><div className="why-sticky"><Eyebrow>THE SOLVANTA DIFFERENCE</Eyebrow><h2>Built on trust.<br/>Powered by <em>purpose.</em></h2><p>Good technology matters. So does the team standing behind it.</p><a href="#contact" className="under-link">Let's build something better <ArrowUpRight size={15}/></a></div><div className="why-list"><div><span>01</span><div><h3>Thoughtful by design</h3><p>No one-size-fits-all packages. Every recommendation begins with your energy needs, site conditions and priorities.</p></div><Check/></div><div><span>02</span><div><h3>Technology that earns its place</h3><p>We focus on proven components, considered system design and practical monitoring that makes sense.</p></div><Check/></div><div><span>03</span><div><h3>Clarity at every step</h3><p>Understand your options, the installation process and what to expect before making a decision.</p></div><Check/></div><div><span>04</span><div><h3>Here for the long run</h3><p>A solar system is a long-term investment. Our approach puts service, support and system performance first.</p></div><Check/></div></div></div></section>

      <section id="projects" className="section projects-section"><div className="container"><SectionHeading tag="SELECTED INSTALLATIONS" title={<>Real places.<br/><em>Lasting impact.</em></>} copy="Every site has its own story. Here are examples of the kinds of spaces solar can transform."/><div className="project-grid">{projects.map(p => <article className="project-card" key={p.no}><div className="project-image"><img src={p.image} alt={`${p.name} architecture project`} loading="lazy"/><span className="project-number">{p.no}</span><span className="project-capacity">{p.capacity}</span></div><div className="project-meta"><div><span className="mono">{p.place}</span><h3>{p.name}</h3></div><ArrowUpRight/></div></article>)}</div><p className="project-disclaimer">Illustrative project imagery. Replace with verified company installations and measured system data before publication.</p></div></section>

      <section className="section testimonial-section"><div className="container testimonial-inner"><Eyebrow>WORDS THAT MATTER</Eyebrow><div className="quote-mark">“</div><blockquote>Choosing solar should feel like a step forward, not a leap into the unknown. The right partner makes all the difference.</blockquote><div className="quote-attribution"><span className="quote-line"/><div><b>A better energy future</b><span>THE SOLVANTA APPROACH</span></div><span className="mono quote-index">03 / 04</span></div><p className="testimonial-note">Brand statement, not a customer testimonial. Add verified customer feedback and permissioned names before launch.</p></div></section>

      <section className="section faq-section"><div className="container faq-grid"><div><Eyebrow>GOOD QUESTIONS</Eyebrow><h2>Let's clear<br/>things <em>up.</em></h2><p>A few useful answers to get the conversation started.</p></div><div className="faq-list">{faqs.map(([q, a], i) => <div className={`faq-item ${faqOpen === i ? 'open' : ''}`} key={q}><button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} aria-expanded={faqOpen === i}><span>{q}</span>{faqOpen === i ? <Minus/> : <Plus/>}</button>{faqOpen === i && <p>{a}</p>}</div>)}</div></div></section>

      <section id="contact" className="section contact-section"><div className="container contact-grid"><div className="contact-copy"><Eyebrow>YOUR NEXT CHAPTER STARTS HERE</Eyebrow><h2>Let's make<br/>good energy<br/><em>happen.</em></h2><p>Tell us what you're looking to power. We'll help you find a considered way forward.</p><div className="contact-detail"><span>DIRECT ENQUIRIES</span><a href="mailto:hello@solvanta.example">hello@solvanta.example <ArrowUpRight size={15}/></a><small>Replace this demo email with your real business address.</small></div></div><div className="contact-form-wrap"><div className="form-heading"><span>START A CONVERSATION</span><span>01 — 05</span></div><ContactForm/></div></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-top"><a className="brand" href="#top"><span className="brand-mark">S</span><span>SOLVANTA<span className="brand-dot">.</span></span></a><span>ENERGY, REIMAGINED.</span><a href="#top" className="back-top">BACK TO TOP <ArrowUpRight size={14}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SOLVANTA. DEMO BRAND CONCEPT.</span><span>DESIGNED FOR A BRIGHTER TOMORROW.</span><div><a href="#contact" aria-label="Email"><ArrowUpRight size={15}/></a><a href="#contact" aria-label="LinkedIn"><Linkedin size={15}/></a><a href="#contact" aria-label="Instagram"><Instagram size={15}/></a></div></div></div></footer>
  </div>
}
