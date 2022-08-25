let accessToken

const Spotify = {
  getAccessToken(){
    if(accessToken){
        console.log(accessToken);
        return accessToken;
    }

    //Check for Access Token Match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/); 
    

    if(accessTokenMatch && expiresInMatch){
        accessToken = accessTokenMatch[1];
        console.log(accessToken);
        const expiresIn = Number(expiresInMatch[1]);
        //Clears the parameters, and grabs a new access token when the old one expires.
        window.setTimeout(()=> accessToken = '', expiresIn * 1000)
        window.history.pushState('AccessToken',null,'/');
        return accessToken
    } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${process.env.REACT_APP_URI_REDIRECT}`
        window.location = accessUrl;
        console.log(accessUrl)
    }},

    search(term) {
        const accessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return []
            } else {
                return jsonResponse.tracks.items.map(track => ({
                    id:track.id,
                    name:track.name,
                    artists: track.artists[0].name,
                    album:track.album.name,
                    uri:track.uri
                }))
            }
        })
    },

    savePlaylist(name, trackURIs) {
        if(!name || !trackURIs){
            return
        } else {
            const accessToken = Spotify.getAccessToken();
            const headers = {
                Authorization: `Bearer ${accessToken}`
            }
            let userId;

        return fetch(`https://api.spotify.com/v1/me`,{headers:headers})
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
                headers: {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name : name})
                }
            }).then(response => response.json())
            .then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.con/v1/users/${userId}/playlists/${playlistId}`,{
                    headers:headers,
                    method:'POST',
                    body: JSON.stringify({uris: trackURIs})
                })
            })
        })
    }
}
}

export default Spotify;
