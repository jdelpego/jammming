import React from "react";
import styles from './Track.module.css'

function Track(){
    return (
        <div className={styles.track}>
            <img className={styles.album_cover} src="https://www.billboard.com/wp-content/uploads/media/tyler-the-creator-igor-album-art-2019-billboard-embed.jpg?w=600"/>
            <span className={styles.title}>EARFQUAKE</span>
            <span className={styles.author}>Tyler, The Creator</span>
            <span className={styles.duration}>3:10</span>
            <img className={styles.add_button} src="https://static.vecteezy.com/system/resources/previews/017/350/109/non_2x/red-cross-button-in-round-shape-png.png" />
        </div>
    );
}
export default Track;