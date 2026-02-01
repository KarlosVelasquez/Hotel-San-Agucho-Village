import PropTypes from "prop-types";
import styles from "./Rooms.module.css";

const Rooms = ({ rooms = [] }) => {
  return (
    <section className={styles.rooms} aria-labelledby="rooms-title">
      <header className={styles.header}>
        <h2 id="rooms-title" className={styles.title}>
          Habitaciones
        </h2>
        <p className={styles.subtitle}>
          Diseñadas para el descanso, pensadas para cada tipo de huésped.
        </p>
      </header>

      <div className={styles.grid}>
        {rooms.map((room) => (
          <article key={room.id} className={`${styles.card} room-card`}>
            <div className={styles.imageWrapper}>
              <img
                src={room.image}
                alt={room.title}
                className={styles.image}
                loading="lazy"
              />
            </div>
            <div className={styles.body}>
              <h3 className={styles.cardTitle}>{room.title}</h3>
              <p className={styles.cardText}>{room.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

Rooms.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

export default Rooms;
