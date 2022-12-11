import '../css/UserItem.css'
import user_icon from '../icons/user.png'
import PropTypes from "prop-types";

export function UserItem(props) {
  const {user_item} = props
  const {username, nickname} = user_item
  return (<div className={"user-item"}>
    <div className={"icon"}>
      <img src={user_icon} alt={""} onClick={() => {
        window.location = `/user_detail?id=${encodeURI(user_item.username)}`
      }}/>
    </div>
    <div className={"main"}>
      <div>
        <b className={"nickname"}>{nickname}</b>
      </div>
      <div>
        <span className={"username"}>@{username}</span>
      </div>
    </div>
  </div>)
}

UserItem.propTypes = {
  user_item: PropTypes.object
};
