export function convertMsToMinutesSeconds(ms) {
    // Convert milliseconds to total seconds
    const totalSeconds = Math.floor(ms / 1000);
  
    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    // Format the seconds to always have two digits
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  
    // Return the formatted time string
    return `${minutes}:${formattedSeconds}`;
  }

export function convertDataToTracksArray(data) {
    // Initialize an empty array to store track objects
    const tracksArray = [];
  
    // Iterate over the tracks in the data
    for (const track of data['tracks']['items']) {
      // Extract necessary information for each track
      const id = track['uri'];
      const name = track['name'];
      const image_src = track['album']['images'][0]['url']; // Accessing the image URL
      const duration = convertMsToMinutesSeconds(track['duration_ms']); // Convert duration from ms to "minutes:seconds"
      const artist = track['artists'][0]['name']; // Accessing the first artist's name
  
      // Create a track object with extracted properties
      const trackObject = {
        id, 
        name,
        image_src,
        duration,
        artist,
      };  
      // Add the track object to the tracksArray
      tracksArray.push(trackObject);
    }
  
    // Return the array of track objects
    return tracksArray;
    }