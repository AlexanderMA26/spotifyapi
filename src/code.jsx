import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const code=()=>{
    const [Token, setToken] = useState(' ')
    const ClientID = "edc358a22e8f45749a710d543b0da712";
    const CLIENT_SECRET = "f238b6801c1643e692783794d24945a7";
    const codeVerifier  = generateRandomString(64);
    const codeChallenge = base64encode(hashed);
    UserAuth(ClientID, codeVerifier, codeChallenge);
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    getToken();
    useEffect(()=>{

        //Some help from GPT
        const fetchToken = async () => {
          const codeVerifier = localStorage.getItem('code_verifier');
          
      
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

const sha256 = async (plain) => {
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
const hashed = await sha256(codeVerifier);

const UserAuth = (CID, CV, CC) => {
    const clientId = CID;
    const redirectUri = 'http://localhost:5173/';
    
    const scope = 'user-read-private user-read-email';
    const authUrl = new URL("https://accounts.spotify.com/authorize")
    
    // generated in the previous step
    window.localStorage.setItem('code_verifier', CV);
    
    const params =  {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: CC,
      redirect_uri: redirectUri,
    }
    
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();    
}
const getToken = async code => {

    // stored in the previous step
    const codeVerifier = localStorage.getItem('code_verifier');
  
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    }
  
    const body = await fetch(url, payload);
    const response = await body.json();
  
    localStorage.setItem('access_token', response.access_token);
  }
const [Token, setToken] = useState(' ')


  
  


