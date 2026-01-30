import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import DarkVeil from "./components/ui/DarkVeil";

function App() {
  return (
    <>
      <div className="fixed -z-10 inset-0 w-screen h-screen">
        <DarkVeil
          hueShift={72}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={4}
        />
      </div>

      <div className="relative">
        {/* <div className="w-100 h-64 blur-[95px] bg-accent/15 sticky top-0 left-1/2 -translate-x-1/2 rounded-full z-1"></div> */}
        <Header></Header>
        <MainContent></MainContent>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
