'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/LandingPage.module.css';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('HAJJ');

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

  const packages = [
    {
      num: 1,
      title: "Premium",
      backTitle: "Premium Excellence",
      backPoints: [
        "Luxury 5-star hotel stay",
        "Private transport with guide",
        "Personalized itinerary planning",
        "24/7 assistance during the trip"
      ]
    },
    {
      num: 2,
      title: "Ease",
      backTitle: "Ease & Convenience",
      backPoints: [
        "Hassle-free booking process",
        "Affordable pricing options",
        "Flexible scheduling",
        "Comprehensive support"
      ]
    },
    {
      num: 3,
      title: "Bronze",
      backTitle: "Bronze Value",
      backPoints: [
        "Budget-friendly accommodations",
        "Group transport options",
        "Guided tours included",
        "Reliable service"
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
              How Do We <br />
            </h2>
            <h2 className={styles.brandNameTitle}>
              <span className={styles.brandName}>Help You</span> ?
            </h2>

            <div className={styles.aboutText}>
              <p>
                Whether you run a large business or a home-based one, reaching your target customers is key to your
                success. Dhaqaq helps you reach your customers through directories, community portals, and social networks.
                Dhaqaq will connect with thousands of dots in your community. Dhaqaq helps you plan, start, and
                grow your small business. Create a business account on Dhaqaq and connect with thousands of deals
                in your community. Dhaqaq makes it easier for people to find and connect with businesses of all types.
                Create a business account on Dhaqaq and connect with thousands of deals in your community.
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
            The Growing List Of Products, Features, And Services Available To You
            As A Figma User. We&apos;ve Also Updated Our Terms
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
                        <div className={styles.cardNumber}>{pkg.num}</div>
                      </div>
                    </div>

                    {/* Back */}
                    <div className={styles.flipCardBack}>
                      <div className={styles.backNumber}>{pkg.num}</div>
                      <h4 className={styles.backTitle}>{pkg.backTitle}</h4>
                      <ul className={styles.backPoints}>
                        {pkg.backPoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button className={styles.contactBtn}>Contact</button>
          </div>
        </div>
      </section>


      <section className={styles.gallerySection}>
        {/* Background layers */}
        <div className={styles.galleryBackground}></div>
        <div className={styles.galleryOverlay}></div>

        {/* Actual content on top */}
        <div className={styles.container2}>
          <h2 className={styles.gallerySectionTitle}>Pictures That Speak</h2>
          <p className={styles.gallerySectionSubtitle}>
            The Growing List Of Products, Features, And Services Available To You As A
            Figma User. We&apos;ve Also Updated Our Terms.
          </p>

          <div className={styles.galleryGrid}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className={styles.galleryItem}>
                <Image
                  src={`/gallery-image-${item}.jpg`}
                  alt={`Gallery ${item}`}
                  width={200}
                  height={150}
                  className={styles.galleryImage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className={styles.applicationSection}>
        <div className={styles.container2}>
          <h2 className={`${styles.applicationTitle} ${styles.gradientText}`}>
            Your Application Made Easy!
          </h2>
          <p className={styles.applicationSubtitle}>
            The Growing List Of Products, Features, And Services Available To You As A
            Figma User. We&apos;ve Also Updated Our Terms.
          </p>

          {/* Step Cards */}
          <div className={styles.stepsWrapper}>
            {[1, 2, 3, 4].map((step) => (
              <div className={styles.stepBlock} key={step}>
                <div className={styles.stepCard}>
                  <span className={styles.stepNumber}>{step}</span>
                  <div className={styles.stepIconPlaceholder}>
                    {step === 1 && "🪶"}
                    {step === 2 && "📝"}
                    {step === 3 && "➕"}
                    {step === 4 && "✔️"}
                  </div>
                  <div className={styles.stepLabel}>
                    {step === 1 && "Ease"}
                    {step === 2 && "Fill In Form"}
                    {step === 3 && "Application Added"}
                    {step === 4 && "Approved"}
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

      {/* Testimonials Section - What Do Our Customer Say */}
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