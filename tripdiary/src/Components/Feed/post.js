import React from 'react'; 
import './feed.css';

const Post = (props) => {
    return ( 
          <div class="card cardPost">
            <img src={props.url} class="card-img-top"/>

          <div class="card-body">
            <h5 class="card-title">{props.user}</h5>
            <p class="card-text">{props.comment}</p>
          </div>
         </div>

    );
}

export default Post; 
