'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/LandingPage1.module.css';
import Link from 'next/link';

const HajjPackage = () => {
  const [spotsLeft, setSpotsLeft] = useState(64);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Simulate decreasing spots for urgency
  }, []);

  const features = [
    {
      icon: "✈️",
      title: "Airfare Included",
      desc: "Included through Nusuk platform"
    },
    {
      icon: "🏨",
      title: "5-Star Accommodation",
      desc: "Walking distance to Haram in Makkah"
    },
    {
      icon: "🍽️",
      title: "Daily Meals",
      desc: "Breakfast & dinner buffet included"
    },
    {
      icon: "🚄",
      title: "High-Speed Transport",
      desc: "Comfortable travel between cities"
    },
    {
      icon: "⛺",
      title: "Upgraded Tents",
      desc: "Air-conditioned comfort in Mina & Arafat"
    },
    {
      icon: "📚",
      title: "Expert Guidance",
      desc: "Experienced Shia scholars throughout"
    }
  ];

  const spiritualServices = [
    "All rituals per Shia Ja'fari Fiqh",
    "Organized A'mal and prayer sessions",
    "Daily majlis programs",
    "Extensive Ziarat tours",
    "24/7 spiritual support"
  ];

  const inclusions = [
    { icon: "✈️", text: "Airfare included" },
    { icon: "📍", text: "Hajj visa via official Nusuk platform" },
    { icon: "🏨", text: "5-Star Makkah & 4-Star Madinah hotels" },
    { icon: "🍽️", text: "Daily breakfast & dinner buffet" },
    { icon: "🚄", text: "High-speed train transportation" },
    { icon: "⛺", text: "Upgraded AC tents in Mina & Arafat" },
    { icon: "📚", text: "Experienced Shia scholars guidance" },
    { icon: "🎧", text: "Headsets for rituals & lectures" },
    { icon: "🎁", text: "Complete Hajj gift pack included" }
  ];

  const handleBookingClick = () => {
    // Add your booking logic here
    console.log('Booking clicked');
  };

  const handleContactClick = () => {
    // Add your contact logic here
    console.log('Contact clicked');
  };

  return (
    <div className={styles.hajjPackage}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={`${styles.bgCircle} ${styles.bgCircle1}`}></div>
        <div className={`${styles.bgCircle} ${styles.bgCircle2}`}></div>
        <div className={`${styles.bgCircle} ${styles.bgCircle3}`}></div>
      </div>

      {/* Hero Section */}
      <section className={`${styles.heroSection} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.heroTitle}>
          <div className={styles.titleIcon}>🌙</div>
          <h1>Hajj 2025</h1>
        </div>
        <p className={styles.heroSubtitle}>Full-Service Premium Package</p>
        <div className={styles.detailsCard}>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>📅</div>
              <h3>May 15 – June 3</h3>
              <p className={styles.priceNote2}>Tentative dates</p>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>💰</div>
              <div className={styles.price}>$16,400</div>
              <p className={styles.priceNote}>Standard Package <p className={styles.priceNote2}>$11,400</p></p>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>👥</div>
              <div className={styles.spotsCounter}>{spotsLeft}</div>
              <p>spots remaining</p>
              <p className={styles.priceNote}></p>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.heroContent}>




            {/* CTA Button */}
            <Link href="/contact">
              <button className={styles.ctaButton} onClick={handleBookingClick}>
                Secure Your Spiritual Journey
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* Package Comparison Section - Add this before features section */}
      {/* Package Comparison Section */}
      <section className={styles.packageSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Choose Your Package</h2>
          <div className={styles.packageGrid}>

            {/* Standard Package Card */}
            <div className={styles.packageCard}>
              <div className={styles.packageHeader}>
                <h3 className={styles.packageTitle}>Standard</h3>
                <div className={styles.packagePrice}>
                  <span className={styles.price}>$11400</span>
                  <p className={styles.priceNote}>per person</p>
                </div>
              </div>
              <div className={styles.packageFeatures}>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Mecca Hotel in Azizla</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Hotel in Medina: 3 star</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Breakfast and Dinner</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Flight from Nusuk Platform</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Highspeed Train to Mecca</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Mina transport NOT provided for 10th & 11th</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>All Local Ziarat</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Complete Preparation Classes</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>All Rooms are Quad Sharing</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Double and Triple Occupancy Extra</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Hajj Package (Cinch Bag, Guide, Scarf)</span>
                </div>
              </div>
              <button className={styles.ctaButton} onClick={handleBookingClick}>
                Select Standard
              </button>
            </div>

            {/* Deluxe Package Card */}
            <div className={`${styles.packageCard} ${styles.premiumCard}`}>
              <div className={styles.packageBadge}>Most Popular</div>
              <div className={styles.packageHeader}>
                <h3 className={styles.packageTitle}>Deluxe</h3>
                <div className={styles.packagePrice}>
                  <span className={styles.price}>$16400</span>
                  <p className={styles.priceNote}>per person</p>
                </div>
              </div>
              <div className={styles.packageFeatures}>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Hotel in Mecca: ANJUM or Similar 5 star</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Hotel in Medina: 4 Star</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Breakfast and Dinner</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Flight from Nusuk Platform</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Highspeed Train to Mecca</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Mina transport provided on 10th and 11th</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>All Local Ziarat</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Complete Preparation Classes</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>All Rooms are Quad Sharing</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Double and Triple Occupancy Extra</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>Hajj Package (Cinch Bag, Guide, Scarf)</span>
                </div>
              </div>
              <button className={styles.finalCtaButton} onClick={handleBookingClick}>
                Select Deluxe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Premium Features</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spiritual Services Section */}
      <section className={styles.spiritualSection}>
        <div className={styles.container}>
          <div className={styles.spiritualGrid}>
            <div className={styles.spiritualContent}>
              <h2 className={styles.sectionTitle}>🕌 Spiritual & Religious Support</h2>
              <div className={styles.servicesList}>
                {spiritualServices.map((service, index) => (
                  <div key={index} className={styles.serviceItem}>
                    <span className={styles.checkmark}>✓</span>
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.guidanceCard}>
              <h3>Expert Guidance</h3>
              <div className={styles.guidanceIcon}>📚</div>
              <p>
                Our experienced Shia scholars will guide you through every step of your sacred journey,
                ensuring all rituals are performed according to authentic Shia Ja&apos;fari Fiqh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Inclusions */}
      <section className={styles.inclusionsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>🛫 Everything Included</h2>
          <div className={styles.inclusionsGrid}>
            {inclusions.map((item, index) => (
              <div key={index} className={styles.inclusionItem}>
                <span className={styles.inclusionIcon}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.finalCtaSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>✨ Focus on Your Hajj – We Handle the Rest</h2>
          <p className={styles.ctaDescription}>
            From visa processing to Ziarat tours, our full-service package takes care of every detail
            so you can fully dedicate yourself to the spiritual journey of a lifetime.
          </p>

          <div className={styles.urgencyCard}>
            <div className={styles.urgencyIndicator}>
              <div className={styles.pulseDot}></div>
              <span>Limited Spots Available</span>
            </div>
            <div className={styles.spotsRemaining}>{spotsLeft}</div>
            <p>Don&apos;t miss this opportunity for a blessed journey</p>
          </div>
          <Link href="/contact">
            <button className={styles.finalCtaButton} onClick={handleBookingClick}>
              Reserve Your Spot Today
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>Experience the journey of a lifetime with our premium Hajj package • May Allah accept your pilgrimage</p>
        </div>
      </footer>
    </div>
  );
};

export default HajjPackage;