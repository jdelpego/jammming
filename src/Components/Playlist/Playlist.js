import React, { useState } from 'react';
import styles from './Playlist.module.css'
import Tracklist from '../Tracklist/Tracklist';
import { getSpotifyAccessToken } from '../../assets/js/get_access';
import { search_request, get_user_id, create_playlist, add_tracks_to_playlist } from '../../assets/js/api_calls';
import { convertMsToMinutesSeconds, convertDataToTracksArray } from '../../assets/js/utils';


function Playlist() {
    const [name, setName] = useState('');
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [searchTracks, setSearchTracks] = useState([]);
    const [search, setSearch] = useState('');
    const [searchMode, setSearchMode] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault(); 
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
    };

    const searchHandler = (event) => {
        event.preventDefault(); 
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
    
    const saveHandler = () => {
        if(name == ''){
            alert('Name value must not be blank');
            return;
        }
        let userID = '';
        getSpotifyAccessToken()
        .then(() => get_user_id())
        .then((user_id) => create_playlist(user_id, name, name))
        .then((playlist_id) => add_tracks_to_playlist(playlist_id, playlistTracks.map(track => track.id)));
    };

    return (
        <div className={styles.playlistBox}>
            <div className={styles.playlist}>
                <input className={styles.title} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <form className={styles.form} onSubmit={submitHandler}>
                    <input className={styles.search} type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                </form>
                
                <Tracklist tracks={searchMode ? searchTracks : playlistTracks} setPlaylistTracks={setPlaylistTracks} isSearchMode={searchMode} setSearchTracks={setSearchTracks}/>
                <footer className={styles.footer}>
                    <button className={styles.button} style={{backgroundColor: searchMode ? 'lightyellow': 'lightblue'}} onClick={searchHandler}> {searchMode ? 'Back To Playlist' : 'Search'}</button>
                    {!searchMode && <button className={styles.button} style={{backgroundColor: 'lightgreen'}} onClick={saveHandler}>Save To Spotify</button>}
                </footer>
            </div>
           
        </div>
    )
};

export default Playlist;