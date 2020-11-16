import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Login from './Components/LoginPage';
import HomePage from './Components/HomePage';
import CommentOnThePost from './Components/CommantOnThePost';
import Logout from './Components/Logout';
import NewPost from './Components/NewPost';
import Profile from './Components/Profile';
import OtherPosts from './Components/OtherPosts';
import Registration from './Components/Registration';
import FeedBack from './Components/FeedBack';

const UserID = localStorage.getItem("userID");

const Authentication=()=>{
    if(UserID===null){
      
      return(<Switch>
                <Route exact path='/' component={Login}/>
                <Route  path="/Registration" component={Registration}/>
                <Route component={Login}/>
           </Switch>);
    }
    else{
        return(<Switch>
                <Route exact path="/home" component={HomePage}/>
                <Route  exact path="/home/NewPost" component={NewPost}/>
                <Route path="/CommentOnPost" component={CommentOnThePost}/>
                <Route exact path='/logout' component={Logout}/>
                <Route exact path="/home/ProfileOfUser" component={Profile} />
                <Route exact path="/home/OtherPost" component={OtherPosts} />
                <Route  path="/Feedback" component={FeedBack}/>
                <Route  component={HomePage}/>
            </Switch>);
    }
};

const MainFile=()=> {
    return (
        <div>
          
           <h1 align="center" className="Facebook">Facebook</h1>
           <Authentication/>
        </div>
    )
};
export default MainFile;
