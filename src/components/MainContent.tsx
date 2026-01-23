import AboutMe from "./AboutMe";
import Contact from "./Contact";
import Projects from "./Projects";

const MainContent = () => {
  return (
    <div className="mt-28">
      <AboutMe></AboutMe>
      <Projects></Projects>
      <Contact></Contact>
    </div>
  );
};

export default MainContent;
