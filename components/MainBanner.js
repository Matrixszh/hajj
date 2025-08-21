import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/MainBanner.module.css';

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
              Caravan <span className={styles.highlight}>72</span> 
            </h1>
            <p className={styles.subtitle}>
              Trusted Hajj And Umrah Services Since 2005
            </p>
            <Link href="/contact" className={styles.exploreButton}>
              CONTACT
            </Link>
          </div>
          
          <div className={styles.imageContainer}>
            <Image
              src="/banner/banner2.png"
              alt="Kaaba"
              width={300}
              height={380}
              className={styles.bannerImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;