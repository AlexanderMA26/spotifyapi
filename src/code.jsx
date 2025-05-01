import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const code=()=>{
    const [Token, setToken] = useState(' ')
    const ClientID = "edc358a22e8f45749a710d543b0da712";
    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');


        const codeVerifier = generateRandomString(64)
        const hashed
        generateCodeChallenge(codeVerifier).then((codeChallenge) => {
            localStorage.setItem("code_verifier", codeVerifier);
            const authUrl = new URL("https://accounts.spotify.com/authorize");
            authUrl.search = new URLSearchParams({
              response_type: "code",
              client_id: CLIENT_ID,
              scope: SCOPES,
              code_challenge_method: "S256",
              code_challenge: codeChallenge,
              redirect_uri: REDIRECT_URI,
            }).toString();
            window.location.href = authUrl.toString();
          });

        //Some help from GPT
        const fetchToken = async () => {
          try {
            const response = await axios.post(
              "https://accounts.spotify.com/api/token",
              new URLSearchParams({
                client_id: ClientID,
                grant_type: 'authorization_code',
                code,
                redirect_uri: 'http://localhost:5173/',
                code_verifier: codeVerifier,
              }),
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
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
        <h3>{Token ? Token: "Getting the access token..."}</h3>
      );
}

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

const sha256 = (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

export default Code;


  
  


