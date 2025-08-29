'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/LandingPage3.module.css';
import Link from 'next/link';

const HajjPackage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const availableSpots = 120; // Static value as per new info

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const howItWorksSteps = [
    {
      title: "You Register on Nusuk",
      desc: "We’ll guide you step-by-step on how to register and apply for your visa."
    },
    {
      title: "Select Your Package",
      desc: "Choose flights and hotels based on availability on Nusuk. Prices and accommodation will vary depending on your selection."
    },
    {
      title: "We Help Organize Your Hajj",
      desc: "Once your visa and package are secured, we step in to provide logistical guidance, religious support, and group coordination during the days of Hajj."
    },
    {
      title: "Travel & Stay Provided by Saudi Company",
      desc: "All hotel, flight, and transport arrangements are handled by the official Saudi provider you booked through Nusuk."
    }
  ];

  const whyChooseUsPoints = [
    "Most Experienced U.S. Agency on Nusuk Platform: Leading groups since the system began in 2022.",
    "Higher Success Rate: Our in-depth knowledge of Nusuk procedures gives you a greater chance of obtaining a visa and a package that suits your needs.",
    "Hajj Support You Can Rely On: From spiritual guidance to on-ground coordination—we’re with you every step of the way in the days of Hajj."
  ];

  const handleBookingClick = () => {
    console.log('Reserve spot clicked');
  };

  return (
    <div className={`${styles.hajjPackage} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.backgroundElements}>
        <div className={`${styles.bgCircle} ${styles.bgCircle1}`}></div>
        <div className={`${styles.bgCircle} ${styles.bgCircle2}`}></div>
        <div className={`${styles.bgCircle} ${styles.bgCircle3}`}></div>
      </div>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={`${styles.heroSection} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroTitle}>
              <h1 className={styles.gradientText}>Self-Service Hajj Package – 2026</h1>
            </div>
            <p className={styles.heroSubtitle}>🧭 Your Hajj. Your Way. With Expert Guidance.</p>
            <p className={styles.ctaDescription}>This is the same Hajj process offered by other agencies—but with superior guidance and higher success rates. You will personally register and select your package through the official Nusuk platform. We’ll walk you through the entire process and maximize your chances of securing a visa and package.</p>
          </div>
        </section>

        {/* Details Card */}
        <div className={styles.detailsCard}>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <h3 className={styles.detailIcon}>💲</h3>
              <h3>Cost</h3>
              <p className={styles.price}>$500</p>
              <p className={styles.priceNote}>Guidance & Support Fee</p>
            </div>
            <div className={styles.detailItem}>
              <h3 className={styles.detailIcon}>👥</h3>
              <h3>Available Spots</h3>
              <p className={styles.spotsCounter}>{availableSpots}</p>
              <p className={styles.priceNote}>Reserve your spot now</p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <section className={styles.featuresSection}>
          <h2 className={`${styles.sectionTitle} ${styles.teal}`}>📝 How It Works</h2>
          <div className={styles.featuresGrid}>
            {howItWorksSteps.map((step, index) => (
              <div key={index} className={styles.featureCard}>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className={styles.spiritualSection}>
          <div className={styles.spiritualGrid}>
            <div className={styles.spiritualContent}>
              <h2 className={styles.sectionTitle}>💡 Why Choose Us?</h2>
              <ul className={styles.servicesList}>
                {whyChooseUsPoints.map((point, index) => (
                  <li key={index} className={styles.serviceItem}>
                    <span className={styles.checkmark}>✅</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.guidanceCard}>
              <h3 className={styles.guidanceIcon}>🕋</h3>
              <h3>Hajj Support You Can Rely On</h3>
              <p>From spiritual guidance to on-ground coordination—we’re with you every step of the way in the days of Hajj.</p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className={styles.finalCtaSection}>
          <h2 className={styles.sectionTitle}>Ready to begin your Hajj journey with confidence?</h2>
          <p className={styles.ctaDescription}>Reserve your spot today – only {availableSpots} available.</p>
          <Link href="/contact">
            <button onClick={handleBookingClick} className={styles.finalCtaButton}>
              Reserve Your Spot
            </button>
          </Link>
        </section>

        <footer className={styles.footer}>
          <p>© 2025 Hajj Guidance Services. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HajjPackage;
