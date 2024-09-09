import {React, useState} from "react";
import styles from './Track.module.css'

function Track({ id, name, image_src, duration, artist, setPlaylistTracks, isSearchMode, setSearchTracks }){

    const clickHandler = () => {
        if(isSearchMode){
            const trackObject = {
                id, 
                name,
                image_src,
                duration,
                artist,
              };
            setPlaylistTracks(existingTracks => [...existingTracks, trackObject]);
            setSearchTracks(existingTracks => existingTracks.filter(track => track.id !== id));
        }
        else {
            // Remove track if it is already added
            setPlaylistTracks(existingTracks => existingTracks.filter(track => track.id !== id));
          }

    }

    return (
        <div className={styles.track}>
            <img className={styles.album_cover} src={image_src}/>
            <span className={styles.title}>{name}</span>
            <span className={styles.author}>{artist}</span>
            <span className={styles.duration}>{duration}</span>
            <img className={styles.add_button} onClick={clickHandler} src={!isSearchMode? "https://cdn-icons-png.freepik.com/512/5974/5974771.png": "https://cdn-icons-png.freepik.com/512/5974/5974633.png"} />
        </div>
    );
}
export default Track;