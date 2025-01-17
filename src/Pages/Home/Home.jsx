import About from "./HomeComponent/About";
import CommunityPost from "./HomeComponent/CommunityPost";
import Featured from "./HomeComponent/Featured";
import FeaturedClasses from "./HomeComponent/FeaturedClasses";
import Slider from "./HomeComponent/Slider";
import Testimonials from "./HomeComponent/Testimonials";


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
            <section>
                <FeaturedClasses></FeaturedClasses>
            </section>
            <section>
                <Testimonials></Testimonials>
            </section>
            <section>
                <CommunityPost></CommunityPost>
            </section>
        </div>
    );
};

export default Home;