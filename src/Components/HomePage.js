import React, { useReducer,useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ReactBoot from 'reactstrap';
import  "./Form.css";

var commt="";
const  initialState={
 name : "",
 posts: [],
 gotocomment : false,
 PostsLen : false
};
const reducer=(state,action)=>{
switch(action.type){
   case "name":{
       return{...state,name : action.value};
   }
   case "posts":{
       return{...state,posts : action.value};
   }
   case "PostsLen":{
       return{...state,PostsLen : action.value};
   }
   default:{
      return{...state};
   }
}
}
const HomePage=()=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    const userID = localStorage.getItem("userID");

    useEffect(() => {
        dispatch({type : "name", value : localStorage.getItem("name")});
        
        fetch('http://localhost:3000/posts?userId='+userID)
        .then((response) => response.json())
        .then((json) => dispatch({type : "posts" ,value : json }))
        }, [userID])
 
   const DeletedThePost=(e)=>{  
       fetch('http://localhost:3000/posts/'+e.target.id, {
            method: 'DELETE',
        })
        
        fetch('http://localhost:3000/comments?postId='+e.target.id, {
            method: 'DELETE',
                  })
             window.location.reload(false);
        }

   const ShowTheData  =()=>{ 
     return(<React.Fragment>
        {
            state.posts.map(post=>
            <div  key={post.id}>
                <div    className="PostsTag" >
                    <p hidden>{commt ="/CommentOnPost/"+post.id}</p>
                    <h3> <span>-:Title:-</span> <br/> {post.title}</h3> 
                    <h3> <span>-:Body:-</span> <br/> {post.body}</h3> 
                    <Link id={post.id} to={commt} className="LinkToComment" >See The Comment</Link>
                    <input type="image" id={post.id} onClick={e=>DeletedThePost(e)}  src="https://www.flaticon.com/svg/static/icons/svg/3159/3159662.svg" width="20" height="30" alt="Delete"/>
                </div>
                <br/>
            </div>
                )
        }
        
        </React.Fragment>);
   }
  const NullPosts=()=>{
      setTimeout(()=>{dispatch({type : "PostsLen",value : true})},3000);
      if(state.PostsLen){
          return(<div className="NoPosts"> No Posts available</div>);
      }else{
          return(<ReactBoot.Spinner />);
      }
  }
  return (
        <React.Fragment  >
           <div className="HomePageBackground">
                <ReactBoot.Navbar className="Navbar" style={{ backgroundColor  : "white" ,border : "2px solid gray"}}  >
                     <h2 className="NameOfPerson">Mr.{state.name} </h2> 
                    <Link to="/logout" align="right ">Logout</Link>
                </ReactBoot.Navbar >
                <div className="OtherLink">
                    <Link to="/home/ProfileOfUser">Profile</Link>
                    <hr/>
                    <Link to="/home/NewPost">New Post</Link>
                    <hr/>
                    <Link to="/home/OtherPost">See Other Post</Link>
                    <hr/>
                    <Link to="/Feedback">Feedback</Link>
                    <hr/>
                </div>
                <div className="StartPoint">{state.posts.length>0 ? <ShowTheData/>:<NullPosts />}</div>
         </div>
        </React.Fragment>
    );
};
export default HomePage;