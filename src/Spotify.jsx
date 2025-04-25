import React from "react";
import axios from "axios";
import{useEffect, useState} from 'react';

const Spotify=()=>{
const [Token, setToken] = useState(' ')
useEffect(()=>{

  //Some help from GPT
  const fetchToken = async () => {
    const CLIENT_ID = "edc358a22e8f45749a710d543b0da712";
    const CLIENT_SECRET = "f238b6801c1643e692783794d24945a7";

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "client_credentials",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
          },
        }
      );
      setToken(response.data.access_token);
    } catch (error) {
      console.error("Error fetching access token", error);
    }
  };

  fetchToken();
}, []);

return(
  <h3>{Token? Token: "Getting the access token..."}</h3>
);
}

export default Spotify;