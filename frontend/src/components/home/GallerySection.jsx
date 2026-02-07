import styles from "./GallerySection.module.css";
import { galleryCopy } from "../../data/homeCopy.js";

const GallerySection = ({
  gallerySectionRef,
  activeGallery,
  galleryOrder,
  setActiveGallery,
  setGalleryOrder,
}) => (
  <section
    className={styles.gallery}
    aria-labelledby="gallery-title"
    ref={gallerySectionRef}
  >
    <div
      key={activeGallery.id}
      className={styles.galleryBackdrop}
      style={{ "--gallery-bg": `url(${activeGallery.image})` }}
    >
      <div className={styles.galleryInner}>
        <header className={styles.galleryHeader}>
          <h2 id="gallery-title" className={styles.galleryTitle}>
            {galleryCopy.title}
          </h2>
          <p className={styles.galleryDescription}>{galleryCopy.description}</p>
        </header>

        <div className={styles.galleryContent}>
          <div className={styles.galleryActive} aria-live="polite">
            <h3 className={styles.galleryActiveTitle}>{activeGallery.title}</h3>
            <p className={styles.galleryActiveText}>{activeGallery.description}</p>
          </div>

          <div className={styles.galleryGrid}>
            {galleryOrder.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.galleryItem} ${
                  item.id === activeGallery.id ? styles.galleryItemActive : ""
                }`}
                onClick={() => {
                  setActiveGallery(item);
                  setGalleryOrder((prev) => {
                    const next = prev.filter((entry) => entry.id !== item.id);
                    return [item, ...next];
                  });
                }}
                aria-pressed={item.id === activeGallery.id}
              >
                <span
                  className={styles.galleryThumb}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <span className={styles.galleryItemLabel}>{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GallerySection;
