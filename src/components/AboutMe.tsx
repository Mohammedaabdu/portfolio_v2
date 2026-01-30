import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faEnvelope,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Container from "./Container";
import { useState } from "react";

const tags = [".Net Developer", "Engineer", "Fullstack Developer"];
const bulletPoints = [
  "Fullstack engineer focused on clean architecture, scalable systems, and production-critical solutions",
  "Turn complex ideas and business needs into reliable, production-ready software",
  "Take ownership from database design to polished user interfaces",
];
const AboutMe = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="scroll-mt-20" id="home">
      <Container>
        <Card className="group grid gap-4 md:grid-cols-2 md:gap-8 hover:bg-linear-to-bl from-secondary/40 to-transparent to-40% shadow-[0_10px_15px_rgba(61,213,152,0.5),-1px_-1px_5px_rgba(61,213,152,0.5)] shadow-accent hover:shadow-[0_20px_25px_rgba(0,0,0,0.1),0_10px_10px_rgba(0,0,0,0.04),-2px_-2px_10px_rgba(61,213,152,0.7)] transition-all duration-500">
          <div className="gap-6 sm:space-y-4 flex flex-col md:justify-between sm:gap-0 ">
            <div className="flex justify-start md:mb-4 ">
              <div className="mr-4 size-24 rounded-full overflow-hidden border-2 border-accent shadow-[0_0_20px_var(--color-secondary)] group-hover:scale-105 transition-transform duration-500">
                <img
                  className=" object-cover object-center w-full h-full"
                  src="me.jpg"
                  alt="My pfp"
                />
              </div>
              <div>
                <p className=" uppercase text-text-muted">Hi, Welcome!</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-shadow-[3px_3px_2px_var(--color-secondary)] group-hover:text-shadow-accent transition-all duration-500">
                  Mohammed <br />
                  Abdu
                </h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:max-w-xs">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.15em] uppercase text-secondary w-fit"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between ">
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
              <div className="flex flex-col gap-2 w-full min-[450px]:w-3xs sm:min-w-4xs">
                <a
                  href="https://www.linkedin.com/in/mohammed-abdu-9809041a2/"
                  target="_blank"
                  className="px-1.5 py-2.5 text-xs rounded-lg 
bg-[#0A1B2E] 
border border-[#38BDF8]/40 font-bold tracking-[0.15em] uppercase 
text-[#38BDF8] 
w-full text-center 
transition-all duration-200
hover:bg-[#102A44]"
                >
                  <FontAwesomeIcon
                    className="text-[#38BDF8] mr-2"
                    icon={faLinkedinIn}
                  />
                  Linkedin
                </a>
                <a
                  href="#contact"
                  className="py-2.5 rounded-lg text-xs bg-accent/20 border border-accent/20  font-bold tracking-[0.15em] uppercase text-secondary w-full text-center hover:cursor-pointer hover:bg-secondary/40"
                >
                  <FontAwesomeIcon
                    className="text-accent mr-2"
                    icon={faEnvelope}
                  />
                  Contact
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight font-sans transition-colors duration-500 group-hover:text-secondary group-hover:text-glow-cyan">
              About me
            </h3>
            <div
              className={`overflow-hidden transition-all  duration-500 space-y-4 ${
                isExpanded ? "max-h-250" : "max-h-24 sm:max-h-none"
              }`}
            >
              <p className="text-text-secondary lg:max-w-lg group-hover:text-gray-200 transition-colors duration-500 leading-loose text-sm sm:text-base font-normal font-sans ">
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

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="sm:hidden text-xs font-semibold text-secondary hover:text-accent transition-colors uppercase tracking-wide"
            >
              {isExpanded ? (
                <p>
                  Less <FontAwesomeIcon icon={faChevronUp} />
                </p>
              ) : (
                <p>
                  More <FontAwesomeIcon icon={faChevronDown} />
                </p>
              )}
            </button>
          </div>
        </Card>
      </Container>
    </section>
  );
};

export default AboutMe;
