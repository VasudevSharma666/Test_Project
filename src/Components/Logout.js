import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout=()=> {
     
    useEffect(()=>{
        var Feed = prompt("Enter your Express");

        if(Feed!==null&& Feed!==""){
            if(Feed.trim()!==""){
                fetch('http://localhost:3000/Feedback', {
                method: 'POST',
                body: JSON.stringify({
                userID: localStorage.getItem("email"),
                FeedBack : Feed.trim(),
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    },
                 })   
            }
            else{
                alert("nothing enter");
            };
        }
        localStorage.removeItem("userID");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("img");
        window.location.reload(false);
 },[])

 return (
    <div>
        <Redirect to="/"/>
    </div>
)};
export default Logout;
