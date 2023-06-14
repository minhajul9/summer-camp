import { Helmet } from "react-helmet";
import Banner from "./Banner";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";
import PreviousCampShots from "./PreviousCampShots";

const Home = () => {
    return (
        <div className='pt-8'>
            <Helmet>
                <link rel="icon" type="image/svg+xml" href="https://i.ibb.co/ygxHsMb/Screenshot-2023-06-10-160018.png" />
                <title>Summer Sports Camp</title>
            </Helmet>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <PreviousCampShots></PreviousCampShots>
        </div>
    );
};

export default Home;