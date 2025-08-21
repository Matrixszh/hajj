'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Z.module.css';

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

   const ziyaratData = [
    {
      number: "1",
      title: "Mecca",
      description: "We&apos;re Reaching Out To Let You Know We&apos;re Updating For Our Starter And Professional Plans. We Do This Regularly To Ensure These Terms Are Clear And Cover The Growing List Of Products, Features, And Services Available To You As A Figma User. We&apos;ve Also Updated Our Terms To Stay Current With Applicable Laws And Regulations And To Add Clarity Where We Believe It Would Be Useful."
    },
    {
      number: "2",
      title: "Medinah",
      description: "We&apos;re Reaching Out To Let You Know We&apos;re Updating For Our Starter And Professional Plans. We Do This Regularly To Ensure These Terms Are Clear And Cover The Growing List Of Products, Features, And Services Available To You As A Figma User. We&apos;ve Also Updated Our Terms To Stay Current With Applicable Laws And Regulations And To Add Clarity Where We Believe It Would Be Useful."
    },
    {
      number: "3",
      title: "Jabl-E-Noor",
      description: "We&apos;re Reaching Out To Let You Know We&apos;re Updating For Our Starter And Professional Plans. We Do This Regularly To Ensure These Terms Are Clear And Cover The Growing List Of Products, Features, And Services Available To You As A Figma User. We&apos;ve Also Updated Our Terms To Stay Current With Applicable Laws And Regulations And To Add Clarity Where We Believe It Would Be Useful."
    }
  ];

  

  return (
    <div className={styles.landingPage}>
      {/* First Section - What is Caravan72 */}
    <section className={styles.aboutSection}>
      <div className={styles.container2}>
        <div className={styles.aboutContent}>
          <h2 className={styles.aboutTitle}>
            Your Ziyarat<br />
            <span className={styles.brandName}>Our Efforts !</span> 
          </h2>
          <div className={styles.aboutText}>
            <p>
              Whether you run a large business or a home-based one, reaching your 
              target customers is key to your success. Dhaqaq helps you plan, start, and 
              grow your small business. Create a business account on Dhaqaq and 
              connect with thousands of desis in your community. Dhaqaq helps you plan, 
              start, and grow your small business. Create a business account on Dhaqaq 
              and connect with thousands of desis in your community. Dhaqaq helps you 
              plan, start, and grow your small business. Create a business account on 
              Dhaqaq and connect with thousands of desis in your community.
            </p>
          </div>
        </div>
        <Link href="/contact" className={styles.exploreButton2}>
          CONTACT
        </Link>
      </div>
    </section>

      

<section className={styles.differenceSection}>
  <div className={styles.differenceBackground}></div>
  <div className={styles.differenceOverlay}></div>
  
  <div className={styles.container2}>
    <h2 className={styles.sectionTitle}>
      Types <span style={{ color: '#078792' }}> Of Ziyarat We Offer</span>
    </h2>
    <p className={styles.sectionSubtitle}>
      The Growing List Of Products, Features, And Services Available To You As A 
      Figma User. We&apos;ve Also Updated Our Terms
    </p>

    <div className={styles.featuresGrid}>
      {ziyaratData.map((pkg, index) => (
        <div 
          key={index} 
          className={`${styles.packageCard} ${styles.flipCard}`}
        >
          <div className={styles.flipCardInner}>
            {/* Front side */}
            <div 
              className={styles.flipCardFront}
              style={{ backgroundImage: `url(/z1.png)` }}
            >
              <div className={styles.cardNumber}>{pkg.number}</div>
              <div className={styles.packageLabel}>{pkg.title}</div>
            </div>
            
            {/* Back side */}
            <div 
              className={styles.flipCardBack}
              style={{ backgroundImage: `url(/z1.png)` }}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{pkg.title}</h3>
                <p className={styles.cardDescription}>
                  {pkg.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Fourth Section - Our Gallery Of Trust */}
      <section className={styles.gallerySection}>
        <div className={styles.container2}>
          <h2 className={styles.gallerySectionTitle}>Pictures <span style={{ color: 'black' }} >That Speak</span></h2>
          
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

     
{/* Testimonials Section - What Do Our Customer Say */}
<section className={styles.testimonialsSection}>
  <div className={styles.container2}>
    <h2 className={styles.testimonialsTitle}>
      What Do Our <span className={styles.customerHighlight}>Customer</span> Say ?
    </h2>
    <p className={styles.testimonialsSubtitle}>
      The Growing List Of Products, Features, And Services Available To You As A<br />
      Figma User. We&apos;ve Also Updated Our Terms
    </p>
    
    <div className={styles.testimonialsGrid}>
      <div className={styles.testimonialCard}>
       <p className={styles.testimonialText}>
  &quot;By Far The Best Experience I Have Had Despite My Original Concerns Thanks To The Great Help I Received From Xxxxx Company&quot;
</p>
        <div className={styles.testimonialAuthor}>
          <h4 className={styles.authorName}>Abdullah</h4>
        </div>
      </div>

      <div className={`${styles.testimonialCard} ${styles.center}`}>
        <p className={styles.testimonialText}>
  &quot;By Far The Best Experience I Have Had Despite My Original Concerns Thanks To The Great Help I Received From Xxxxx Company&quot;
</p>
        <div className={styles.testimonialAuthor}>
          <h4 className={styles.authorName}>Abdullah</h4>
        </div>
      </div>

      <div className={styles.testimonialCard}>
        <p className={styles.testimonialText}>
  &quot;By Far The Best Experience I Have Had Despite My Original Concerns Thanks To The Great Help I Received From Xxxxx Company&quot;
</p>
        <div className={styles.testimonialAuthor}>
          <h4 className={styles.authorName}>Abdullah</h4>
        </div>
      </div>
    </div>

    <button className={styles.contactButton}>CONTACT</button>
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