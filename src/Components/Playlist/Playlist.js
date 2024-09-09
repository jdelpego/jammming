import React, { useState } from 'react';
import styles from './Playlist.module.css'
import Tracklist from '../Tracklist/Tracklist';
import { getSpotifyAccessToken } from '../../assets/js/get_access';
import { search_request } from '../../assets/js/api_calls';
import { convertMsToMinutesSeconds, convertDataToTracksArray } from '../../assets/js/utils';


function Playlist() {
    const [name, setName] = useState('');
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [searchTracks, setSearchTracks] = useState([]);
    const [search, setSearch] = useState('');
    const [searchMode, setSearchMode] = useState(false);

    const searchHandler = () => {
        if(searchMode === true){
            setSearchMode(false);
        }
        else{
            if (search === ''){
            alert('Search value must not be blank');
            }
            else{
            setSearchMode(true);
            getSpotifyAccessToken().then(() => search_request(search).then((data) => 
                {
                    console.log(JSON.stringify(data));
                    setSearchTracks(convertDataToTracksArray(data));
                }
            ));
            }
        }
        };

    return (
        <div className={styles.playlistBox}>
            <div className={styles.playlist}>
                <input className={styles.title} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <input className={styles.search} type="text" value={searchMode ? search : ''} onChange={(e) => setSearch(e.target.value)} />
                <Tracklist tracks={searchMode ? searchTracks : playlistTracks} setPlaylistTracks={setPlaylistTracks} isSearchMode={searchMode} setSearchTracks={setSearchTracks}/>
                <footer className={styles.footer}>
                    <button className={styles.button} style={{backgroundColor: searchMode ? 'lightyellow': 'lightblue'}} onClick={searchHandler}> {searchMode ? 'Back To Playlist' : 'Search'}</button>
                    {!searchMode && <button className={styles.button} style={{backgroundColor: 'lightgreen'}}>Save To Spotify</button>}
                </footer>
            </div>
           
        </div>
    )
};

export default Playlist;