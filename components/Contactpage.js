'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/LandingPage.module.css';

const ContactPage = () => {
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

    return (
        <div className={styles.landingPage}>


            {/* Second Section - What Do We Offer */}
            <section className={styles.offerSection}>
                <div className={styles.offerBackground}></div>
                <div className={styles.offerOverlay}></div>
                <div className={styles.container}>
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
                                    src="/p1.jpg"
                                    alt={tabContent[activeTab].title}
                                    width={300}
                                    height={200}
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
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Why Are We Different ?</h2>
                    <p className={styles.sectionSubtitle}>
                        The Growing List Of Products, Features, And Services Available To You As A
                        Figma User. We&rsquo;ve Also Updated Our Terms.
                    </p>

                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                {/* 
                Replace with your feather/lightning icon:
                <Image
                  src="/lightning-icon.svg"
                  alt="Fast"
                  width={40}
                  height={40}
                />
                */}
                                <div className={styles.iconPlaceholder}>⚡</div>
                            </div>
                            <h4 className={styles.featureTitle}>Fast</h4>
                            <p className={styles.featureText}>
                                Fast becoming the the number one
                                choice of businesses across the world.
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Ut elit tellus, luctus
                                nec ullamcorper mattis, pulvinar
                                dapibus leo. Lorem Ut elit tellus, luctus
                                nec ullamcorper mattis, pulvinar dapibus.
                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureImageContainer}>

                                <Image
                                    src="/cardbg2.jpg"
                                    alt="Feature"
                                    width={200}
                                    height={300}
                                    className={styles.centerImage}
                                />


                            </div>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                {/* 
                Replace with your feather/lightning icon:
                <Image
                  src="/lightning-icon.svg"
                  alt="Flexible"
                  width={40}
                  height={40}
                />
                */}
                                <div className={styles.iconPlaceholder}>⚡</div>
                            </div>
                            <h4 className={styles.featureTitle}>Flexible</h4>
                            <p className={styles.featureText}>
                                Fast becoming the the number one
                                choice of businesses across the world.
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Ut elit tellus, luctus
                                nec ullamcorper mattis, pulvinar
                                dapibus leo. Lorem Ut elit tellus, luctus
                                nec ullamcorper mattis, pulvinar dapibus.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fourth Section - Our Gallery Of Trust */}
            <section className={styles.gallerySection}>
                {/* Background Image */}
                <div className={styles.galleryBackground}></div>

                {/* Color Overlay */}
                <div className={styles.galleryOverlay}></div>

                {/* Main Content */}
                <div className={styles.container}>
                    <h2 className={styles.gallerySectionTitle}>Our Gallery Of Trust</h2>
                    <p className={styles.gallerySectionSubtitle}>
                        The Growing List Of Products, Features, And Services Available To You As A
                        Figma User. We&rsquo;ve Also Updated Our Terms.
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


            {/* Fifth Section - Your Application Made Easy */}
            <section className={styles.applicationSection}>
                <div className={styles.container}>
                    <h2 className={styles.applicationTitle}>Your Application Made Easy !</h2>
                    <p className={styles.applicationSubtitle}>
                        The Growing List Of Products, Features, And Services Available To You As A
                        Figma User. We&rsquo;ve Also Updated Our Terms.
                    </p>

                    <div className={styles.stepsWrapper}>
                        {[
                            { icon: "/feather.svg", title: "Ease" },
                            { icon: "/form.svg", title: "Fill In Form" },
                            { icon: "/plus-icon.svg", title: "Application Added" },
                            { icon: "/check-icon.svg", title: "Approved" }
                        ].map((step, idx) => (
                            <div key={idx} className={styles.stepBlock}>
                                <div className={styles.stepCard}>
                                    <span className={styles.stepNumber}>{idx + 1}</span>
                                    <Image
                                        src={step.icon}
                                        alt={step.title}
                                        width={30}
                                        height={30}
                                    />
                                    <p className={styles.stepLabel}>{step.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Connector Line */}
                    <div className={styles.connectorLine}>
                        {[1, 2, 3, 4].map((_, idx) => (
                            <div key={idx} className={styles.connectorDot}></div>
                        ))}
                    </div>

                    <div className={styles.applicationContactContainer}>
                        <Link href="/contact" className={styles.applicationContactButton}>
                            CONTACT
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sixth Section - Quote */}
            <section className={styles.quoteSection}>
                <div className={styles.container}>
                    <blockquote className={styles.quote}>
                        <p className={styles.quoteText}>
  &ldquo; And Whoever Puts His Trust In <span className={styles.allah}>Allah</span><br />
  He Will Be <span className={styles.enough}>Enough</span> For Him &rdquo;
</p>
                        <cite className={styles.quoteCitation}>
                            <span className={styles.quranText}>Quran</span> 16:5
                        </cite>
                    </blockquote>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.container}>
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

export default ContactPage;