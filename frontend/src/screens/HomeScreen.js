import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import {Card,CardActionArea,CardContent,CardMedia} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

export default function HomeScreen(props) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAlbums = async () => {
    const res = await Axios.get("https://fierce-crag-02055.herokuapp.com"+"/api/albums");
    console.log(res.data.albums);
    setAlbums(res.data.albums);
    setLoading(false)
  };

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    (loading) ? <div>Loading...</div> : 
    <div>
      <ul className="albums">
        {albums.map((album) => (
          <li key={album.name} className="album">
            <Card style={{width:"20rem"}}>
              
              <CardActionArea >
              <Link to={"/albums/"+ album._id}> 
                <CardMedia
                  className="album-img"
                  image={album.image}
                  title="Contemplative Reptile"
                />
                </Link>
              </CardActionArea>
              
              <CardContent className="album-details">
                <h2>{album.name}</h2>
                <h3>{album.artist}</h3>
                <Rating className="rating"
                  name="rating"
                  precision={0.5} 
                  readOnly
                  value={album.total_rating / album.amount_review}
                />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
