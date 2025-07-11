import { useState, useEffect } from 'react';
import { Building, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  current: 'en' | 'ja' | 'ko';
}

export default function Header({ current }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'About', 'Services', 'Contact'];

  return (
    <div className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}
         style={{top: 0, left: 0}}>
      <div className="bg-white border-b border-gray-200">
        <LanguageSwitcher current={current} />
      </div>
      <header className={`bg-white transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}
              style={{marginTop: 0}}>
        <nav className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="Expat Homes Logo" className="h-10 w-auto" />
              <span className="text-2xl font-display font-bold text-primary">Expat Homes</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {links.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-primary hover:text-accent transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4">
              {links.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block px-4 py-2 text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}