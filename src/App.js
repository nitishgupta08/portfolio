import Navbar from "./components/navbar/Navbar";
import Intro from "./components/intro/Intro"
import About from "./components/about/About"
import Prjcts from "./components/prjcts/Prjcts"
import Contact from "./components/contact/Contact"


import "./app.scss"


function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="sections">

        <Intro />
        <About />
        <Prjcts />
        <Contact />


      </div>
    </div>
  );
}

export default App;
