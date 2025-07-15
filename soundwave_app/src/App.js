
import './App.css';

// react file 
// parse the access token
// author nalin cooper


import React, {useEffect, useState} from "react";
import { authEndpoint } from "./authentication";
import axios from "axios";

// function will parse through the users spotify information
function App(){
    const [token,setToken] = useState("");

    useEffect(() =>{
        const hash= window.location.hash;
        let _token = window.localStorage.getItem("spotify_token");

        if(!_token && hash){
            _token = hash
            .substring(1)
            .split("&")
            .find((elem)=> elem.startsWith("access_token"))
            .split("=")[1];

            window.location.hash="";
            window.localStorage.setItem("spotify_token", _token);
        }

        setToken(_token);
    }, []);

      // function will call the api after auth is verified
      const getTopTracks= async()=>{
      const res= await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers:{
          Authorization: `Bearer ${token}`},
      });
      // console to list the top tracks
      console.log(res.data.items); 
    };



    return (
        <div>
            {!token ? (
              <div>
                  <h1>Upload a Song or Login with Spoify</h1>
                    <canvas id='soundwaveCanvas' width={800} height={400}></canvas>
                    <br></br>
                  <a href={authEndpoint}>
                    <button>Login with Spotify</button>
                  </a>
                <br></br>
                    <input type='file' id='audioFile' accept='audio/*'></input>
                    {/* may need to rewrite the play and pause function */}
                    <button onClick={()=> play()}>Play</button>
                    <button onClick={() => pause() }>Pause</button>
                    </div>
  
            ) : (
            <div>
                <p>Logged in! Token: {token.substring(0,10)}... </p>
                <button onClick={getTopTracks}>Get My Top Tracks</button>
                </div>
            )}
        </div>
    );
}



export default App;
