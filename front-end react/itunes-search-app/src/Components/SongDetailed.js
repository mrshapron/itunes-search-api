import React, { Component } from "react";
import ResponsivePlayer from "./ResponsivePlayer";

const SongDetailed = ({
  trackName,
  artistName,
  artworkUrl100,
  collectionName,
  previewUrl
}) => {
  return (
    <div>
      <h1>{trackName}</h1>
      <h3>{artistName}</h3>
      <img src={artworkUrl100} />
      <p>{`Album : ${collectionName}`}</p>
      <ResponsivePlayer url={previewUrl} />
    </div>
  );
};

export default SongDetailed;
