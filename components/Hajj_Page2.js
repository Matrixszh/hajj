'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/LandingPage1.module.css';
import Link from 'next/link';

const HajjPackage = () => {
    const [spotsLeft, setSpotsLeft] = useState(80);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        // Simulate decreasing spots for urgency

    }, []);

    const features = [
        { icon: "✈️", title: "Flights from All Major U.S. Cities", desc: "Customizable travel routes" },
        { icon: "🏨", title: "Elite Hotels", desc: "Near Haram in both Makkah and Madinah" },
        { icon: "🚄", title: "Haramain High-Speed Train", desc: "From Madinah to Makkah" },
        { icon: "📋", title: "Guaranteed Visa", desc: "No reliance on the Nusuk platform" },
        { icon: "👥", title: "Private Group", desc: "Not combined with Pakistan-based pilgrims" },
        { icon: "🧭", title: "Complete Ground Support", desc: "Full logistical and spiritual assistance" }
    ];

    const spiritualServices = [
        "Full Shia-compliant religious guidance",
        "Coordinated travel assistance",
        "On-the-ground support throughout Hajj",
        "Expert team guidance from landing to farewell tawaf",
        "Focus on ibadah while we handle logistics"
    ];

    const inclusions = [
        { icon: "✅", text: "Guaranteed Visa – No Nusuk uncertainty" },
        { icon: "✈️", text: "Flights from all major U.S. cities" },
        { icon: "🏨", text: "Elite hotels near Haram in Makkah & Madinah" },
        { icon: "🚄", text: "Haramain High-Speed Train transportation" },
        { icon: "🧭", text: "Complete ground support & assistance" },
        { icon: "👥", text: "Private group - not combined with Pakistan pilgrims" },
        { icon: "📅", text: "Flexible dates - customize your schedule" },
        { icon: "🕌", text: "Full Shia-compliant spiritual guidance" },
        { icon: "🎯", text: "Zero uncertainty - everything arranged" }
    ];

    const handleBookingClick = () => {
        console.log('Booking clicked');
    };

    const handleContactClick = () => {
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
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <div className={styles.heroTitle}>
                            <span className={styles.titleIcon}>🕋</span>
                            <h1>Guaranteed Visa Hajj Package</h1>
                        </div>
                        <p className={styles.heroSubtitle}>
                            Pakistani Passport Holders – 2026
                        </p>

                        <div className={styles.detailsCard}>
                            <div className={styles.detailsGrid}>
                                <div className={styles.detailItem}>
                                    <div className={styles.detailIcon}>📅</div>
                                    <h3>May 17 – May 31</h3>
                                    <p>Customizable dates</p>
                                    <p className={styles.priceNote}>Flexible scheduling available</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <div className={styles.detailIcon}>💰</div>
                                    <div className={styles.price}>$12,900</div>
                                    <p className={styles.priceNote}>All-inclusive package</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <div className={styles.detailIcon}>👥</div>
                                    <div className={styles.spotsCounter}>{spotsLeft}</div>
                                    <p>spots remaining</p>
                                    <p className={styles.priceNote}>Limited to 80 pilgrims</p>
                                </div>
                            </div>
                            <button className={styles.ctaButton} onClick={handleContactClick}>
                                Get More Information
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featuresSection}>
                <div className={styles.container}>
                    <h2 className={`${styles.sectionTitle} ${styles.teal}`}>🧭 Package Highlights</h2>
                    <p style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '28px', color: '#666' }}>
                        ✨ Guaranteed Visa. Premium Service. Zero Uncertainty.
                    </p>
                    <p style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '24px', color: '#666', lineHeight: '1.6' }}>
                        This exclusive package is tailored for Pakistani passport holders who wish to bypass the unpredictability of the Nusuk system.
                        With this option, your Hajj visa is 100% guaranteed, and every aspect of your journey is arranged by our experienced team.You will not be grouped with pilgrims traveling from Pakistan—you will fly from the U.S., stay in elite accommodations,
                        and experience the highest level of service throughout your pilgrimage.
                    </p>

                    <div className={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <span className={styles.featureIcon}>{feature.icon}</span>
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Spiritual Guidance Section */}
            <section className={styles.spiritualSection}>
                <div className={styles.container}>
                    <div className={styles.spiritualGrid}>
                        <div className={styles.spiritualContent}>
                            <h2 className={styles.sectionTitle}>🕌 Spiritual Guidance & Support</h2>
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
                            <div className={styles.guidanceIcon}>🧭</div>
                            <h3>Expert Team Support</h3>
                            <p>
                                Our expert team will ensure you receive full Shia-compliant religious guidance,
                                coordinated travel, and on-the-ground assistance throughout the days of Hajj.
                            </p>
                            <br />
                            <p>
                                From the moment you land until your farewell tawaf, your focus will be on your ibadah—we&apos;ll handle the rest.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inclusions Section */}
            <section className={styles.inclusionsSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>What&apos;s Included</h2>
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
                    <h2 className={`${styles.sectionTitle} ${styles.gradientText}`}>
                        Reserve Your Spot Now
                    </h2>
                    <p className={styles.ctaDescription}>
                        For those with a Pakistani passport seeking a seamless, guaranteed-entry Hajj,
                        this is the most direct and reliable path.
                    </p>

                    <div className={styles.urgencyCard}>
                        <div className={styles.urgencyIndicator}>
                            <div className={styles.pulseDot}></div>
                            <span>Limited Availability</span>
                        </div>
                        <div className={styles.spotsRemaining}>{spotsLeft} spots remaining</div>
                        <p>Only 80 pilgrims will be accepted for this exclusive package</p>
                        <Link href="/contact">
                            <button className={styles.finalCtaButton} onClick={handleBookingClick}>
                                Reserve Your Spot Now
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <p>
                        Don&apos;t miss this opportunity for a blessed and worry-free Hajj journey.
                        Contact us today to secure your spot.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HajjPackage;