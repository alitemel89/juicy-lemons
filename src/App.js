import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";
import Hero from "./components/hero/Hero";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Feed from "./components/feed/Feed";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header currentUser />
        <Switch>
          <Route exact path="/" component={Hero} />
          <Route exact path="/about" component={About} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/feed" component={Feed} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
