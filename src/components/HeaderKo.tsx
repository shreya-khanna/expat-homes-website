import { useState, useEffect } from 'react';
import { Building, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderKoProps {
  current: 'en' | 'ja' | 'ko';
}

export default function HeaderKo({ current }: HeaderKoProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: '홈', anchor: 'home' },
    { label: '회사 소개', anchor: 'about' },
    { label: '서비스', anchor: 'services' },
    { label: '문의하기', anchor: 'contact' },
  ];

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
              <img src="/images/logo.png" alt="Expat Homes 로고" className="h-10 w-auto" />
              <span className="text-2xl font-display font-bold text-primary">엑스팻 홈즈</span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              {links.map(link => (
                <a
                  key={link.anchor}
                  href={`#${link.anchor}`}
                  className="text-primary hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              className="md:hidden text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4">
              {links.map(link => (
                <a
                  key={link.anchor}
                  href={`#${link.anchor}`}
                  className="block px-4 py-2 text-primary hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </nav>
      </header>
    </div>
  );
} 