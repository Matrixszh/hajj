"use client"
import Image from 'next/image';
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
      pathname === '/hajj1' ||
      pathname === '/hajj3' ||
      pathname === '/hajj2';
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
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={120}
              height={20}
              priority={true}
            />
          </Link>
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
              <Link href="/hajj1" className={styles.dropdownItem}>
                Full Service
              </Link>
              <Link href="/hajj3" className={styles.dropdownItem}>
                Self Service
              </Link>
              <Link href="/hajj2" className={styles.dropdownItem}>
                Pakistani Passport
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
            href="/contact"
            className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
          >
            Register
          </Link>
        </nav>

        {/* Desktop Contact Button */}
        <div className={styles.contactButton}>
          <Link href="/contact">RGISTER NOW</Link>
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
                href="/hajj1"
                className={`${styles.mobileSubNavLink} ${isActive('/hajj/packages') ? styles.active : ''}`}
                onClick={closeMenu}
              >
                Full Service
              </Link>
              <Link
                href="/hajj3"
                className={`${styles.mobileSubNavLink} ${isActive('/hajj/guide') ? styles.active : ''}`}
                onClick={closeMenu}
              >
                Self Service
              </Link>
              <Link
                href="/hajj2"
                className={`${styles.mobileSubNavLink} ${isActive('/hajj/requirements') ? styles.active : ''}`}
                onClick={closeMenu}
              >
                Pakistani Passport
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