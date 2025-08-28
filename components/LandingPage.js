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
      description: 'The most experienced Western group on the new Nusuk platform, having successfully organized and led Hajj groups since its introduction in 2022. From visas and flights to accommodations, transportation, and on-the-ground support, we take care of every detail—so you don’t have to.',
      image: '/banner/hajj-temp.jpg'
    },
    UMRAH: {
      title: 'Umrah Journey',
      description: 'Embark on a spiritual journey of a lifetime with our carefully curated Umrah package, designed to provide a seamless and fulfilling pilgrimage experience. With expert guidance, comfortable accommodations, and dedicated support throughout your journey, let us help you focus on what truly matters—your devotion and worship. Begin your sacred Umrah journey with us today.',
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
                Caravan 72 is more than a travel service — we are a dedicated team committed to guiding you through the sacred journey of Hajj and Umrah with ease, comfort, and spiritual focus.
                With 20 years of experience and a proven track record of serving thousands of pilgrims, we are proud to be the most experienced Western group on the Nusuk platform, having successfully organized Hajj groups since 2022. While others are still navigating the system, Caravan 72 has already led multiple groups with unmatched expertise
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
              REGISTER
            </Link>
          </div>
        </div>
      </section>


      {/* Third Section - Why Are We Different */}
      <section className={styles.differenceSection}>
        <div className={styles.container2}>
          <h2 className={styles.sectionTitle}>Why Are We Different ?</h2>
          <p className={styles.sectionSubtitle}>
            We handle the details so you can focus on your spiritual journey.
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
                    <div className={styles.logoPlaceholder}>✓</div>
                  </div>
                  <h3 className={styles.cardTitle}>Visa Approval</h3>
                  <p className={styles.cardText}>
                    Unlike many Hajj providers who leave the visa approval process to the pilgrim’s responsibility, Caravan 72 gets the visa approval, giving peace of mind to those planning their spiritual journey. With our in-depth understanding of the process and established connections, we handle all visa-related concerns efficiently.
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
                    <div className={styles.logoPlaceholder}>🤝</div>
                  </div>
                  <h3 className={styles.cardTitle}>Liaison with Nusuk</h3>
                  <p className={styles.cardText}>
                    Caravan 72 takes on the role of a liaison between pilgrims and Nusuk, eliminating the need for pilgrims to manage any dealings with the Nusuk platform. Our team handles all interactions, ensuring that the process remains smooth and stress-free for our clients. This allows pilgrims to focus entirely on their spiritual journey, knowing that we are filling in the logistical gaps that Nusuk does not cover.
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
                    <div className={styles.logoPlaceholder}>✈️</div>
                  </div>
                  <h3 className={styles.cardTitle}>End-to-End Service</h3>
                  <p className={styles.cardText}>
                    From visa processing to travel arrangements and accommodations, Caravan 72 manages every aspect of the pilgrimage. We take care of all the details, including organizing transportation, lodging, and the finer logistical points, so pilgrims don’t have to worry about anything except fulfilling their religious obligations.
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
          <h2 className={`${styles.applicationTitle} ${styles.gradientText}`}>
            The Hajj Process!
          </h2>
          <p className={styles.applicationSubtitle}>
            Caravan 72 Makes Your Hajj process into 4 Easy Steps
          </p>

          {/* Step Cards */}
          <div className={styles.stepsWrapper}>
            {[1, 2, 3, 4].map((step) => (
              <div className={styles.stepBlock} key={step}>
                <div className={styles.stepCard}>
                  <span className={styles.stepNumber}>{step}</span>
                  <div className={styles.stepIconPlaceholder}>
                    {step === 1 && "📝"}
                    {step === 2 && "💲"}
                    {step === 3 && "🪶"}
                    {step === 4 && "✔️"}
                  </div>
                  <div className={styles.stepLabel}>
                    {step === 1 && "Register & Pay Deposit"}
                    {step === 2 && "Submit Funds Before Deadline"}
                    {step === 3 && "Visa & Package Confirmation"}
                    {step === 4 && "Prepare for Hajj & Pack Your Bags"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stepper Indicator */}
          <div className={styles.connectorLine}>
            {[1, 2, 3, 4].map((dot) => (
              <div key={dot} className={styles.connectorDot}></div>
            ))}
          </div>

          {/* Contact Button */}
          <div className={styles.applicationContactContainer}>
            <a href="/contact" className={styles.applicationContactButton}>REGISTER</a>
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
            <div className={styles.footerLogo}>
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Company Logo"
                  width={60}
                  height={20}
                  priority={true}
                />
              </Link>
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
