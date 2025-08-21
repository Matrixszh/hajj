"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Function to check if a link is active
  const isActive = (path) => {
    return pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">LOGO</Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <Link 
            href="/hajj" 
            className={`${styles.navLink} ${isActive('/hajj') ? styles.active : ''}`}
          >
            Hajj
          </Link>
          <Link 
            href="/umrah" 
            className={`${styles.navLink} ${isActive('/umrah') ? styles.active : ''}`}
          >
            Umrah
          </Link>
          <Link 
            href="/ziyarah" 
            className={`${styles.navLink} ${isActive('/ziyarah') ? styles.active : ''}`}
          >
            Ziyarah
          </Link>
        </nav>
        
        {/* Desktop Contact Button */}
        <div className={styles.contactButton}>
          <Link href="/contact">CONTACT</Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerActive : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerActive : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.hamburgerActive : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <Link 
            href="/hajj" 
            className={`${styles.mobileNavLink} ${isActive('/hajj') ? styles.active : ''}`}
            onClick={closeMenu}
          >
            Hajj
          </Link>
          <Link 
            href="/umrah" 
            className={`${styles.mobileNavLink} ${isActive('/umrah') ? styles.active : ''}`}
            onClick={closeMenu}
          >
            Umrah
          </Link>
          <Link 
            href="/ziyarah" 
            className={`${styles.mobileNavLink} ${isActive('/ziyarah') ? styles.active : ''}`}
            onClick={closeMenu}
          >
            Ziyarah
          </Link>
          <Link 
            href="/contact" 
            className={styles.mobileContactButton}
            onClick={closeMenu}
          >
            CONTACT
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className={styles.mobileBackdrop}
          onClick={closeMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;