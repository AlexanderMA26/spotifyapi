import React from "react";
import axios from "axios";

const Spotify=()=>{
const CLIENT_ID = "edc358a22e8f45749a710d543b0da712";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const CLIENT_SECRET = "f238b6801c1643e692783794d24945a7";
console.log(InitAPi(CLIENT_ID, CLIENT_SECRET, TOKEN_ENDPOINT));
}

async function InitAPi({CID, CS, TE}){
    try {
        // Method for getting the access token for the API
        const response = await axios.post(TE, `grant_type=client_credentials&client_id=${CID}&client_secret=${CS}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token', error);
        throw new Error('Failed to fetch access token');
    }
    
};

export default Spotify;