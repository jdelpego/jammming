import React, { useEffect } from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css'

function Tracklist({ tracks }){
    return (
        
        <div className={styles.tracklist}>
            {tracks.map((track) => {
                return <Track
                name={track.name}
                image_src={track.image_src}
                duration={track.duration}
                artist={track.artist} 
                />
            })
            }
        </div>
    );
}

export default Tracklist;