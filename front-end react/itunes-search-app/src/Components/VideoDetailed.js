import React, { Component, useEffect } from "react";
import { Player } from "video-react";

const VideoDetailed = ({ previewUrl, movieName, image, artistName }) => {
  return (
    <div>
      <h1>{movieName}</h1>
      <h2>Director: {artistName}</h2>
      <link
        rel="stylesheet"
        href="https://video-react.github.io/assets/video-react.css"
      />
      <div className="video">
        <Player playsInLine src={previewUrl} poster={image} />
      </div>
    </div>
  );
};

export default VideoDetailed;
