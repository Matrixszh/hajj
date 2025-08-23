'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/LandingPage.module.css';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('HAJJ');
  const [activeYear, setActiveYear] = useState('2025'); // New state for active year - defaults to latest

  const tabContent = {
    HAJJ: {
      title: 'Guarantee',
      description: 'Catalyze the next generation of forest carbon projects. Technology enables amazing visibility into on-the-ground impacts, rigorous carbon accounting and ecologically positive design.'
    },
    UMRAH: {
      title: 'Excellence',
      description: 'Experience exceptional Umrah services with our dedicated team. We provide comprehensive packages tailored to your spiritual journey needs.'
    },
    ZIYARAH: {
      title: 'Heritage',
      description: 'Discover the rich Islamic heritage through our carefully curated Ziyarah tours. Visit historical sites with expert guidance and authentic experiences.'
    }
  };

  // Gallery data organized by year
  const galleryData = {
    '2025': [
      { id: 19, src: '/hajj251.jpg', alt: 'Hajj 2025 - Sacred Journey Begins' },
      { id: 20, src: '/hajj252.jpg', alt: 'Hajj 2025 - Unity in Prayer' },
      { id: 21, src: '/hajj253.jpg', alt: 'Hajj 2025 - Spiritual Gathering' }
    ],
    '2024': [
      { id: 1, src: '/hajj241.jpg', alt: 'Hajj 2024 - Kaaba' }
    ],
    '2023': [
      { id: 7, src: '/hajj231.jpg', alt: 'Hajj 2023 - Masjid Nabawi' }
    ],
    '2022': [
      { id: 13, src: '/hajj221.jpg', alt: 'Hajj 2022 - Arrival' }
    ]
  }

  const availableYears = Object.keys(galleryData).sort((a, b) => b - a); // Sort years in descending order

  const packages = [
    {
      num: 1,
      title: "Full Service",
      backTitle: "Full Service Hajj",
      buttonText: "Learn More",
      buttonLink: "/full-service-hajj", // or your desired route
      backPoints: [
        "Hajj visa obtained on your behalf",
        "Trip fully organized by our expert team",
        "Rooming with our group for a familiar, supportive environment",
        "Logistical support for a seamless experience",
        "On-ground guidance and assistance at every stage of your journey"
      ]
    },
    {
      num: 2,
      title: "Self Service",
      backTitle: "Self Service Hajj",
      buttonText: "Learn More",
      buttonLink: "/self-service-hajj", // or your desired route
      backPoints: [
        "Guidance in obtaining your Hajj visa",
        "Trip arranged by an authorized Saudi company",
        "Help with rooming among our group (subject to availability)",
        "Support to bridge logistical gaps",
        "Full guidance during all Hajj rituals"
      ]
    },
    {
      num: 3,
      title: "Pakistani Passport",
      backTitle: "Pakistani Passport Hajj",
      buttonText: "Learn More",
      buttonLink: "/pakistani-passport-hajj", // or your desired route
      backPoints: [
        "Visa guaranteed through our trusted channels",
        "Trip organized by our team (you will not be sent with Pakistan-based groups)",
        "Deluxe accommodations and arrangements per U.S. standards",
        "Comprehensive guidance and support throughout your Hajj journey"
      ]
    }
  ];


  return (
    <div className={styles.landingPage}>
      {/* First Section - What is Caravan72 */}

      {/* Sixth Section - Quote */}
      <section className={styles.quoteSection}>
        <div className={styles.container2}>
          <blockquote className={styles.quote}>
            <p className={styles.quoteText}>
              &quot; And Whoever Puts His Trust In <span className={styles.allah}>Allah</span><br />
              He Will Be <span className={styles.enough}>Enough</span> For Him &quot;
            </p>
            <cite className={styles.quoteCitation}>
              <span className={styles.quranText}>Quran</span> 16:5
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container2}>
          <div className={styles.footerContent}>
            <div className={styles.footerLeft}>
              <div className={styles.footerLogo}>LOGO</div>
              <p className={styles.copyright}>Copyright 2024. All Rights Reserved.</p>
            </div>
            <div className={styles.footerRight}>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon} aria-label="Facebook">
                  <span>f</span>
                </a>
                <a href="#" className={styles.socialIcon} aria-label="Twitter">
                  <span>t</span>
                </a>
                <a href="#" className={styles.socialIcon} aria-label="Instagram">
                  <span>i</span>
                </a>
                <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                  <span>in</span>
                </a>
              </div>
              <p className={styles.address}>Address</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;