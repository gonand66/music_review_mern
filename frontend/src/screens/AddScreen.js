import React from "react";
import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import Axios from "axios";

export default function AddScreen() {
  const [name, setName] = useState("")
  const [artist, setArtist] = useState("")
  const [country, setCountry] = useState("")
  const [image, setImage] = useState("")
  const [message, setMessage] = useState("")


  const submit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      name: name,
      artist: artist,
      image: image,
      country: country,
    });
    const res = await Axios.post("https://fierce-crag-02055.herokuapp.com"+"/api/add", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    setImage("")
    setName("")
    setCountry("")
    setArtist("")
    setMessage(res.data.message)
    document.getElementById("form1").reset();
    alert(message)
  };

  return (
    <div className="add">
      <form onSubmit={submit} id="form1">
        <h1>Add New Album</h1>
        <TextField
          className="input"
          label="Album's Name"
          variant="outlined"
          required
          onChange={(e) => {setName(e.target.value)}}
        />
        <TextField
          className="input"
          label="Artist"
          variant="outlined"
          required
          onChange={(e) => {setArtist(e.target.value)}}
        />
        <TextField
          className="input"
          label="Country"
          variant="outlined"
          required
          onChange={(e) => {setCountry(e.target.value)}}
        />
        <TextField
          className="input"
          label="Image Url"
          variant="outlined"
          required
          onChange={(e) => {setImage(e.target.value)}}
        />
        <Button type="submit" variant="outlined" style={{color:"#1d1c1"}}><h3>Add</h3></Button>
      </form>
    </div>
  );
}
