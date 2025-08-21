'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Landing.module.css';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('HAJJ');

  const tabContent = {
    HAJJ: {
      title: 'Hajj Pilgrimage',
      description: 'Experience the spiritual journey of a lifetime with our comprehensive Hajj packages. We provide complete guidance, comfortable accommodation, and seamless travel arrangements to ensure your pilgrimage is performed with peace of mind and devotion.',
      image: '/banner/hajj-temp.jpg'
    },
    UMRAH: {
      title: 'Umrah Journey',
      description: 'Embark on the blessed journey of Umrah with our expertly crafted packages. From visa processing to accommodation near the Holy Mosque, we take care of every detail so you can focus on your spiritual experience and worship.',
      image: '/banner/hajj-banner.jpg'
    },
    ZIYARAH: {
      title: 'Ziyarah Tours',
      description: 'Explore the historical and spiritual sites of Islam with our guided Ziyarah tours. Visit the significant places that hold deep meaning in Islamic history, enriching your knowledge and strengthening your faith through these sacred journeys.',
      image: '/Zbf.jpg'
    }
  };

  const steps = [
    { icon: "⚡", title: "Ease", iconSrc: "/feather.svg" },
    { icon: "📄", title: "Fill In Form", iconSrc: "/form.svg" },
    { icon: "➕", title: "Application Added", iconSrc: "/plus-icon.svg" },
    { icon: "✓", title: "Approved", iconSrc: "/check-icon.svg" }
  ];

  return (
    <div className={styles.landingPage}>
      {/* First Section - What is Caravan72 */}
      <section className={styles.aboutSection}>
        <div className={styles.container2}>
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>
              What is<br />
              <span className={styles.brandName}>Caravan72</span> ?
            </h2>
            <div className={styles.aboutText}>
              <p>
                Whether you run a large business or a home-based one, reaching your target customers is key to your 
                success. Dhaqaq helps you reach your customers through directories, community portals, and social networks. 
                Dhaqaq will connect with thousands of dots in your community. Dhaqaq helps you plan, start, and 
                grow your small business. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - What Do We Offer */}
      <section className={styles.offerSection}>
        <div className={styles.offerBackground}></div>
        <div className={styles.offerOverlay}></div>
        
        <div className={styles.container2}>
          <h2 className={styles.offerTitle}>What Do We Offer ?</h2>
          
          <div className={styles.tabContainer}>
            <div className={styles.tabs}>
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.contentCard}>
            <div className={styles.cardContent}>
              <div className={styles.textContent}>
                <h3 className={styles.cardTitle}>{tabContent[activeTab].title}</h3>
                <p className={styles.cardDescription}>
                  {tabContent[activeTab].description}
                </p>
              </div>
              <div className={styles.imageContainer}>
                <Image
                  src={tabContent[activeTab].image}
                  alt={tabContent[activeTab].title}
                  width={300}
                  height={300}
                  className={styles.cardImage}
                />
              </div>
            </div>
          </div>

          <div className={styles.contactButtonContainer}>
            <Link href="/contact" className={styles.contactButton}>
              CONTACT
            </Link>
          </div>
        </div>
      </section>

    {/* Third Section - Why Are We Different */}
<section className={styles.differenceSection}>
  <div className={styles.container2}>
    <h2 className={styles.sectionTitle}>Why Are We Different ?</h2>
    <p className={styles.sectionSubtitle}>
      The Growing List Of Products, Features, And Services Available To You As A 
      Figma User. We&apos;ve Also Updated Our Terms.
    </p>

    <div className={styles.cardsGrid}>
      {/* First Card - Flippable */}
      <div className={`${styles.cardContainer} ${styles.flippable}`}>
        <div className={styles.cardInner}>
          {/* Front: Decorative Card with Number */}
          <div className={styles.cardFront}>
            <div className={styles.decorativeCard}>
              <div className={styles.cardNumber}>1</div>
            </div>
          </div>
          {/* Back: Text Content */}
          <div className={styles.cardBack}>
            <div className={styles.cardLogo}>
              <div className={styles.logoPlaceholder}>⚡</div>
            </div>
            <h3 className={styles.cardTitle}>Fast</h3>
            <p className={styles.cardText}>
              Why Figma&apos;s logo isn&apos;t just two Ferrus logo Figma. Then, dig into the Figma, logo, wordmark, and typography used in the Figma experience. About the Figma logo in EPS vector. Logo in a lot of ways, is at the centre of our visual identity. From this powerful foundation are, designed with a full approach for creating the best experience.
            </p>
          </div>
        </div>
      </div>

      {/* Second Card - Flippable */}
      <div className={`${styles.cardContainer} ${styles.flippable}`}>
        <div className={styles.cardInner}>
          {/* Front: Decorative Card with Number */}
          <div className={styles.cardFront}>
            <div className={styles.decorativeCard}>
              <div className={styles.cardNumber}>2</div>
            </div>
          </div>
          {/* Back: Text Content */}
          <div className={styles.cardBack}>
            <div className={styles.cardLogo}>
              <div className={styles.logoPlaceholder}>⚡</div>
            </div>
            <h3 className={styles.cardTitle}>Reliable</h3>
            <p className={styles.cardText}>
              Why Figma&apos;s logo isn&apos;t just two Ferrus logo Figma. Then, dig into the Figma, logo, wordmark, and typography used in the Figma experience. About the Figma logo in EPS vector. Logo in a lot of ways, is at the centre of our visual identity. From this powerful foundation are, designed with a full approach for creating the best experience.
            </p>
          </div>
        </div>
      </div>

      {/* Third Card - Flippable */}
      <div className={`${styles.cardContainer} ${styles.flippable}`}>
        <div className={styles.cardInner}>
          {/* Front: Decorative Card with Number */}
          <div className={styles.cardFront}>
            <div className={styles.decorativeCard}>
              <div className={styles.cardNumber}>3</div>
            </div>
          </div>
          {/* Back: Text Content */}
          <div className={styles.cardBack}>
            <div className={styles.cardLogo}>
              <div className={styles.logoPlaceholder}>⚡</div>
            </div>
            <h3 className={styles.cardTitle}>Easy</h3>
            <p className={styles.cardText}>
              Why Figma&apos;s logo isn&apos;t just two Ferrus logo Figma. Then, dig into the Figma, logo, wordmark, and typography used in the Figma experience. About the Figma logo in EPS vector. Logo in a lot of ways, is at the centre of our visual identity. From this powerful foundation are, designed with a full approach for creating the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Fourth Section - Your Application Made Easy */}
      <section className={styles.applicationSection}>
        <div className={styles.container2}>
          <h2 className={styles.applicationTitle}>Your Application Made Easy !</h2>
          <p className={styles.applicationSubtitle}>
            The Growing List Of Products, Features, And Services Available To You As A 
            Figma User. We&apos;ve Also Updated Our Terms.
          </p>

          <div className={styles.stepsWrapper}>
            {steps.map((step, idx) => (
              <div key={idx} className={styles.stepBlock}>
                <div className={styles.stepCard}>
                  <span className={styles.stepNumber}>{idx + 1}</span>
                  {/* You can uncomment this when you have the actual SVG icons */}
                  {/* 
                  <Image
                    src={step.iconSrc}
                    alt={step.title}
                    width={32}
                    height={32}
                    className={styles.stepIcon}
                  />
                  */}
                  {/* Temporary emoji icons - replace with SVGs */}
                  <div style={{ fontSize: '32px' }}>{step.icon}</div>
                  <p className={styles.stepLabel}>{step.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Line with Dots */}
          <div className={styles.progressLine}>
            {[1, 2, 3, 4].map((dot) => (
              <div key={dot} className={styles.progressDot}></div>
            ))}
          </div>

          <div className={styles.applicationContactContainer}>
            <Link href="/contact" className={styles.applicationContactButton}>
              CONTACT
            </Link>
          </div>
        </div>
      </section>

      {/* Fifth Section - Quote */}
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