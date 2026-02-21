import styles from "./HeroSection.module.css";
import { heroCopy } from "../../data/homeCopy.js";

const HeroSection = ({ heroSectionRef, heroRef, heroTitleRef, heroSubtitleRef }) => (
  <section
    className={styles.hero}
    aria-labelledby="hotel-title"
    ref={heroSectionRef}
  >
    {/* Imagen responsive para performance móvil */}
    <img
      src="/assets/images/hero-800.webp"
      srcSet="/assets/images/hero-400.webp 400w, /assets/images/hero-800.webp 800w"
      sizes="(max-width: 768px) 100vw, 800px"
      alt="Hotel San Agucho Hero"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
    <div className={styles.heroSplitOverlay} aria-hidden="true" />
    <div ref={heroRef} className={styles.heroContent}>
      <h1 id="hotel-title" className={styles.title} ref={heroTitleRef}>
        {heroCopy.title}
      </h1>
      <h2 id="hotel-subtitle" className={styles.subtitle} ref={heroSubtitleRef}>
        {heroCopy.subtitle}
      </h2>
    </div>
  </section>
);

export default HeroSection;
