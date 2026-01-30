import AboutMe from "./AboutMe";
import AI from "./AI";
import Contact from "./Contact";
import Expirence from "./Expirence";
import Projects from "./Projects";

const MainContent = () => {
  return (
    <div className="mt-28 space-y-24">
      <AboutMe></AboutMe>
      <Expirence></Expirence>
      <Projects></Projects>
      <AI></AI>
      <Contact></Contact>
    </div>
  );
};

export default MainContent;
