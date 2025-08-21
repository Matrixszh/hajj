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
Nusuk Hajj is the one-stop-shop platform overseen by the Ministry of Hajj and Umrah, offering pilgrims from serviced countries a variety of Hajj packages, provided by authorized service providers, ensuring a seamless Hajj experience.            </p>
            <Link href="/explore" className={styles.exploreButton}>
              CONTACT
            </Link>
            
            <Link href="/explore" className={styles.exploreButton2}>
              CONTACT
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