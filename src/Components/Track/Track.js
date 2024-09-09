import React from "react";
import styles from './Track.module.css'

function Track({ name, image_src, duration, artist }){
    return (
        <div className={styles.track}>
            <img className={styles.album_cover} src={image_src}/>
            <span className={styles.title}>{name}</span>
            <span className={styles.author}>{artist}</span>
            <span className={styles.duration}>{duration}</span>
            <img className={styles.add_button} src="https://static.vecteezy.com/system/resources/previews/017/350/109/non_2x/red-cross-button-in-round-shape-png.png" />
        </div>
    );
}
export default Track;