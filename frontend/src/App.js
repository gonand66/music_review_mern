import React from "react";
import "./App.css";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AlbumScreen from "./screens/AlbumScreen"
import HomeScreen from "./screens/HomeScreen";
import AddScreen from "./screens/AddScreen"

export default function App() {
  return (
    <BrowserRouter>
    <div>
      <nav>
        <Link to="/" className="logo"><h1>GZONE</h1></Link>
        <div className="container">
        <Link to="/" className="logo"><h3>Home</h3></Link>
        <Link to="/add" className="logo"><h3>Add</h3></Link>
        </div>
      </nav>
      <main>
      <Route path="/albums/:id"  component={AlbumScreen} />
      <Route path="/" exact={true} component={HomeScreen} />
      <Route path="/add" exact={true} component={AddScreen} />
        
      </main>
    </div>
    </BrowserRouter>
  );
}

