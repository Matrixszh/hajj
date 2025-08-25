import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Umrah.module.css';

const UmrahBanner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.backgroundImage}>
        {/* Background image will be set via CSS */}
      </div>

      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              A Opportunity To Refresh Your Faith And Cleanse Your Soul
            </h1>
            <p className={styles.subtitle}>
              Embark on a spiritual journey of a lifetime with our carefully curated Umrah package, designed to provide a seamless and fulfilling pilgrimage experience. With expert guidance, comfortable accommodations, and dedicated support throughout your journey, let us help you focus on what truly matters—your devotion and worship. Begin your sacred Umrah journey with us today.            </p>
            <Link href="/contact" className={styles.exploreButton}>
              REGISTER
            </Link>

            <Link href="/" className={styles.exploreButton2}>
              EXPLORE
            </Link>
          </div>

          <div className={styles.imageContainer}>
            <div className={styles.imageFrame}>
              <div className={styles.imageInner}>
                <Image
                  src="/banner/hajj-temp.jpg"
                  alt="Kaaba"
                  width={300}
                  height={380}
                  className={styles.bannerImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UmrahBanner;