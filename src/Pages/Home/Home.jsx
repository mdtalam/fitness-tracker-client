import { Helmet } from "react-helmet-async";
import About from "./HomeComponent/About";
import CommunityPost from "./HomeComponent/CommunityPost";
import Featured from "./HomeComponent/Featured";
import FeaturedClasses from "./HomeComponent/FeaturedClasses";
import NewsLetter from "./HomeComponent/NewsLetter";
import Slider from "./HomeComponent/Slider";
import Team from "./HomeComponent/Team";
import Testimonials from "./HomeComponent/Testimonials";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>
                FitFusion | Home
                </title>
            </Helmet>
            <section className="mt-[72px]">
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
            <section>
                <NewsLetter></NewsLetter>
            </section>
            <section>
                <Team></Team>
            </section>
        </div>
    );
};

export default Home;