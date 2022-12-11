import "../css/LoginPage.css"
import {useEffect, useState} from "react";
import {baseurl, getLoginUser, setLoginUser} from "../config";
import {post} from "../utils";

// import {post} from "../utils";

export function LoginPage(props) {

  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")

  useEffect(() => {
    setLoginUser("")
  }, [])

  return (<div>
    <div>
      <h2>Login</h2>
    </div>
    <div className={"field"}>
      <span>Username: </span>
      <input type={"text"} value={username} onChange={e => setUsername(e.target.value)}/>
    </div>
    <div className={"field"}>
      <span>Password: </span>
      <input type={"password"} value={password} onChange={e => setPassword(e.target.value)}/>
    </div>
    <div>
      <button className={"btn-ok"} onClick={async () => {
        let r = await post(`${baseurl}/login`, {username, password})
        if (r.success) {
          setLoginUser(username)
          console.log(getLoginUser())
          window.location = '/home'
        } else {
          alert("Error username or password")
          window.location = '/'
        }
      }}>Login
      </button>
      <button className={"btn-cancel"} onClick={() => {
        window.location = "/register"
      }}>Register
      </button>
    </div>
  </div>)
}

LoginPage.propTypes = {};
