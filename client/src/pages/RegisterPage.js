import "../css/RegisterPage.css"
import {baseurl, setLoginUser} from "../config";
import {useEffect, useState} from "react";
import {post} from "../utils";

export function RegisterPage(props) {

  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")
  let [confirm, setConfirm] = useState("")
  let [nickname, setNickname] = useState("")

  useEffect(() => {
    setLoginUser("");
  }, [])

  return (<div>
      <div>
        <h2>Register</h2>
      </div>

      <div className={"field"}>
        <span>Username: </span>
        <input type={"text"} value={username} onChange={e => setUsername(e.target.value)}/>
      </div>
      <div className={"field"}>
        <span>Nickname: </span>
        <input type={"text"} value={nickname} onChange={e => setNickname(e.target.value)}/>
      </div>
      <div className={"field"}>
        <span>Password: </span>
        <input type={"password"} value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      <div className={"field"}>
        <span>Confirm: </span>
        <input type={"password"} value={confirm} onChange={e => setConfirm(e.target.value)}/>
      </div>
      <div>
        <button className={"btn-ok"} onClick={async () => {
          if (password.length > 0) {
            if (confirm == password) {
              let r = await post(`${baseurl}/register`, {username, password, nickname})
              if (r.success) {
                setLoginUser(username)
                window.location = '/'
              } else {
                alert(r.error)
                window.location = '/register'
              }
            } else {
              alert("Password and confirm should be the same")
            }
          } else {
            alert("Password should not be empty")
          }
        }}>OK
        </button>
        <button className={"btn-cancel"} onClick={() => {
          window.location = "/"
        }}>Cancel
        </button>
      </div>
    </div>

  )
}

RegisterPage.propTypes = {};
