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
              Your Trusted Hajj Partner  </h1>
            <p className={styles.subtitle}>
              The most experienced Western group on the new Nusuk platform, having successfully organized and led Hajj groups since its introduction in 2022. From visas and flights to accommodations, transportation, and on-the-ground support, we take care of every detail—so you don’t have to.
            </p>
            <Link href="/contact" className={styles.exploreButton}>
              CONTACT
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