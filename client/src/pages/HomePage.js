import '../css/HomePage.css';
import {useEffect, useState} from "react";
import {baseurl, getLoginUser} from "../config";
import {TwitterItem} from "../components/TwitterItem";
import PropTypes from "prop-types";
import {post} from "../utils";


export function HomePage(props) {
  let {user_id} = props
  if (user_id === undefined || user_id === null) {
    const queryParameters = new URLSearchParams(window.location.search)
    user_id = queryParameters.get("id")
  }

  let [twitterList, setTwitterList] = useState([])
  let [content, setContent] = useState("")
  let [isFollowed, setFollowed] = useState(false)

  function refresh() {
    post(`${baseurl}/list_twitters`, {username: user_id}).then(data => {
      setTwitterList(data)
    })
    post(`${baseurl}/is_followed`, {from: getLoginUser(), to: user_id}).then(data => {
      setFollowed(data.result)
    })
  }

  useEffect(() => {
    refresh()
  }, [])


  let toolbox = (<div className={"reply-box"} style={{marginBottom: "10px"}}>
        <textarea className={"twitter-area"}
                  onChange={(e) => setContent(e.target.value)} value={content}></textarea>
      <button className={"twitter-postbtn"} onClick={async () => {
        if (content.length < 5) {
          alert("The minimum length of twitter is 5")
          return
        }
        await post(`${baseurl}/post_twitter`, {username: user_id, content: content})
        refresh()
        setContent("")
      }}>Post a twitter
      </button>
    </div>
  )

  return (
    <div>
      <div>
        <h2 style={{
          margin: "20px 10px",
          display: "inline-block",
        }}>{getLoginUser() === user_id ? "My Home Page" : `@${user_id} 's Home Page`}</h2>
        <button className={isFollowed ? "follow-btn-small1" : "follow-btn-small2"} onClick={async () => {
          if (!isFollowed) {
            await post(`${baseurl}/follow`, {from: getLoginUser(), to: user_id})
          } else {
            await post(`${baseurl}/unfollow`, {from: getLoginUser(), to: user_id})
          }
          refresh()
        }}>{!isFollowed ? "Follow" : "UnFollow"}</button>
      </div>
      {getLoginUser() === user_id ? toolbox : <div></div>}
      <button className={"follower-btn"} onClick={() => {
        window.location = `/following?id=${user_id}`
      }}>Following/Followers
      </button>
      {twitterList.map((x, idx) => <TwitterItem key={x._id} twitter_item={x}></TwitterItem>)}
    </div>
  )
}

HomePage.propTypes = {
  user_id: PropTypes.string
};
