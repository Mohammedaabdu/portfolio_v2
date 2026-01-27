import Container from "./Container";
const Header = () => {
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
    <header className="fixed top-0 right-0 left-0 z-50 backdrop-blur-md">
      <Container>
        <div className="border border-border rounded-full flex justify-between p-2 w-4xl mx-auto items-center">
          <img
            src="logo_svg.svg"
            alt="logo"
            className="w-30 h-auto object-contain"
          />

          <nav className="md:flex">
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
            className="inline-flex items-center justify-center rounded-full py-2 px-4 text-text-primary font-medium bg-secondary hover:shadow-[0_0_20px_var(--color-secondary)] hover:-translate-y-0.5"
          >
            Let's Talk
          </a>
        </div>
      </Container>
    </header>
  );
};

export default Header;
