import './App.css';
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import {getLoginUser, setLoginUser} from "./config";
import {HomePage} from "./pages/HomePage";
import {RegisterPage} from "./pages/RegisterPage";
import {TwitterDetailPage} from "./pages/TwitterDetailPage";
import {UsersPage} from "./pages/UsersPage";
import {FollowPage} from "./pages/FollowPage";
import {LoginPage} from "./pages/LoginPage";


function App() {
  return (<div className="App">
    <Router>
      <div className={"navbar"}>
        <div className={"inner"}>
          <div className={"nav-item"}>
            <b>WeTalk</b>
          </div>
          {(getLoginUser() == null || getLoginUser() === "") ? "" : (
            <>
              <div className={"nav-item"}>
                <a href="/home">Home</a>
              </div>
              <div className={"nav-item"}>
                <a href="/users">Users</a>
              </div>
              <div className={"nav-item"}>
                <a href="/following">Following/Followers</a>
              </div>
              <div className={"right"}>
                <div className={"nav-item"}>
                  <a href="#" onClick={() => {
                    setLoginUser("");
                    window.location = "/"
                  }}>Logout</a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={"container"}>
        <Routes>
          <Route exact path='/' element={<LoginPage key={1}/>}></Route>
          <Route exact path='/home' element={<HomePage key={1} user_id={getLoginUser()}/>}></Route>
          <Route exact path='/users' element={<UsersPage key={1}/>}></Route>
          <Route exact path='/following' element={<FollowPage key={1} user_id={getLoginUser()}/>}></Route>
          <Route exact path='/register' element={<RegisterPage key={1}/>}></Route>
          <Route exact path='/user_detail' element={<HomePage></HomePage>}></Route>
          <Route path='/detail' element={<TwitterDetailPage/>}></Route>
        </Routes>
      </div>
    </Router>
  </div>);
}

export default App;
