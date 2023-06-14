import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <Carousel >
                <div className='md:h-[800px]'>
                    <img  src="https://img.freepik.com/free-vector/african-boy-girl-playing-football_1308-26183.jpg?w=1380&t=st=1686406412~exp=1686407012~hmac=3351db61df0190ad0b54ed617d1b833388042a75edfa75d5bcfc5fe81d6ea6fc" />
                    <p className="legend">
                        <span className="text-2xl font-bold">Football Training</span>
                    </p>
                </div>
                <div  className='md:h-[800px]'>
                    <img src="https://img.freepik.com/free-vector/hand-drawn-ipl-cricket-illustration_23-2149213601.jpg?w=1380&t=st=1686407279~exp=1686407879~hmac=401c48a90906ca1d7f7cf3caeb9f039e058288031ff4fea103a61fffd7255ec2" />
                    <p className="legend">
                        <span className="text-2xl font-bold">Cricket Training</span>
                    </p>
                </div>
                <div className='md:h-[800px]'>
                    <img src="https://img.freepik.com/free-vector/summer-background_23-2149397433.jpg?w=1380&t=st=1686407357~exp=1686407957~hmac=bec2675894ca308b82de31dad0caad7c36c1bb64b90f666dd91b77c3ac328dce" />
                    <p className="legend">
                        <span className="text-2xl font-bold">Vollyball Training</span>
                    </p>
                </div>
                <div className='md:h-[800px]'>
                    <img src="https://img.freepik.com/free-vector/kids-playing-baseball-flat-illustration-cartoon-style-with-cute-characters-engaged-game_1284-17672.jpg?w=1380&t=st=1686407509~exp=1686408109~hmac=def3621850e6e010bc0e688106cf81fbbdef46c19b4a0913256f8c1a4ecb9986" />
                    <p className="legend">
                        <span className="text-2xl font-bold">Baseball Training</span>
                    </p>
                </div>
                
            </Carousel>
    );
};

export default Banner;


//     <img src="" alt="" />
// </SwiperSlide>
// <SwiperSlide>
//     <img src="" alt="" />
// </SwiperSlide>
// <SwiperSlide>
//     <img src="" alt="" />