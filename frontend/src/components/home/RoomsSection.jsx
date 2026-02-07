import styles from "./RoomsSection.module.css";
import { roomsCopy } from "../../data/homeCopy.js";

const RoomsSection = ({ roomsSectionRef, roomsScrollRef, roomsRef, rooms }) => (
  <section className={styles.rooms} aria-labelledby="rooms-title" ref={roomsSectionRef}>
    <div className={styles.roomsScroller} ref={roomsScrollRef}>
      <div className={styles.roomsInner} ref={roomsRef}>
        <header className={styles.roomsHeader}>
          <h2 id="rooms-title" className={styles.roomsTitle}>
            {roomsCopy.title}
          </h2>
          <p className={styles.roomsDescription}>{roomsCopy.description}</p>
        </header>

        <div className={styles.roomsGrid}>
          {rooms.map((room) => (
            <article key={room.id} className={`${styles.roomCard} room-card`}>
              <div className={styles.roomImageWrapper}>
                <img
                  src={room.image}
                  alt={room.title}
                  className={`${styles.roomImage} room-parallax`}
                  loading="lazy"
                />
              </div>
              <div className={styles.roomOverlay}>
                <div className={styles.roomOverlayContent}>
                  <h3 className={styles.roomOverlayTitle}>{room.title}</h3>
                  <p className={styles.roomOverlayText}>{room.description}</p>
                  <div className={styles.roomOverlayActions}>
                    <button className={styles.roomOverlayButton} type="button">
                      {roomsCopy.actions.details}
                    </button>
                    <button
                      className={`${styles.roomOverlayButton} ${styles.roomOverlayButtonSecondary}`}
                      type="button"
                    >
                      {roomsCopy.actions.book}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default RoomsSection;
