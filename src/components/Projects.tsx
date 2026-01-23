import Card from "./Card";
import solarSystem from "../assets/solarSystem.png";
import trejdegruppen from "../assets/tredjegruppenAB.png";
import portfolio from "../assets/portfolio.png";
import { motion } from "motion/react";
import Tilt from "react-parallax-tilt";
import Container from "./Container";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    description: "Built a shipping company website",
    url: "https://tredje-gruppen-ab.vercel.app/",
    githubUrl: "https://github.com/Mohammedaabdu/Tredje-Gruppen-AB",
    techStack: ["React", "Typescript", "Html", "TailwindCss", "Framer Motion"],
  },
  {
    img: solarSystem,
    prjectName: "Solar System",
    description: "Built the solar system with help of three.js framework",
    url: "https://3-d-solar-system-smoky.vercel.app/",
    githubUrl: "https://github.com/Mohammedaabdu/3D_SolarSystem",
    techStack: ["ThreeJs", "JS", "Html"],
  },
  {
    img: portfolio,
    prjectName: "Portfolio",
    description: "My old portfolio",
    url: "https://mohammed-3d-portfolio.vercel.app/",
    githubUrl: "https://github.com/Mohammedaabdu/Mohammed_3D_portfolio",
    techStack: ["React", "Typescript", "Html", "TailwindCss", "Framer Motion"],
  },
  {
    img: portfolio,
    prjectName: "Portfolio2",
    description: "My current portfolio",
    url: "https://mohammed-3d-portfolio.vercel.app/",
    githubUrl: "https://github.com/Mohammedaabdu/Mohammed_3D_portfolio",
    techStack: ["React", "Typescript", "Html", "TailwindCss", "Framer Motion"],
  },
];

const colors = [
  {
    bg: "from-secondary/40 to-transparent to-40% shadow-accent",
    text: "text-secondary",
    hoverText: "group-hover:text-secondary",
  },
  {
    bg: "from-red-500/40 to-transparent to-40% shadow-red-600",
    text: "text-red-600",
    hoverText: "group-hover:text-red-600",
  },
  {
    bg: "from-blue-500/40 to-transparent to-40% shadow-blue-600",
    text: "text-blue-600",
    hoverText: "group-hover:text-blue-600",
  },
  {
    bg: "from-yellow-500/40 to-transparent to-40% shadow-yellow-600",
    text: "text-yellow-600",
    hoverText: "group-hover:text-yellow-600",
  },
];

const Projects = () => {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, margin: "0px 0px -200px 0px" }}
    >
      <Container>
        <div className="text-center md:text-start">
          <div className="grid grid-cols-1 gap-12 ">
            {projectList.map((project, idx) => (
              <Tilt
                tiltReverse={true}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                transitionSpeed={10000}
              >
                <Card
                  className={`group grid grid-cols-2 gap-4 hover:bg-linear-to-bl ${colors[idx].bg} hover:scale-105 shadow-sm hover:shadow-lg transition-all duration-500`}
                >
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={project.img}
                      alt={project.prjectName}
                      className="h-full w-full object-cover group-hover:scale-110 duration-500 transition-transform"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3
                        className={`text-xl sm:text-2xl font-semibold text-white tracking-tight font-sans transition-colors duration-500 ${colors[idx].hoverText}`}
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
                    <h4 className="text-gray-300 mb-3 ">
                      {project.description}
                    </h4>
                    <div className="flex space-x-2 justify-between">
                      <a
                        href={project.url}
                        target="_blank"
                        className={`flex items-baseline ${colors[idx].text} font-semibold`}
                      >
                        <motion.span
                          initial={{ opacity: 1 }}
                          animate={{
                            opacity: 0.5,
                            transition: {
                              repeat: Infinity,
                              repeatType: "mirror",
                              duration: 1,
                              ease: "easeInOut",
                            },
                          }}
                          className={`text-xl mr-2 ${colors[idx].text}`}
                        >
                          •
                        </motion.span>
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        className={`flex items-center ${colors[idx].text} font-semibold`}
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
            ))}
          </div>
        </div>
      </Container>
    </motion.section>
  );
};

export default Projects;
