import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import SongDetailed from "./SongDetailed";
import VideoDetailed from "./VideoDetailed";

const ItemDetail = ({ match }) => {
  const [item, setItem] = useState({});
  const itunesLookUpApi = `https://itunes.apple.com/lookup?`;
  const apiPost = `http://localhost:22142/api/songs`;
  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    const res = await axios.get(itunesLookUpApi, {
      params: {
        id: match.params.id
      }
    });
    const itemResult = res.data.results;
    setItem(itemResult[0]);
  };

  const resizePhoto = url => {
    const photoURL = url + "";
    let resizeURL = photoURL.substring(0, photoURL.lastIndexOf("/"));
    const pixelSize = 500;
    resizeURL = resizeURL + `/${pixelSize}x${pixelSize}bb.jpg`;
    return resizeURL;
  };

  return (
    <div className="item-detail">
      {item.kind == "song" ? (
        <SongDetailed
          className="item"
          trackName={item.trackName}
          artistName={item.artistName}
          artworkUrl100={resizePhoto(item.artworkUrl100)}
          collectionName={item.collectionName}
          previewUrl={item.previewUrl}
        />
      ) : (
        <VideoDetailed
          movieName={item.trackName}
          artistName={item.artistName}
          previewUrl={item.previewUrl}
          image={resizePhoto(item.artworkUrl100)}
        />
      )}
    </div>
  );
};

export default ItemDetail;
