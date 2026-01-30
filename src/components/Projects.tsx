import Card from "./Card";
import solarSystem from "../assets/solarSystem.png";
import trejdegruppen from "../assets/tredjegruppenAB.png";
import portfolio from "../assets/portfolio.png";
import portfolioV2 from "../assets/portfolioV2.png";
import { motion, useScroll, useTransform } from "motion/react";
import Tilt from "react-parallax-tilt";
import Container from "./Container";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
interface IProject {
  img: string;
  prjectName: string;
  description: string;
  url: string;
  githubUrl: string;
  techStack: string[];
}
const projectList: IProject[] = [
  {
    img: trejdegruppen,
    prjectName: "Tredje Gruppen AB",
    description:
      "A React-based logistics demo showcasing animated UI and responsive design.",
    url: "https://tredje-gruppen-ab.vercel.app/",
    githubUrl: "https://github.com/Mohammedaabdu/Tredje-Gruppen-AB",
    techStack: ["React", "Typescript", "Html", "TailwindCss", "Framer Motion"],
  },
  {
    img: solarSystem,
    prjectName: "Solar System",
    description:
      "An interactive 3D solar system where users can explore planetary orbits.",
    url: "https://3-d-solar-system-smoky.vercel.app/",
    githubUrl: "https://github.com/Mohammedaabdu/3D_SolarSystem",
    techStack: ["ThreeJs", "JS", "Html"],
  },
  {
    img: portfolio,
    prjectName: "Portfolio",
    description: "My first portfolio focused on clean UI and smooth animations",
    url: "https://mohammed-3d-portfolio.vercel.app/",
    githubUrl: "https://github.com/Mohammedaabdu/Mohammed_3D_portfolio",
    techStack: ["React", "Typescript", "Html", "TailwindCss", "Framer Motion"],
  },
  {
    img: portfolioV2,
    prjectName: "Portfolio V2",
    description: "This site — a 3D-enhanced portfolio",
    url: "https://portfolio-v2-mgl1g3ctn-mohammed-abdus-projects.vercel.app/",
    githubUrl: "https://github.com/Mohammedaabdu/portfolio_v2",
    techStack: [
      "React",
      "Typescript",
      "Html",
      "TailwindCss",
      "Framer Motion",
      "Threejs",
      "R3F",
      "OpenApI",
    ],
  },
];

const colors = [
  {
    bgColor: "bg-secondary",
    text: "text-secondary",
    hoverText: "group-hover:text-secondary",
    comboShadowBase:
      "shadow-[0_10px_15px_rgba(61,213,152,0.5),-1px_-1px_5px_rgba(61,213,152,0.5)]",
    comboShadowHover:
      "hover:shadow-[0_20px_20px_rgba(0,0,0,0.1),0_10px_10px_rgba(0,0,0,0.04),-2px_-2px_10px_rgba(61,213,152,0.7)]",
  },
  {
    bgColor: "bg-red-500",
    text: "text-red-600",
    hoverText: "group-hover:text-red-600",
    comboShadowBase:
      "shadow-[0_10px_15px_rgba(220,38,38,0.5),-1px_-1px_5px_rgba(220,38,38,0.5)]",
    comboShadowHover:
      "hover:shadow-[0_20px_20px_rgba(0,0,0,0.1),0_10px_10px_rgba(0,0,0,0.04),-2px_-2px_10px_rgba(220,38,38,0.7)]",
  },
  {
    bgColor: "bg-blue-500",
    text: "text-blue-600",
    hoverText: "group-hover:text-blue-600",
    comboShadowBase:
      "shadow-[0_10px_15px_rgba(37,99,235,0.5),-1px_-1px_5px_rgba(37,99,235,0.5)]",
    comboShadowHover:
      "hover:shadow-[0_20px_20px_rgba(0,0,0,0.1),0_10px_10px_rgba(0,0,0,0.04),-2px_-2px_10px_rgba(37,99,235,0.7)]",
  },
  {
    bgColor: "bg-yellow-500",
    text: "text-yellow-600",
    hoverText: "group-hover:text-yellow-600",
    comboShadowBase:
      "shadow-[0_10px_15px_rgba(202,138,4,0.5),-1px_-1px_5px_rgba(202,138,4,0.5)]",
    comboShadowHover:
      "hover:shadow-[0_20px_20px_rgba(0,0,0,0.1),0_10px_10px_rgba(0,0,0,0.04),-2px_-2px_10px_rgba(202,138,4,0.7)]",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end 45%"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.75, 0.9], [1, 1, 0]);

  return (
    <>
      <motion.section
        id="projects"
        className="relative scroll-mt-40"
        ref={sectionRef}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ margin: "0px 0px -200px 0px" }}
      >
        <Container>
          <motion.h2
            style={{ opacity: titleOpacity }}
            className="sticky text-center md:text-start top-30 z-20 mb-8 bg-linear-to-r from-secondary to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent"
          >
            Selected projects
          </motion.h2>
          <div className="text-center md:text-start">
            <div className="grid grid-cols-1 gap-24 ">
              {projectList.map((project, idx) => (
                <div
                  key={idx}
                  className="sticky"
                  style={{
                    top: `${200 + idx * 40}px`,
                    zIndex: idx,
                  }}
                >
                  <Tilt
                    tiltReverse={true}
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    transitionSpeed={10000}
                  >
                    <Card
                      className={`group grid md:grid-cols-2 gap-4 hover:bg-linear-to-bl hover:scale-105 ${colors[idx].comboShadowBase} ${colors[idx].comboShadowHover} transition-all duration-500`}
                    >
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src={project.img}
                          alt={project.prjectName}
                          className="h-full w-full object-cover group-hover:scale-110 duration-500 transition-transform"
                        />
                      </div>
                      <div className="flex flex-col justify-between text-start">
                        <div className="space-y-4">
                          <h3
                            className={`text-xl  sm:text-2xl font-semibold text-white tracking-tight font-sans transition-colors duration-500 ${colors[idx].hoverText}`}
                          >
                            {project.prjectName}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, techIdx) => (
                              <span
                                key={techIdx}
                                className={`px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.15em] uppercase ${colors[idx].text} w-fit`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <h4 className="text-gray-300 my-4">
                          {project.description}
                        </h4>
                        <div className="flex space-x-2 justify-between">
                          <a
                            href={project.url}
                            target="_blank"
                            className={`flex hover:underline items-baseline ${colors[idx].text} font-semibold`}
                          >
                            <span className="relative flex size-3 mr-2">
                              <span
                                className={`absolute inline-flex h-full w-full animate-ping rounded-full ${colors[idx].bgColor} opacity-75`}
                              ></span>
                              <span
                                className={`relative inline-flex size-3 rounded-full ${colors[idx].bgColor}`}
                              ></span>
                            </span>
                            Live Demo
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            className={`flex hover:underline items-center ${colors[idx].text} font-semibold`}
                          >
                            View Github Code
                            <FontAwesomeIcon
                              className="ml-2 pt-0.5"
                              icon={faCode}
                            />
                          </a>
                        </div>
                      </div>
                    </Card>
                  </Tilt>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </motion.section>
    </>
  );
};

export default Projects;
