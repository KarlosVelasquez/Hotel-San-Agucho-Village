import styles from "./SocialButtons.module.css";
import { socialLinks } from "../../data/homeCopy.js";

const SocialButtons = () => (
  <div className={styles.socialButtons} aria-label="Redes sociales">
    {socialLinks.map((link) => (
      <a
        key={link.id}
        className={styles.socialButton}
        href={link.href}
        target="_blank"
        rel="noreferrer"
      >
        {link.label}
      </a>
    ))}
  </div>
);

export default SocialButtons;
