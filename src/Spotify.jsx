import React from "react";
import axios from "axios";

const Spotify=()=>{
let response = InitAPi();
console.log(response);
return(
    
    <h1>{response}</h1>
);
}

async function InitAPi(){
    const CLIENT_ID = "edc358a22e8f45749a710d543b0da712";
    const CLIENT_SECRET = "f238b6801c1643e692783794d24945a7";

    try{
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
              'grant_type': 'client_credentials',
              'client_id': CLIENT_ID,
              'client_secret': CLIENT_SECRET
            })
          );
        return response;
    } catch (error) {
        console.error('Error fetching access token', error);
        throw new Error('Failed to fetch access token');
};
}

export default Spotify;