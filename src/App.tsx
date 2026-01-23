import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
function App() {
  return (
    <>
      {/* <div className="w-100 h-64 blur-[95px] bg-accent/15 fixed top-0 left-1/2 -translate-x-1/2 rounded-full -z-10"></div> */}
      <Header></Header>
      <MainContent></MainContent>
      <Footer></Footer>
    </>
  );
}

export default App;
