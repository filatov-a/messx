import React from "react";
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
import SepcUser from "./components/users/sepcUser";
import SepcUserInfo from "./components/users/sepcUserInfo";
import SpecPost from "./components/posts/specPost";
import Name from "./components/users/name";
import FullName from "./components/users/fullname";
import Password from "./components/users/password";
import Email from "./components/users/email";
import CreatePost from "./components/posts/createPost";
import PostsDay from "./components/posts/postsDay";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
// import Categories from "./components/categories/categories";
// import SpecCategory from "./components/categories/specCategory";
// import CreateCategory from "./components/categories/createCategory";
// import CreateUser from "./components/users/createUser";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App(){
  return (
      <ThemeProvider theme={darkTheme}>
            <div className="App">
              <BrowserRouter>
                  <Routes>
                      <Route path="*" element={<Toolbar/>}/>
                  </Routes>
                  <Routes>
                      {/*<RouteClient exact path="/createuser" element={CreateUser}/>*/}
                      <Route exact path="/createpost" element={<CreatePost/>}/>
                      {/*<RouteClient exact path="/createcategory" element={CreateCategory}/>*/}
                      <Route exact path="/name" element={<Name/>}/>
                      <Route exact path="/fullname" element={<FullName/>}/>
                      <Route exact path="/password" element={<Password/>}/>
                      <Route exact path="/email" element={<Email/>}/>
                      <Route exact path="/users/:id/info" element={<SepcUserInfo/>} />
                      <Route path="/users/:id" element={<SepcUser/>} />
                      <Route exact path="/posts/:id" element={<SpecPost/>} />
                      <Route exact path="/posts_top" element={<PostsDay/>} />
                      {/*<Route exact path="/categories/:id" element={SpecCategory} />*/}
                      {/*<Route exact path="/categories" element={Categories} />*/}
                      <Route exact path="/search" element={<Users/>} />
                      <Route exact path="/login" element={<Login/>}/>
                      <Route exact path="/register" element={<Register/>}/>
                      <Route exact path="/verify-email/:token" element={<RegisterVerify/>}/>
                      <Route exact path="/" element={<Posts/>} />
                      <Route exact path="/404" element={<NotFound/>} />
                      <Route path="*" element={<NotFound/>}/>
                  </Routes>
              </BrowserRouter>
          </div>
      </ThemeProvider>

  );
}

export default App;
