import Navbar from './components/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import CampusExplorer from './sections/CampusExplorer.jsx';
import About from './sections/About.jsx';
import Academics from './sections/Academics.jsx';
import Departments from './sections/Departments.jsx';
import StudentLife from './sections/StudentLife.jsx';
import Admissions from './sections/Admissions.jsx';
import News from './sections/News.jsx';
import Gallery from './sections/Gallery.jsx';
import Testimonials from './sections/Testimonials.jsx';
import VirtualTour from './sections/VirtualTour.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <CampusExplorer />
        <About />
        <Academics />
        <Departments />
        <StudentLife />
        <Admissions />
        <News />
        <Gallery />
        <Testimonials />
        <VirtualTour />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
