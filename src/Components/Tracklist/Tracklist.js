import React, { useEffect } from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css'

function Tracklist({ tracks, setPlaylistTracks, isSearchMode, setSearchTracks }){
    return (
        
        <div className={styles.tracklist}>
            {tracks.map((track) => {
                return <Track
                id={track.id}
                name={track.name}
                image_src={track.image_src}
                duration={track.duration}
                artist={track.artist} 
                setPlaylistTracks={setPlaylistTracks}
                isSearchMode={isSearchMode}
                setSearchTracks={setSearchTracks}
                />
            })
            }
        </div>
    );
}

export default Tracklist;