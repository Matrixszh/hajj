"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHajjExpanded, setIsHajjExpanded] = useState(false);

  // Function to check if a link is active
  const isActive = (path) => {
    return pathname === path;
  };

  // Function to check if any hajj sub-route is active
  const isHajjActive = () => {
    return pathname === '/hajj' ||
      pathname === '/hajj/packages' ||
      pathname === '/hajj/guide' ||
      pathname === '/hajj/requirements';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsHajjExpanded(false);
  };

  const toggleHajjExpanded = (e) => {
    e.preventDefault();
    setIsHajjExpanded(!isHajjExpanded);
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
            href="/"
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            Home
          </Link>

          {/* Desktop Hajj with Dropdown */}
          <div className={styles.dropdown}>
            <Link
              href="/hajj"
              className={`${styles.navLink} ${isHajjActive() ? styles.active : ''}`}
            >
              Hajj
            </Link>
            <div className={styles.dropdownContent}>
              <Link href="/hajj/packages" className={styles.dropdownItem}>
                Hajj Packages
              </Link>
              <Link href="/hajj/guide" className={styles.dropdownItem}>
                Hajj Guide
              </Link>
              <Link href="/hajj/requirements" className={styles.dropdownItem}>
                Requirements
              </Link>
            </div>
          </div>

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
          <Link
            href="/contact"
            className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
          >
            Contact
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
            href="/"
            className={`${styles.mobileNavLink} ${isActive('/') ? styles.active : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>

          {/* Mobile Hajj with Expandable Sub-menu */}
          <div className={styles.mobileDropdown}>
            <div className={styles.mobileNavLinkContainer}>
              <Link
                href="/hajj"
                className={`${styles.mobileNavLink} ${isHajjActive() ? styles.active : ''}`}
                onClick={closeMenu}
              >
                Hajj
              </Link>
              <button
                className={styles.mobileExpandButton}
                onClick={toggleHajjExpanded}
                aria-label="Toggle Hajj submenu"
              >
                <span className={`${styles.expandIcon} ${isHajjExpanded ? styles.expandIconRotated : ''}`}>
                  ▼
                </span>
              </button>
            </div>

            {/* Mobile Sub-menu */}
            <div className={`${styles.mobileSubMenu} ${isHajjExpanded ? styles.mobileSubMenuOpen : ''}`}>
              <Link
                href="/hajj/packages"
                className={`${styles.mobileSubNavLink} ${isActive('/hajj/packages') ? styles.active : ''}`}
                onClick={closeMenu}
              >
                Hajj Packages
              </Link>
              <Link
                href="/hajj/guide"
                className={`${styles.mobileSubNavLink} ${isActive('/hajj/guide') ? styles.active : ''}`}
                onClick={closeMenu}
              >
                Hajj Guide
              </Link>
              <Link
                href="/hajj/requirements"
                className={`${styles.mobileSubNavLink} ${isActive('/hajj/requirements') ? styles.active : ''}`}
                onClick={closeMenu}
              >
                Requirements
              </Link>
            </div>
          </div>

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
            Register
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