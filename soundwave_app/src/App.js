
import './App.css';

// react file 
// parse the access token
// author nalin cooper


import React, {useEffect, useState} from "react";
import { authEndpoint } from "./authentication";


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

    return (
        <div>
            {!token ? (
                <a href={authEndpoint}>
                    <h1>Upload a Song or Login with Spoify</h1>
                    <canvas id='soundwaveCanvas' width={800} height={400}></canvas>
                    <br></br>
                    <button>Login with Spotify</button>
                    <input type='file' id='audioFile' accept='audio/*'></input>
                    <button onClick={"play()"}>Play</button>
                    <button onClick={"pause()"}>Pause</button>
                </a>
            ) : (
                <p>Logged in! Token: {token.substring(0,10)}... </p>
            )}
        </div>
    );
}


export default App;
