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
      buttonLink: "/hajj1", // or your desired route
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
      buttonLink: "/hajj3", // or your desired route
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
      buttonLink: "/hajj2", // or your desired route
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
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>
              Why <br />
            </h2>
            <h2 className={styles.brandNameTitle}>
              <span className={styles.brandName}>Caravan 72</span> ?
            </h2>

            <div className={styles.aboutText}>
              <p>
                Caravan 72 stands out from other Hajj providers for its unparalleled expertise and comprehensive services, particularly in navigating the new visa and pilgrimage systems. Unlike other groups, Caravan 72 takes full responsibility for every step of your journey. You do not have to:

                Deal with Nusuk directly

                Navigate the complexities of Saudi companies

                Manage the purchase of packages

                Apply for and obtain visas on your own

                We handle it all for you. From the moment you register until your safe return home, we act as your liaison, ensuring every detail is managed with precision and care—so you can remain focused solely on your spiritual journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.differenceSection}>
        <div className={styles.container2}>
          <h2 className={styles.sectionTitle}>
            <span style={{ color: "#4a9b93" }}>Packages</span> We Offer
          </h2>
          <p className={styles.sectionSubtitle}>
            Each package is crafted with care, backed by years of experience, and focused on providing a spiritually fulfilling and worry-free Hajj.
          </p>

          <div className={styles.featuresGrid}>
            {packages.map((pkg) => (
              <div className={styles.featureCard} key={pkg.num}>
                <div className={styles.flipCard}>
                  <div className={styles.flipCardInner}>

                    {/* Front */}
                    <div className={styles.flipCardFront}>
                      <div className={styles.imageContainer}>
                        <Image
                          src="/package1.jpg"
                          alt={`Package ${pkg.num}`}
                          width={200}
                          height={250}
                          className={styles.centerImage}
                        />
                        <div className={styles.cardNumber}>{pkg.title}</div>
                      </div>
                    </div>

                    {/* Back */}
                    {/* Back */}
                    <div className={styles.flipCardBack}>
                      <div className={styles.backNumber}>{pkg.num}</div>
                      <h4 className={styles.backTitle}>{pkg.backTitle}</h4>
                      <ul className={styles.backPoints}>
                        {pkg.backPoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                      <Link href={pkg.buttonLink}>
                        <button className={styles.packageButton}>
                          {pkg.buttonText}
                        </button>
                      </Link>
                    </div>


                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button className={styles.contactBtn}>Register Now</button>
          </div>
        </div>
      </section>

      {/* Updated Gallery Section with Year Categories */}
      <section className={styles.gallerySection}>
        {/* Background layers */}
        <div className={styles.galleryBackground}></div>
        <div className={styles.galleryOverlay}></div>

        {/* Actual content on top */}
        <div className={styles.container2}>
          <h2 className={styles.gallerySectionTitle}>Pictures That Speak</h2>
          <p className={styles.gallerySectionSubtitle}>
            Relive the spiritual journey through our collection of memorable moments from each Hajj season.
          </p>

          {/* Year Tabs */}
          <div className={styles.yearTabs}>
            {availableYears.map((year) => (
              <button
                key={year}
                className={`${styles.yearTab} ${activeYear === year ? styles.yearTabActive : ''}`}
                onClick={() => setActiveYear(year)}
              >
                Hajj {year}
              </button>
            ))}
          </div>

          {/* Gallery Grid for Selected Year */}
          {/* Gallery Grid for Selected Year */}
          <div className={styles.galleryContainer}>
            <h3 className={styles.activeYearTitle}>Hajj {activeYear} Memories</h3>
            <div className={styles.galleryGrid}>
              {galleryData[activeYear]?.map((image) => (
                <div key={image.id} className={styles.galleryItem}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={300}  // Increased from 200
                    height={225} // Increased from 150
                    className={styles.galleryImage}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

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
            <a href="#contact" className={styles.applicationContactButton}>CONTACT</a>
          </div>
        </div>
      </section>

      {/* Testimonials Section - What Do Our Customer Say 
      <section className={styles.testimonialsSection}>
        <div className={styles.container2}>
          <h2 className={styles.testimonialsTitle}>What Do Our Customer Say ?</h2>
          <p className={styles.testimonialsSubtitle}>
            The Growing List Of Products, Features, And Services Available To You As A
            Figma User. We&apos;ve Also Updated Our Terms.
          </p>

          <div className={styles.testimonialsGrid}>
            <div className={`${styles.testimonialCard}`}>
              <p className={styles.testimonialText}>
                &quot;By Far The Best Experience I Have Had Despite My Original Concerns Thanks To The Great Help I Received From Xxxxx Company&quot;
              </p>
              <p className={styles.testimonialAuthor}>Abdullah</p>
            </div>

            <div className={`${styles.testimonialCard} ${styles.center}`}>
              <p className={styles.testimonialText}>
                &quot;By Far The Best Experience I Have Had Despite My Original Concerns Thanks To The Great Help I Received From Xxxxx Company&quot;
              </p>
              <p className={styles.testimonialAuthor}>Abdullah</p>
            </div>

            <div className={`${styles.testimonialCard}`}>
              <p className={styles.testimonialText}>
                &quot;By Far The Best Experience I Have Had Despite My Original Concerns Thanks To The Great Help I Received From Xxxxx Company&quot;
              </p>
              <p className={styles.testimonialAuthor}>Abdullah</p>
            </div>
          </div>

        </div>
      </section>
      */}
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