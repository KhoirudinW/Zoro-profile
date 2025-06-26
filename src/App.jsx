import Hero from "./component/Hero";
import About from "./component/About";
import Bento from "./component/Bento";
import Mainmenu from "./component/Mainmenu";

function App() {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Hero />
      <About/>
      <Bento />
      <Mainmenu />
    </main>
  )
}

export default App