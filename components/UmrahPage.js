'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/ULandingPage.module.css';

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
      price: '$20,000',
      label: 'Premium',
      points: ['Point 1', 'Point 2', 'Point 3', 'Point 4']
    },
    {
      price: '$10,000',
      label: 'Standard',
      points: ['Point 1', 'Point 2', 'Point 3', 'Point 4']
    },
    {
      price: '$5,000',
      label: 'Basic',
      points: ['Point 1', 'Point 2', 'Point 3', 'Point 4']
    }
  ];

  return (
    <div className={styles.landingPage}>
      {/* First Section - What is Caravan72 */}
      <section className={styles.aboutSection}>
        <div className={styles.container2}>
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>
              How Do We <br />
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
      Our Outstanding <span style={{ color: '#078792' }}>Packages</span>
    </h2>
    <p className={styles.sectionSubtitle}>
      The Growing List Of Products, Features, And Services Available To You As A 
      Figma User. We&apos;ve Also Updated Our Terms
    </p>

   <div className={styles.featuresGrid}>
  {packages.map((pkg, index) => (
    <div 
      key={index} 
      className={`${styles.packageCard} ${styles.flipCard}`}
    >
      <div className={styles.flipCardInner}>
        
        {/* Front side */}
        <div 
          className={styles.flipCardFront}
          style={{ backgroundImage: `url(package2.jpg)` }}
        >
          <div className={styles.cardNumber}>{index + 1}</div>
          <div className={styles.packageLabel}>{pkg.label}</div>
        </div>
        
        {/* Back side */}
        <div 
          className={styles.flipCardBack}
          style={{ backgroundImage: `url(package2.jpg)` }}
        >
          <div className={styles.cardContent}>
            <div className={styles.price}>{pkg.price}</div>
            <ul className={styles.pointsList}>
              {pkg.points.map((point, pointIndex) => (
                <li key={pointIndex} className={styles.point}>
                  {point}
                </li>
              ))}
            </ul>
            <div className={styles.packageLabel}>{pkg.label}</div>
          </div>
        </div>

      </div>
    </div>
  ))}
</div>

<div className={styles.contactContainer}>
  <button className={styles.contactBtn}>Contact</button>
</div>

  </div>
</section>

{/* Fourth Section - Our Gallery Of Trust */}
<section className={styles.gallerySection}>
  <div className={styles.galleryBackground}></div>
  <div className={styles.galleryOverlay}></div>

  <div className={styles.container2}>
    <h2 className={styles.gallerySectionTitle}>
  Pictures
  <span style={{ color: 'black' }}> That Speak</span>
</h2>
    <p className={styles.gallerySectionSubtitle}>
      The Growing List Of Products, Features, And Services Available To You As A
      Figma User. We&apos;ve Also Updated Our Terms.
    </p>

    <div className={styles.galleryGrid}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className={styles.galleryItem}>
          <Image
            src={`/umrah/u${item}.jpg`}
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

{/* Testimonials Section - What Do Our Customer Say */}
<section className={styles.testimonialsSection}>
  <div className={styles.container2}>
<h2 className={styles.testimonialsTitle}>What Do Our Customer Say ?</h2>
    <p className={styles.testimonialsSubtitle}>
      The Growing List Of Products, Features, And Services Available To You As A 
      Figma User. We&apos;ve Also Updated Our Terms.
    </p>
    
    <div className={styles.testimonialsGrid}>
      <div className={styles.testimonialCard}>
        <p className={styles.testimonialText}>
  &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, 
  luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet.&quot;
</p>
        <div className={styles.testimonialAuthor}>
          <h4 className={styles.authorName}>John Smith</h4>
          <p className={styles.authorTitle}>CEO, Company</p>
        </div>
      </div>

      <div className={styles.testimonialCard}>
       <p className={styles.testimonialText}>
  &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, 
  luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet.&quot;
</p>
        <div className={styles.testimonialAuthor}>
          <h4 className={styles.authorName}>Sarah Johnson</h4>
          <p className={styles.authorTitle}>Manager, Business</p>
        </div>
      </div>

      <div className={styles.testimonialCard}>
       <p className={styles.testimonialText}>
  &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, 
  luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet.&quot;
</p>
        <div className={styles.testimonialAuthor}>
          <h4 className={styles.authorName}>Mike Wilson</h4>
          <p className={styles.authorTitle}>Director, Agency</p>
        </div>
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