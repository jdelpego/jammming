// spotifyAuth.js

// Utility function to generate a random string for the code verifier
const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  };
  
  // Function to generate a code challenge from the code verifier
  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  };
  
  // Function to base64 encode the hashed value
  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };
  
  // Function to generate the code challenge from the code verifier
  const generateCodeChallenge = async (codeVerifier) => {
    const hashed = await sha256(codeVerifier);
    return base64encode(hashed);
  };
  
  // Main function to start the PKCE authorization process
  const authorizeWithSpotify = async () => {
    const clientId = '9135be790fb84ed79e8b4ad1945e4953'; // Your client ID
    const redirectUri = 'http://localhost:3000/'; // Your redirect URI
    const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
  
    // Save the code verifier in localStorage for use later
    window.localStorage.setItem('code_verifier', codeVerifier);
  
    // Construct the authorization URL
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    const params = {
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };
  
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString(); // Redirect user to Spotify's authorization page
  };
  
  // Function to handle the redirect back from Spotify and exchange the code for an access token
  const getAccessTokenFromCode = async () => {
    const clientId = '9135be790fb84ed79e8b4ad1945e4953'; // Your client ID
    const redirectUri = 'http://localhost:3000/'; // Your redirect URI
  
    // Retrieve the authorization code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Get the authorization code from URL
  
    if (!code) {
      console.error('No authorization code found in the URL');
      return null;
    }
  
    // Retrieve the code verifier from localStorage
    const codeVerifier = localStorage.getItem('code_verifier');
  
    // Exchange the authorization code for an access token
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', payload);
      const data = await response.json(); // Parse the response as JSON
  
      if (response.ok) {
        localStorage.setItem('access_token', data.access_token); // Store the access token
        console.log('Access token obtained:', data.access_token);
        return data.access_token;
      } 
      else if (data['error_description'].includes('expired')){
        window.location.assign('http://localhost:3000/');
      }
      else {
        console.log(JSON.stringify(data));
        console.error('Failed to obtain access token:', data);
        return null;
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
  };

// Main function to initiate the Spotify authorization flow and return the access token
export const getSpotifyAccessToken = async () => {
  if (window.location.search.includes('code=')){
    // If there is a code in the URL, exchange it for an access token
    return await getAccessTokenFromCode();
  } else {
    // Otherwise, start the authorization process
    await authorizeWithSpotify();
  }
};