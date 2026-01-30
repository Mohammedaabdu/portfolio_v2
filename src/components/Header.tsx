import { useState, useEffect } from "react";
import Container from "./Container";
import { motion, type Variants } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
const navVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.2,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navigationLinks = [
    {
      title: "Home",
      ref: "#home",
    },
    {
      title: "Expirence",
      ref: "#expirence",
    },
    {
      title: "Projects",
      ref: "#projects",
    },
    {
      title: "AI Chat",
      ref: "#AI",
    },
  ];
  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <Container>
        <div
          className={`
            border border-border rounded-full 
            flex justify-between p-2 max-w-4xl mx-auto items-center
            transition-all duration-300
            ${scrolled ? "bg-dark shadow-xl shadow-black/20" : ""}
          `}
        >
          <img
            src="logo_svg.svg"
            alt="logo"
            className="w-30 h-auto object-contain"
          />
          <div className="md:hidden mr-2">
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => setIsOpen(true)}
              className="text-secondary"
            />
          </div>
          {/* Mobile Nav */}
          {isOpen && (
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40"
            ></div>
          )}
          <motion.nav
            variants={navVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            className="md:hidden fixed w-[80vw] z-41 h-screen max-w-sm right-0 top-0 p-6 bg-neutral-900 overflow-y-auto"
          >
            <span
              className="absolute w-px h-full bg-linear-to-b 
    from-transparent via-secondary to-transparent 
    shadow-[0_0_12px_var(--color-secondary)]  left-0 top-0"
            ></span>
            <div className="flex justify-end md:hidden">
              <FontAwesomeIcon
                icon={faX}
                onClick={() => setIsOpen(false)}
                className="mb-8 text-secondary"
              />
            </div>
            <div className="flex flex-col space-y-8 text-2x w-full">
              {navigationLinks.map((nav, idx) => (
                <a
                  key={idx}
                  href={nav.ref}
                  onClick={() => setIsOpen(false)}
                  className="rounded-full px-4 text-center font-medium text-secondary hover:text-accent hover:bg-neutral-600/30 duration-300 transition"
                >
                  {nav.title}
                </a>
              ))}

              <a
                onClick={() => setIsOpen(false)}
                href="#contact"
                className="inline-flex items-center justify-center rounded-full py-2 px-4 text-text-primary font-medium bg-secondary hover:shadow-[0_0_20px_var(--color-secondary)] hover:-translate-y-0.5"
              >
                Let's Talk
              </a>
            </div>
          </motion.nav>
          <nav className="hidden md:flex">
            <div className="space-x-12 font-sans">
              {navigationLinks.map((nav, idx) => (
                <a
                  key={idx}
                  href={nav.ref}
                  className="inline-block group text-text-secondary hover:text-text-primary relative group-delay-200 group-transition-transform"
                >
                  <span className="absolute w-[140%] opacity-0 left-1/2 -translate-x-1/2 -bottom-3 top-0 bg-linear-to-t from-accent/30 to-transparent to-85% blur-xs z-1 transition-opacity duration-300 ease-out group-hover:opacity-100" />
                  {nav.title}
                  <span className="absolute w-0 h-0.5 -bottom-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-accent to-transparent transition-all duration-300 ease-out group-hover:w-[140%]" />
                </a>
              ))}
            </div>
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center justify-center rounded-full py-2 px-4 text-text-primary font-medium bg-secondary hover:shadow-[0_0_20px_var(--color-secondary)] hover:-translate-y-0.5"
          >
            Let's Talk
          </a>
        </div>
      </Container>
    </header>
  );
};

export default Header;
