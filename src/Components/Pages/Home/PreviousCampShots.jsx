import { AttentionSeeker } from 'react-awesome-reveal';
import { Player } from 'video-react';

const PreviousCampShots = () => {
    return (
        <div className='my-16'>
            <h1 className='text-center text-4xl font-bold my-8'>Some Shots form Last Year</h1>

            <AttentionSeeker effect="bounce" >
            <div className='flex justify-center'>
                <iframe width="900" height="550" src="https://www.youtube.com/embed/g9pAUcBfm9I" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            </AttentionSeeker>
        </div>
    );
};

export default PreviousCampShots;