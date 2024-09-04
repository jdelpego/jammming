export const search_request = async (search_query) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${search_query}&type=track&limit=10`, {
            method: 'GET', 
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 
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