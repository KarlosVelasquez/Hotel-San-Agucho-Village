import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionNav from "../components/home/SectionNav.jsx";
import SocialButtons from "../components/home/SocialButtons.jsx";
import HeroSection from "../components/home/HeroSection.jsx";
import RoomsSection from "../components/home/RoomsSection.jsx";
import GallerySection from "../components/home/GallerySection.jsx";
import { galleryItems as galleryMedia, heroImage, rooms as roomsMedia } from "../data/homeData.js";
import { galleryItemsCopy, roomsItems } from "../data/homeCopy.js";
import styles from "./Home.module.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const rooms = roomsMedia.map((room) => {
  const copy = roomsItems.find((item) => item.id === room.id);
  return {
    ...room,
    ...copy,
  };
});

const galleryItems = galleryMedia.map((item) => {
  const copy = galleryItemsCopy.find((entry) => entry.id === item.id);
  return {
    ...item,
    ...copy,
  };
});

const Home = () => {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSectionRef = useRef(null);
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
      <SectionNav
        onNavClick={handleNavClick}
        heroSectionRef={heroSectionRef}
        roomsSectionRef={roomsSectionRef}
        gallerySectionRef={gallerySectionRef}
      />
      <SocialButtons />
      <HeroSection
        heroSectionRef={heroSectionRef}
        heroRef={heroRef}
        heroTitleRef={heroTitleRef}
        heroSubtitleRef={heroSubtitleRef}
        backgroundImage={heroImage}
      />
      <RoomsSection
        roomsSectionRef={roomsSectionRef}
        roomsScrollRef={roomsScrollRef}
        roomsRef={roomsRef}
        rooms={rooms}
      />
      <GallerySection
        gallerySectionRef={gallerySectionRef}
        activeGallery={activeGallery}
        galleryOrder={galleryOrder}
        setActiveGallery={setActiveGallery}
        setGalleryOrder={setGalleryOrder}
      />
    </main>
  );
};

export default Home;