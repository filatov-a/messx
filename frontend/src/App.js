import React, {useEffect} from "react";
import "./App.css"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import RegisterVerify from "./components/auth/registerVerify";
// import Home from "./components/home/home";
import Toolbar from "./components/toolbar/toolbar";
import NotFound from "./components/utils/notfound";
import Users from "./components/users/users";
import Posts from "./components/posts/posts";
import SpecUser from "./components/users/specUser";
import SpecUserInfo from "./components/users/specUserInfo";
import SpecPost from "./components/posts/specPost";
import FullName from "./components/users/fullname";
import Password from "./components/users/password";
import CreatePost from "./components/posts/createPost";
import PostsDay from "./components/posts/postsDay";
import UpdatePost from "./components/posts/updatePost";
import SpecCategory from "./components/categories/specCategory";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import config from "./config/config";
import {sendGetAllUsers, sendGetUser} from "./redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {parseToken} from "./utils/parseToken";
import {ws} from "./ws/main";
import * as r from "react";
import Chats from "./components/chats/chats";
import CreateChat from "./components/chats/createChat";
import SpecChat from "./components/chats/specChat";
import Home from "./components/home/home";
// import Categories from "./components/categories/categories";
// import CreateCategory from "./components/categories/createCategory";
// import CreateUser from "./components/users/createUser";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App(){
    const users = rr.useSelector(state => state.users);
    const [Ws, setWs] = r.useState(null);
    r.useEffect(()=>{
        if (users.token)
            setWs(ws({users}));
    }, [])
    return (
        <ThemeProvider theme={darkTheme}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<Toolbar/>}/>
                    </Routes>
                    <Routes>
                        {/*<RouteClient exact path="/createuser" element={CreateUser}/>*/}
                        <Route exact path="/create-post" element={<CreatePost/>}/>
                        <Route exact path="/create-chat" element={<CreateChat/>}/>
                        <Route exact path="/chats" element={<Chats/>}/>
                        <Route exact path="/chats/:id" element={<SpecChat ws={Ws}/>}/>
                        <Route exact path="/full-name" element={<FullName/>}/>
                        <Route exact path="/password" element={<Password/>}/>
                        <Route exact path="/users/:id/info" element={<SpecUserInfo ws={Ws}/>} />
                        <Route path="/users/:id" element={<SpecUser/>} />
                        <Route exact path="/posts/:id/answers" element={<SpecPost isAnswers={true}/>} />
                        <Route exact path="/posts/:id/questions" element={<SpecPost isQuestions={true}/>} />
                        <Route exact path="/posts-top" element={<PostsDay/>} />
                        <Route exact path="/posts/:id/update" element={<UpdatePost/>} />
                        <Route exact path="/posts-categories/:id" element={<SpecCategory/>} />
                        {/*<Route exact path="/categories" element={Categories} />*/}
                        <Route exact path="/search" element={<Users/>} />
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/register" element={<Register/>}/>
                        <Route exact path="/register-verify" element={<RegisterVerify/>}/>
                        <Route exact path="/posts" element={<Posts/>} />
                        <Route exact path="/" element={<Home/>} />
                        <Route exact path="/404" element={<NotFound/>} />
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
