import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import homeimage from "../assets/images/home.webp";
import room1Image from "../assets/images/room1.webp";
import room2Image from "../assets/images/room2.webp";
import room3Image from "../assets/images/room3.webp";
import room4Image from "../assets/images/room4.webp";
import room5Image from "../assets/images/comedorexterior.webp";
import room6Image from "../assets/images/piscina.webp";
import room7Image from "../assets/images/spa.webp";
import room8Image from "../assets/images/ambiente.webp";
import styles from "./Home.module.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const rooms = [
  {
    id: 1,
    title: "Habitación Deluxe",
    description: "Amplia, luminosa y con vista panorámica.",
    image: room1Image,
  },
  {
    id: 2,
    title: "Suite Ejecutiva",
    description: "Espacio premium con área de trabajo y confort total.",
    image: room2Image,
  },
  {
    id: 3,
    title: "Habitación Familiar",
    description: "Ideal para familias, cómoda y funcional.",
    image: room3Image,
  },
  {
    id: 4,
    title: "Estándar",
    description: "Minimalista, eficiente y acogedora.",
    image: room4Image,
  },
];

const galleryItems = [
  {
    id: 1,
    title: "Lobby principal",
    description: "Bienvenida elegante con iluminación cálida.",
    image: homeimage,
  },
  {
    id: 2,
    title: "Piscina exterior",
    description: "Relajación total con vista a los jardines.",
    image: room6Image,
  },
  {
    id: 3,
    title: "Restaurante",
    description: "Sabores locales con un toque contemporáneo.",
    image: room5Image,
  },
  {
    id: 4,
    title: "Spa & bienestar",
    description: "Momentos de calma y descanso.",
    image: room7Image,
  },
  {
    id: 5,
    title: "Terraza lounge",
    description: "Atardeceres con ambiente relajado.",
    image: room8Image,
  },
];

const Home = () => {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSectionRef = useRef(null);
  const navRef = useRef(null);
  const roomsRef = useRef(null);
  const roomsScrollRef = useRef(null);
  const roomsSectionRef = useRef(null);
  const gallerySectionRef = useRef(null);
  const roomsEdgeIntentRef = useRef(0);
  const isSnappingRef = useRef(false);
  const [galleryOrder, setGalleryOrder] = useState(galleryItems);
  const [activeGallery, setActiveGallery] = useState(galleryItems[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero: entrada inicial con fade + zoom suave.
      gsap.fromTo(
        heroTitleRef.current,
        { autoAlpha: 0, scale: 0.92 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
        }
      );

      // Hero: subtítulo acompaña con un desplazamiento mínimo.
      gsap.fromTo(
        heroRef.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Hero: texto con “peso” al primer scroll (se tarda más en desaparecer).
      const createHeroScrollTrigger = () => ({
        trigger: heroRef.current,
        scroller: mainRef.current,
        start: "top top",
        end: () => `+=${heroRef.current?.offsetHeight || 0}`,
        scrub: 2.8,
        invalidateOnRefresh: true,
      });

      const getDropDistance = (element, offset = 24) => {
        const heroHeight = heroRef.current?.offsetHeight || 0;
        const elementHeight = element?.offsetHeight || 0;
        return Math.max(0, heroHeight - elementHeight - offset);
      };

      gsap.fromTo(
        heroTitleRef.current,
        { y: 0, autoAlpha: 1 },
        {
          y: () => getDropDistance(heroTitleRef.current, 24),
          autoAlpha: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: createHeroScrollTrigger(),
        }
      );

      gsap.fromTo(
        heroSubtitleRef.current,
        { y: 0, autoAlpha: 1 },
        {
          y: () => getDropDistance(heroSubtitleRef.current, 48),
          autoAlpha: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: createHeroScrollTrigger(),
        }
      );

      // Rooms: cards aparecen al entrar en viewport con stagger.
      gsap.fromTo(
        ".room-card",
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: roomsRef.current,
            scroller: mainRef.current,
            start: "top 70%",
          },
        }
      );

      // Rooms: parallax en imágenes.
      gsap.utils.toArray(".room-parallax").forEach((image) => {
        const card = image.closest(".room-card");
        if (!card) return;

        gsap.fromTo(
          image,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              scroller: mainRef.current,
              start: "top 85%",
              end: "bottom 15%",
              scrub: true,
            },
          }
        );
      });

      // Snap controlado por evento de scroll (wheel) para transición suave.
      const scroller = mainRef.current;
      const sections = Array.from(scroller.querySelectorAll("section"));

      const scrollToSection = (index) => {
        if (index < 0 || index >= sections.length) return;
        isSnappingRef.current = true;
        gsap.to(scroller, {
          scrollTo: { y: sections[index], autoKill: false },
          duration: 3,
          ease: "power2.inOut",
          onComplete: () => {
            isSnappingRef.current = false;
          },
        });
      };

      const handleWheel = (event) => {
        const roomsScroller = roomsScrollRef.current;
        if (roomsScroller && roomsScroller.contains(event.target)) {
          const canScrollDown =
            roomsScroller.scrollTop + roomsScroller.clientHeight <
            roomsScroller.scrollHeight - 2;
          const canScrollUp = roomsScroller.scrollTop > 2;
          const direction = Math.sign(event.deltaY);

          if ((direction > 0 && canScrollDown) || (direction < 0 && canScrollUp)) {
            roomsEdgeIntentRef.current = 0;
            return;
          }

          if (roomsEdgeIntentRef.current === direction) {
            roomsEdgeIntentRef.current = 0;
          } else {
            roomsEdgeIntentRef.current = direction;
            event.preventDefault();
            return;
          }
        }

        if (isSnappingRef.current) {
          event.preventDefault();
          return;
        }

        const direction = Math.sign(event.deltaY);
        if (direction === 0) return;

        const currentIndex = sections.reduce((acc, section, index) => {
          const sectionTop = section.offsetTop;
          return scroller.scrollTop >= sectionTop - 4 ? index : acc;
        }, 0);

        const targetIndex = direction > 0 ? currentIndex + 1 : currentIndex - 1;
        if (targetIndex < 0 || targetIndex >= sections.length) return;

        event.preventDefault();
        scrollToSection(targetIndex);
      };

      scroller.addEventListener("wheel", handleWheel, { passive: false });

      ScrollTrigger.addEventListener("refresh", () => ScrollTrigger.update());
      ScrollTrigger.refresh();

      return () => {
        scroller.removeEventListener("wheel", handleWheel);
      };
    });

    return () => ctx.revert();
  }, []);

  const handleNavClick = (targetRef) => {
    if (!targetRef?.current || !mainRef.current) return;
    gsap.to(mainRef.current, {
      scrollTo: { y: targetRef.current, autoKill: false },
      duration: 1.4,
      ease: "power2.inOut",
    });
  };

  return (
    <main className={styles.home} ref={mainRef}>
      <nav ref={navRef} className={styles.sectionNav} aria-label="Secciones">
        <button
          type="button"
          className={styles.sectionNavButton}
          onClick={() => handleNavClick(heroSectionRef)}
        >
          Inicio
        </button>
        <button
          type="button"
          className={styles.sectionNavButton}
          onClick={() => handleNavClick(roomsSectionRef)}
        >
          Habitaciones
        </button>
        <button
          type="button"
          className={styles.sectionNavButton}
          onClick={() => handleNavClick(gallerySectionRef)}
        >
          Espacios del hotel
        </button>
      </nav>

      <div className={styles.socialButtons} aria-label="Redes sociales">
        <a
          className={styles.socialButton}
          href=""
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
        <a
          className={styles.socialButton}
          href=""
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      </div>
      <section
        className={styles.hero}
        aria-labelledby="hotel-title"
        style={{ "--hero-bg": `url(${homeimage})` }}
        ref={heroSectionRef}
      >
        <div className={styles.heroSplitOverlay} aria-hidden="true" />
        <div ref={heroRef} className={styles.heroContent}>

          <h1
            id="hotel-title"
            className={styles.title}
            ref={heroTitleRef}
          >
            Hotel 
          </h1>
          <h2 id="hotel-subtitle" className={styles.subtitle} ref={heroSubtitleRef}> 
            SAN AGUCHO VILLAGE
          </h2>
        </div>
      </section>

      <section
        className={styles.rooms}
        aria-labelledby="rooms-title"
        ref={roomsSectionRef}
      >
        <div className={styles.roomsScroller} ref={roomsScrollRef}>
          <div className={styles.roomsInner} ref={roomsRef}>
          <header className={styles.roomsHeader}>
            <h2 id="rooms-title" className={styles.roomsTitle}>
              Habitaciones
            </h2>
            <p className={styles.roomsDescription}>
              Diseñadas para el descanso, pensadas para cada tipo de huésped.
            </p>
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
                        Ver detalles
                      </button>
                      <button
                        className={`${styles.roomOverlayButton} ${styles.roomOverlayButtonSecondary}`}
                        type="button"
                      >
                        Reservar
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
                Espacios del hotel
              </h2>
              <p className={styles.galleryDescription}>
                Haz clic en cada imagen para verla en grande como fondo.
              </p>
            </header>

            <div className={styles.galleryContent}>
              <div className={styles.galleryActive}
                aria-live="polite"
              >
                <h3 className={styles.galleryActiveTitle}>{activeGallery.title}</h3>
                <p className={styles.galleryActiveText}>{activeGallery.description}</p>
              </div>

              <div className={styles.galleryGrid}>
                {galleryOrder.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.galleryItem} ${item.id === activeGallery.id ? styles.galleryItemActive : ""}`}
                    onClick={() => {
                      setActiveGallery(item);
                      setGalleryOrder((prev) => {
                        const next = prev.filter((entry) => entry.id !== item.id);
                        return [item, ...next];
                      });
                    }}
                    aria-pressed={item.id === activeGallery.id}
                  >
                    <span className={styles.galleryThumb} style={{ backgroundImage: `url(${item.image})` }} />
                    <span className={styles.galleryItemLabel}>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;