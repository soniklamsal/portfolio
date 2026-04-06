import Nav from '@/components/Nav';
import Home from '@/components/Home';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main className="main">
        <Home />
        <Projects />
        <Services />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
