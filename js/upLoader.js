const file = document.getElementById("upLoader")
const img = document.getElementById("imgurImg")
const imgURL = document.getElementById("url")
let array = []

//For public read-only and anonymous resources, such as getting image info, looking up user comments, etc. 
//all you need to do is send an authorization header with your client_id in your requests.  Authorization: Client-ID YOUR_CLIENT_ID
//Client ID: 0e95e513f32844d
//Client secret: d7e2ab914ac36ce62d8e306b2bc4c17029b45a23