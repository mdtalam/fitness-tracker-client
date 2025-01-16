import About from "./HomeComponent/About";
import Featured from "./HomeComponent/Featured";
import Slider from "./HomeComponent/Slider";


const Home = () => {
    return (
        <div>
            <section>
                <Slider></Slider>
            </section>
            <section>
                <Featured></Featured>
            </section>
            <section>
                <About></About>
            </section>
        </div>
    );
};

export default Home;