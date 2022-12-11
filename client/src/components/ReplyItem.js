import '../css/TwitterItem.css'
import user_icon from '../icons/user.png'
import PropTypes from "prop-types";

export function ReplyItem(props) {
  const {reply_item} = props
  const {username, nickname, date, content} = reply_item
  return (<div className={"twitter-item"} style={{marginLeft: "20px"}}>
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
    </div>
  </div>)
}

ReplyItem.propTypes = {
  reply_item: PropTypes.object
};


