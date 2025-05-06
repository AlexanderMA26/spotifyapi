import React from "react";
import axios from "axios";
import{useEffect, useState} from 'react';
import Code from "./code";
 

const Spotify = () =>{

    function getRandomSearch() {
        //from https://perryjanssen.medium.com/getting-random-tracks-using-the-spotify-api-61889b0c0c27
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        
        const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
        let randomSearch = '';
      
        
        switch (Math.round(Math.random())) {
          case 0:
            randomSearch = randomCharacter + '%';
            break;
          case 1:
            randomSearch = '%' + randomCharacter + '%';
            break;
        }
      
        return randomSearch;
      }

      

}