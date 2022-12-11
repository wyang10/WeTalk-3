import {baseurl, getLoginUser} from "../config";
import {useEffect, useState} from "react";
import {TwitterItem} from "../components/TwitterItem";
import {ReplyItem} from "../components/ReplyItem";
import {post} from "../utils";

export function TwitterDetailPage(props) {

  function refresh() {
    post(`${baseurl}/get_twitter`, {twitter_id: id}).then(data => {
      setTwitter(data);
    })
    post(`${baseurl}/get_twitter_replies`, {twitter_id: id}).then(data => {
      setReplies(data);
    })
  }

  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")

  useEffect(() => {
    refresh()
  }, [])

  let [twitter, setTwitter] = useState({})
  let [replies, setReplies] = useState([])
  let [content, setContent] = useState('')


  return (
    <div>
      <TwitterItem twitter_item={twitter}/>
      <div className={"reply-box"}>
        <textarea className={"twitter-area"}
                  onChange={(e) => setContent(e.target.value)} value={content}></textarea>
        <button className={"twitter-postbtn"} onClick={
          async () => {
            if (content.length < 5) {
              alert("The minimum length of twitter is 5")
              return
            }
            await post(`${baseurl}/reply_twitter`, {username: getLoginUser(), content: content, twitter_id: id})
            refresh()
          }
        }>Reply
        </button>
      </div>
      <button className={"twitter-delbtn"} onClick={async () => {
        await post(`${baseurl}/del_twitter`, {twitter_id: id})
        window.location = '/home'
      }}>
        Delete this twitter
      </button>
      <div style={{height: "20px"}}></div>
      {replies.map((x, i) => <ReplyItem key={i} reply_item={x}/>)}
    </div>
  )
}

TwitterDetailPage.propTypes = {};
