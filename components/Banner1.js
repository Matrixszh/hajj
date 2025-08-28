import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Banner.module.css';

const Banner = () => {
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
              Full Service Hajj  </h1>
            <p className={styles.subtitle}>
              From visa processing to Ziarat tours, our full-service package takes care of every detail
              so you can fully dedicate yourself to the spiritual journey of a lifetime.
            </p>
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

export default Banner;