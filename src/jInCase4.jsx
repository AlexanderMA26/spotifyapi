import React, { useState, useEffect } from "react";
import axios from "axios";

const clientID = "edc358a22e8f45749a710d543b0da712";
const redirectURL = "http://127.0.0.1:5500/callback";
const SCOPES = "user-read-private user-read-email"; 

const Code = () => {
  const [token, setToken] = useState(null);
  const [authCode, setauthCode] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log("Hello")

    if (!code) {
      const codeVerifier = generateRandomString(64);
      generateCodeChallenge(codeVerifier).then((codeChallenge) => {
        localStorage.setItem("code_verifier", codeVerifier);
        const authUrl = new URL("https://accounts.spotify.com/authorize");
        authUrl.search = new URLSearchParams({
          response_type: "code",
          client_id: clientID,
          scope: SCOPES,
          code_challenge_method: "S256",
          code_challenge: codeChallenge,
          redirect_uri: redirectURL,
        }).toString();
        window.location.href = authUrl.toString();
      });
    } else {
        setauthCode(code);
      const fetchToken = async () => {
        const codeVerifier = localStorage.getItem("code_verifier");
        try {
          const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
              client_id: clientID,
              grant_type: "authorization_code",
              code,
              redirect_uri: redirectURL,
              code_verifier: codeVerifier,
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          setToken(response.data.access_token);
        } catch (error) {
          console.error("Error fetching access token", error);
        }
      };
      fetchToken();
    }
  }, []);
  console.log(authCode);

  return <h3>{token ? token : "Getting the access token..."}</h3>;
};

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const generateCodeChallenge = async (codeVerifier) => {
  const hashed = await sha256(codeVerifier);
  return base64encode(hashed);
};

export default Code;
