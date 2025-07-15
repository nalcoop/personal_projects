// authentication for the user
// defining consts

const clientId= "fa0acd94761647509ab9492ef151726a";
const redirectUri= "http://[::1]:3000/callback";
const scopes =[
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "playlist-read-private"
];

export const authEndpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`; 