import React, { useEffect, useState } from "react";
import Axios from "axios";
import Rating from "@material-ui/lab/Rating";
import { Box, Button } from "@material-ui/core";

export default function AlbumScreen(props) {
  const [album, setAlbum] = useState({});
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const getAlbum = async () => {
    console.log(props.match.params.id);
    const res = await Axios.get("https://fierce-crag-02055.herokuapp.com"+"/api/albums/" + props.match.params.id);
    console.log(res.data[0]);
    setAlbum(res.data[0]);
    setLoading(false)
  };
  useEffect(() => {
    getAlbum();   
  }, []);


  const review = async(e)=>{

    const body = await JSON.stringify({
        total_rating : album.total_rating + value ,
        amount_review : album.amount_review + 1
      });
      const res = await Axios.put("https://fierce-crag-02055.herokuapp.com"+"/api/albums/" + props.match.params.id, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setValue(0)
      getAlbum()
      alert("thank you yeah")
  }

  return (
    (loading) ? <div>Loading...</div> : 
    <div className="content">
      <img src={album.image} alt={album.name} />
      <div className="detail">
        <h2>Album : {album.name}</h2>
        <div className="detail-rating">
          <Rating
            className="rating"
            name="rating"
            precision={0.5}
            size="large"
            readOnly
            value={album.total_rating / album.amount_review}
          />
          &nbsp; {album.amount_review} reviews
        </div>
        <h3>Artist : {album.artist}</h3>
        <h3>Country : {album.country}</h3>
            
        <Box className="review-box">
          <Rating
            className="rating"
            name="rating"
            precision={0.5}
            size="large"
            value={value}
            onChange={(e, newValue) => {
              setValue(newValue);
            }}
          />
          &nbsp;&nbsp;
          <Button variant="outlined" style={{ color: "#F27405" }} onClick={review}>
            <h4>Review</h4>
          </Button>
        </Box>
      </div>

    </div>
  );
}
