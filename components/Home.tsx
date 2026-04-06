import About from './About';
import Skills from './Skills';

export default function Home() {
    return (
        <section className="home section" id="home">
            <div className="home__container container grid">
                <About />
                <Skills />
            </div>
        </section>
    );
}
