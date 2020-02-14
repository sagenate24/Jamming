const clientID = '83879e7551a74f5baa78ae5d50f56b39';
const redirectURI = encodeURIComponent('http://localhost:3000/callback/');
// const redirectURI = encodeURIComponent('http://jammingwebapp.s3.us-east-2.amazonaws.com/index.html#/callback/');
// const clientSecret = 'https://jammingwebapp.s3.us-east-2.amazonaws.com/index.html';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expireInURL = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenInURL && expireInURL) {
            accessToken = accessTokenInURL[1];
            const expiresIn = Number(expireInURL[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },

    search(searchTerm) {
        const accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).then(response => {
            if (response.ok) { return response.json(); }
        }).then(jsonResponse => {
            if (!jsonResponse.tracks.items) { return null; }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                albumImage: track.album.images[2].url,
                albumName: track.album.name,
                uri: track.uri,
                previewAudio: track.preview_url
            }));
        })
    },

    savePlaylist(playlistName, tracksURI) {
        if (!playlistName || !tracksURI.length) { return; }
        let accessToken = this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID;

        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            }).then(response => response.json()
            ).then(jsonResponse => {
                let playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: tracksURI })
                });
            });
        });
    },

    getUserProfile() {
        let accessToken = this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID;

        return fetch('https://api.spotify.com/v1/me', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}`, {
                headers: headers
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(jsonResponse => {
                return jsonResponse.display_name
            })
        })
    },

    getUserPlaylist() {
        let accessToken = this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        return fetch('https://api.spotify.com/v1/me/playlists?offset=0&limit=35', { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            return jsonResponse.items.map(item => ({
                id: item.id,
                image: item.images[0].url,
                name: item.name,
                tracks: item.tracks,
                owner: item.owner.display_name
            }));
        })
    }
};
window.onload = Spotify.getUserPlaylist();
window.onload = Spotify.getAccessToken();

export default Spotify;