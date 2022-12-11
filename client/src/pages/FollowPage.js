import '../css/FollowPage.css';

import {useEffect, useState} from "react";
import {baseurl} from "../config";
import {UserItem} from "../components/UserItem";
import PropTypes from "prop-types";
import {post} from "../utils";

export function FollowPage(props) {
  let {user_id} = props
  const queryParameters = new URLSearchParams(window.location.search)
  let id = queryParameters.get("id")
  if (id) {
    user_id = id
  }

  let [userList, setUserList] = useState([])
  let [isFollowing, setIsFollowing] = useState(true)

  function showFollowings() {
    console.log(user_id)
    post(`${baseurl}/list_followings`, {username: user_id}).then(data => {
      setUserList(data)
    })
    setIsFollowing(true)
  }

  function showFollowers() {
    console.log(user_id)
    post(`${baseurl}/list_followers`, {username: user_id}).then(data => {
      setUserList(data)
    })
    setIsFollowing(false)
  }

  useEffect(() => {
    showFollowings()
  }, [])

  return (<div>
    <div>
      <button className={"follower-btn1"} onClick={() => showFollowings()}>Followings</button>
      <button className={"follower-btn2"} onClick={() => showFollowers()}>Followers</button>
    </div>
    <div>
      {userList.map((x, idx) => <UserItem key={idx} user_item={x}></UserItem>)}
      {userList.length === 0 && isFollowing ? "No following" : ""}
      {userList.length === 0 && !isFollowing ? "No followers" : ""}
    </div>
  </div>)
}

FollowPage.propTypes = {
  user_id: PropTypes.string
};
