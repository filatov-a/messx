import React from "react";
import "./App.css"
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import RegisterVerify from "./components/auth/registerVerify";
import Home from "./components/home/home";
import Toolbar from "./components/toolbar/toolbar";
import NotFound from "./components/extra/notfound";
import Users from "./components/users/users";
import Posts from "./components/posts/posts";
import UserAcc from "./components/users/userAcc";
import SpecPost from "./components/posts/specPost";
import Name from "./components/users/name";
import FullName from "./components/users/fullname";
import Password from "./components/users/password";
import Email from "./components/users/email";
import Phone from "./components/users/phone";
import Card from "./components/users/card";
import CreatePost from "./components/posts/createPost";
import Categories from "./components/categories/categories";
import SpecCategory from "./components/categories/specCategory";
import CreateCategory from "./components/categories/createCategory";
import CreateUser from "./components/users/createUser";
import Cost from "./components/cost/cost";
import Bed from "./components/cost/bed";
import Room1 from "./components/cost/room1";
import Room2 from "./components/cost/room2";
import Map from "./components/map/map";
import Contacts from "./components/contacts/contacts";

import {RouteGuest} from "./components/extra/route";
import {RouteClient} from "./components/extra/route";

function App(){
  return (
    <Router>
        <div className="App">
            <Toolbar/>
            <Switch>
                <RouteClient exact path="/createuser" component={CreateUser}/>
                <RouteClient exact path="/createpost" component={CreatePost}/>
                <RouteClient exact path="/createcategory" component={CreateCategory}/>
                <RouteClient exact path="/name" component={Name}/>
                <RouteClient exact path="/fullname" component={FullName}/>
                <RouteClient exact path="/password" component={Password}/>
                <RouteClient exact path="/email" component={Email}/>
                <RouteClient exact path="/phone" component={Phone}/>
                <RouteClient exact path="/card" component={Card}/>
                <RouteGuest exact path="/login" component={Login}/>
                <RouteGuest exact path="/register" component={Register}/>
                <RouteGuest exact path="/register/verify-email/:token" component={RegisterVerify}/>
                <Route exact path="/users/:id" component={UserAcc} />
                <Route exact path="/posts/:id" component={SpecPost} />
                <Route exact path="/categories/:id" component={SpecCategory} />
                <Route exact path="/categories" component={Categories} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/cost" component={Cost} />
                <Route exact path="/bed" component={Bed} />
                <Route exact path="/room1" component={Room1} />
                <Route exact path="/room2" component={Room2} />
                <Route exact path="/map" component={Map} />
                <Route exact path="/contacts" component={Contacts} />
                <Route exact path="/" component={Home} />
                <Route exact path="/404" component={NotFound} />
                <Redirect to='/404'/>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
