import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Container from "./Container";

const tags = [".Net Developer", "Engineer", "Fullstack Developer"];
const bulletPoints = [
  "Fullstack engineer focused on clean architecture, scalable systems, and production-critical solutions",
  "Turn complex ideas and business needs into reliable, production-ready software",
  "Take ownership from database design to polished user interfaces",
];
const AboutMe = () => {
  return (
    <section className="scroll-mt-20" id="home">
      <Container>
        <Card className="group grid grid-cols-2 gap-8 hover:bg-linear-to-bl from-secondary/40 to-transparent to-40% shadow-[0_10px_15px_rgba(61,213,152,0.5),-1px_-1px_5px_rgba(61,213,152,0.5)] shadow-accent hover:shadow-[0_20px_25px_rgba(0,0,0,0.1),0_10px_10px_rgba(0,0,0,0.04),-2px_-2px_10px_rgba(61,213,152,0.7)] transition-all duration-500">
          <div className="space-y-4 flex flex-col justify-around">
            <div className="flex mb-4">
              <div className="mr-4 w-24 h-24 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-accent shadow-[0_0_20px_var(--color-secondary)] group-hover:scale-105 transition-transform duration-500">
                <img
                  className=" object-cover object-center w-full h-full"
                  src="me.jpg"
                  alt="My pfp"
                />
              </div>
              <div>
                <p className="uppercase text-text-muted">Hi, Welcome!</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-shadow-[3px_3px_2px_var(--color-secondary)] group-hover:text-shadow-accent transition-all duration-500">
                  Mohammed <br />
                  Abdu
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 max-w-xs">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.15em] uppercase text-secondary w-fit"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2">
              <div className="flex items-center">
                <FontAwesomeIcon
                  className="mr-2 text-secondary"
                  size="lg"
                  icon={faLocationDot}
                />
                <a
                  className="text-[10px] sm:text-xs text-text-secondary font-bold uppercase tracking-widest hover:text-secondary transition-colors"
                  href="https://maps.app.goo.gl/9mveJsV7vL6cmto27"
                  target="_blank"
                >
                  Karlstad, Värmland
                </a>
              </div>
              <a
                href="#contact"
                className="py-2.5 rounded-lg bg-accent/20 border border-accent/20 text-[10px] font-bold tracking-[0.15em] uppercase text-secondary w-full text-center hover:cursor-pointer hover:bg-secondary/40 hover:-translate-y-0.5 transition-transform"
              >
                <FontAwesomeIcon
                  className="text-accent mr-2"
                  icon={faEnvelope}
                />
                Contact
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight font-sans transition-colors duration-500 group-hover:text-secondary group-hover:text-glow-cyan">
              About me
            </h3>
            <p className="text-text-secondary max-w-lg group-hover:text-gray-200 transition-colors duration-500 leading-loosetext-sm sm:text-base font-normal space-y-5 font-sans ">
              My passion for building on the web started long before modern
              frameworks and AI copilots, giving me a deep respect for clean
              fundamentals and thoughtful design. Today, I craft digital
              experiences and interfaces with a cup of coffee in one hand and
              curiosity in the other.
            </p>

            <div className="flex flex-wrap gap-2">
              {bulletPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="text-xs sm:text-sm text-text-secondary group-hover/item:text-primary transition-colors leading-relaxed font-medium font-sans"
                >
                  <FontAwesomeIcon
                    className="mr-2 text-secondary"
                    size="xs"
                    icon={faCircleCheck}
                  />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
};

export default AboutMe;
