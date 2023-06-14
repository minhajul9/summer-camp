import Banner from "./Banner";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";
import PreviousCampShots from "./PreviousCampShots";

const Home = () => {
    return (
        <div className='pt-8'>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <PreviousCampShots></PreviousCampShots>
        </div>
    );
};

export default Home;