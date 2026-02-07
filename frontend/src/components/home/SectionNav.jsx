import styles from "./SectionNav.module.css";
import { navLabels } from "../../data/homeCopy.js";

const SectionNav = ({ onNavClick, heroSectionRef, roomsSectionRef, gallerySectionRef }) => (
  <nav className={styles.sectionNav} aria-label="Secciones">
    <button
      type="button"
      className={styles.sectionNavButton}
      onClick={() => onNavClick(heroSectionRef)}
    >
      {navLabels.home}
    </button>
    <button
      type="button"
      className={styles.sectionNavButton}
      onClick={() => onNavClick(roomsSectionRef)}
    >
      {navLabels.rooms}
    </button>
    <button
      type="button"
      className={styles.sectionNavButton}
      onClick={() => onNavClick(gallerySectionRef)}
    >
      {navLabels.gallery}
    </button>
  </nav>
);

export default SectionNav;
