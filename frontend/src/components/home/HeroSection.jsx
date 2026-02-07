import styles from "./HeroSection.module.css";
import { heroCopy } from "../../data/homeCopy.js";

const HeroSection = ({ heroSectionRef, heroRef, heroTitleRef, heroSubtitleRef, backgroundImage }) => (
  <section
    className={styles.hero}
    aria-labelledby="hotel-title"
    style={{ "--hero-bg": `url(${backgroundImage})` }}
    ref={heroSectionRef}
  >
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
