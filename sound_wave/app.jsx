// react file 
// parse the access token

import React, {useEffect, useState} from "react";
import { authEndpoint } from "./authentication";
import axios from "axious";

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
                    <button>Login with Spotify</button>
                </a>
            ) : (
                <p>Logged in! Token: {token.substring(0,10)}... </p>
            )}
        </div>
    );
}