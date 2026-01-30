import afry from "../assets/AFRY.png";
import cgi from "../assets/CGI.png";
import kau from "../assets/KAU.jpg";
import { motion } from "motion/react";
import Container from "./Container";
import Card from "./Card";
import { useEffect, useRef, useState, type JSX } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface IExpirence {
  role: string;
  company: string;
  description: string[];
  date: string;
  logo: string;
}
const expirences: IExpirence[] = [
  {
    role: "Fullstack Developer",
    company: "AFRY",
    description: [
      "Contributed to the development of AFRY Pulse, a production monitoring system that enhances productivity and efficiency by visualizing production processes and measuring overall equipment effectiveness (OEE).",
      "Implemented services using clean architecture principles and worked with technologies such as C#, Entity Framework and SQL queries.",
      "Enhanced the front-end UI/UX using HTML, TypeScript, CSS, Aurelia frontend-framework and libraries such as Kendo UI and jQuery.",
      "Collaborated with architects as needed and managed all development responsibilities as the sole programmer.",
    ],
    date: "Jan 2024 – Feb 2025",
    logo: afry,
  },
  {
    role: "Fullstack Developer",
    company: "CGI",
    description: [
      "Contributed to the development of Heroma, an HR- and payroll management system, by integrating the system from WPF to web",
      "Handled technologies such as C#, HTML, TypeScript, CSS, SQL, DB2, DevExtreme, and jQuery.",
      "As the sole developer in Sweden, I handled critical bugs locally due to GDPR restrictions on the team in India. Worked in two-week sprints for task planning.",
      "Enhanced system and query performance.",
      "Collaborated with customer support, architects,and UI/UX teams",
    ],
    date: "Jun 2022 – Dec 2023",
    logo: cgi,
  },
  {
    role: "Master of Science in Computer Engineering",
    company: "Karlstad University",
    description: [
      "Studies in programming (Java, C, C#, Python), Linux, data structures, algorithms, data communication, and data security.",
    ],
    date: "Aug 2017 – Jun 2022",
    logo: kau,
  },
];

const Expirence = () => {
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  const [showExpandButton, setShowExpandButton] = useState<{
    [key: number]: boolean;
  }>({});
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleExpand = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const measure = () => {
      const result: { [key: number]: boolean } = {};

      contentRefs.current.forEach((el, idx) => {
        if (el) {
          result[idx] = el.clientHeight > 360;
        }
      });

      setShowExpandButton(result);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <motion.section
      id="expirence"
      className="scroll-mt-20"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ margin: "0px 0px -200px 0px" }}
    >
      <Container>
        <h2 className="mb-8 text-center md:text-start bg-linear-to-r from-secondary to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent">
          Cv Timeline
        </h2>
        <div className="relative max-w-4xl mt-20 mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 h-full w-1 bg-linear-to-b from-teal-600 via-teal-400 to-violet-500 md:-translate-x-1/2 md:left-1/2" />

          {expirences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            const isExpanded = expandedCards[idx] || false;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex last:mb-0  mb-20 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row `}
              >
                {/* Dot */}
                <div className="absolute left-0 top-2 w-12 h-12 rounded-full overflow-hidden md:-translate-x-1/2 md:left-1/2">
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="object-cover"
                  />
                </div>

                {/* Card */}
                <Card
                  className={
                    "relative md:w-[45%] ml-16 md:ml-0 p-6 bg-neutral-900"
                  }
                >
                  <span className="absolute -z-10 -inset-2 rounded-2xl blur-sm bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700"></span>

                  <div>
                    <p className="text-sm text-gray-300">{exp.date}</p>
                    <h3 className="text-white font-semibold text-xl">
                      {exp.role}
                    </h3>
                    <h4 className="text-gray-300 mb-3">{exp.company}</h4>
                  </div>
                  <div className="space-y-4">
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isExpanded ? "max-h-400" : "max-h-36 lg:max-h-none"
                      }`}
                    >
                      <div
                        ref={(el) => {
                          contentRefs.current[idx] = el;
                        }}
                      >
                        <ul
                          className={`text-gray-400 space-y-1 list-disc pl-6 ${
                            isLeft ? "" : " md:pr-4"
                          }`}
                        >
                          {exp.description.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleExpand(idx)}
                      className={`lg:hidden text-xs font-semibold text-white/90 transition-colors uppercase tracking-wide ${
                        showExpandButton[idx] ? "flex" : "hidden"
                      }`}
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
              </motion.div>
            );
          })}
        </div>
      </Container>
    </motion.section>
  );
};

export default Expirence;
