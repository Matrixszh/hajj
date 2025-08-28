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
              Pakistani Passport Hajj  </h1>
            <p className={styles.subtitle}>
              This exclusive package is tailored for Pakistani passport holders who wish to bypass the unpredictability of the Nusuk system. With this option, your Hajj visa is 100% guaranteed, and every aspect of your journey is arranged by our experienced team.
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