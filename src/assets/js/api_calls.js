export const search_request = async (search_query) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${search_query}&type=track&limit=10`, {
            method: 'GET', 
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 
              'Content-Type': 'application/json'
            },
          });
        if (!response.ok) {
        throw new Error('Failed to fetch user profile: ' + response.statusText);
        }
        const data = await response.json(); 
        console.log('User Profile:', data);
        return data;
    } catch(error){
        console.error('Error fetching user profile:', error);
    }
};

export const get_user_id = async () => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include the access token in the request headers
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('User ID:', data.id); // Print the user's Spotify ID
    return data.id; // Return the user's ID for further use

  } catch (error) {
    console.error('Error fetching Spotify user ID:', error);
  }
};

export const create_playlist = async (user_id, playlistName, playlistDescription) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include the access token in the request headers
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName, // Set the name of the new playlist
        description: playlistDescription, // Set the description of the new playlist
        public: false // You can set it to true if you want the playlist to be public
      })
    });

    if (!response.ok) {
      console.log(`User id = ${user_id} access_token equals ${localStorage.getItem('access_token')}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Created Playlist ID:', data.id); // Print the created playlist's ID
    return data.id; // Return the created playlist's ID

  } catch (error) {
    console.error('Error creating playlist:', error);
  }
};

export const add_tracks_to_playlist = async (playlist_id, trackIDs) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include the access token in the request headers
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: trackIDs // Array of Spotify track URIs to be added to the playlist
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Tracks added to Playlist ID:', playlist_id); // Log success message
    return data; // Return the response data for further use

  } catch (error) {
    console.error('Error adding tracks to playlist:', error);
  }
};
