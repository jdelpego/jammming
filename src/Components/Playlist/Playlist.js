import React, { useState } from 'react';
import styles from './Playlist.module.css'
import Tracklist from '../Tracklist/Tracklist';
import { getSpotifyAccessToken } from '../../assets/js/get_access';
import { search_request } from '../../assets/js/api_calls';


function Playlist() {
    const [name, setName] = useState('');

    const clickHandler = () => {
        getSpotifyAccessToken().then(() => search_request('tyler').then((data) => 
            {
                for(const item of data['tracks']['items']){
                    console.log(item['name']);
                }
            }
    ))};

    return (
        <div className={styles.playlistBox}>
            <div className={styles.playlist}>
                <input className={styles.title} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <Tracklist />
                <footer className={styles.footer}>
                    <button className={styles.button} style={{backgroundColor: 'lightblue'}}>Search</button>
                    <button className={styles.button} style={{backgroundColor: 'lightgreen'}} onClick={clickHandler}>Save To Spotify</button>
                </footer>
            </div>
           
        </div>
    )
};

export default Playlist;