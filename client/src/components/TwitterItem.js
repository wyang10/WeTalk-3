import '../css/TwitterItem.css'
import user_icon from '../icons/user.png'
import dislike_icon from '../icons/dislike.png'
import like_icon from '../icons/like.png'
import message_icon from '../icons/message.png'
import {baseurl} from "../config";
import {useEffect,useState} from "react";
import PropTypes from "prop-types";
import {post} from "../utils";


export function TwitterItem(props) {
  const {twitter_item} = props
  let {
    _id, username, nickname, date, content, replycount, likes, dislikes
  } = twitter_item
  
  let [_likes, setLikes] = useState(likes)
  let [_dislikes, setDislikes] = useState(dislikes)
  
  useEffect(()=>{
	setLikes(likes);
  },[likes])

  useEffect(()=>{
	setDislikes(dislikes);
  },[dislikes])
  
  useEffect(()=>{
	setLikes(_likes);
  },[_likes])

  useEffect(()=>{
	setDislikes(_dislikes);
  },[_dislikes])

  return (<div className={"twitter-item"}>
    <div className={"icon"}>
      <img src={user_icon} alt={""} onClick={() => {
        window.location = `/user_detail?id=${encodeURI(username)}`
      }}/>
    </div>
    <div className={"main"}>
      <div>
        <b className={"nickname"}>{nickname}</b>
        <span className={"username"}>@{username}</span>
        <span className={"date"}>{date}</span>
      </div>
      <div className={"content"}>
        {content}
      </div>
      <div>
        <span className={"reply-icon"}>
          <img src={message_icon} alt="" onClick={() => {
            window.location = `/detail?id=${_id}`
          }}/>
        </span>
        <span className={"reply-count"}>{replycount}</span>
        <span className={"likes-icon"}>
          <img src={like_icon} alt="" onClick={async () => {
            await post(`${baseurl}/like_twitter`, {twitter_id: _id})
            _likes++;
            setLikes(_likes);
          }}/>
        </span>
        <span className={"likes-count"}>{_likes}</span>
        <span className={"dislikes-icon"}>
          <img src={dislike_icon} alt="" onClick={async () => {
            await post(`${baseurl}/dislike_twitter`, {twitter_id: _id})
            _dislikes++;
            setDislikes(_dislikes);
          }}/>
        </span>
        <span className={"dislikes-count"}>{_dislikes}</span>
      </div>
    </div>
  </div>)
}

TwitterItem.propTypes = {
  twitter_item: PropTypes.object
};

