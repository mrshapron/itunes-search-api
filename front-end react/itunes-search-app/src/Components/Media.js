import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Media = ({ trackId, artistName, trackName, image100, index = 0 }) => {
  const apiPost = "http://localhost:22142/api/songs";
  const HandleOnClick = () => {
    updateServer();
  };
  const updateServer = async () => {
    const res = await Axios({
      method: "get",
      url: `${apiPost}/${trackId}`
    });
  };

  return (
    <Link to={`search/${trackId}`} onClick={HandleOnClick}>
      <div id={`top${index}`} className="media">
        <img src={image100} />
        <h1>{artistName}</h1>
        <p>{trackName}</p>
      </div>
    </Link>
  );
};

export default Media;
