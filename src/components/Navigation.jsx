import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [['Approach', '#approach'], ['Technology', '#technology'], ['Projects', '#projects'], ['Contact', '#contact']]
export default function Navigation() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return <header className="nav-wrap">
    <nav className="nav container" aria-label="Main navigation">
      <a className="brand" href="#top" onClick={close}><span className="brand-mark">S</span><span>SOLVANTA<span className="brand-dot">.</span></span></a>
      <div className={`nav-links ${open ? 'is-open' : ''}`}>
        {links.map(([label, href]) => <a key={label} href={href} onClick={close}>{label}</a>)}
        <a className="nav-mobile-cta" href="#contact" onClick={close}>Start a project <ArrowUpRight size={15}/></a>
      </div>
      <a className="nav-cta" href="#contact">Let's talk <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </nav>
  </header>
}
