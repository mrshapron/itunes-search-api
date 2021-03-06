import React, { Component } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const ResponsivePlayer = ({ url }) => {
  return (
    <div>
      <link rel="stylesheet" href="react-h5-audio-player/lib/styles.less" />
        <AudioPlayer
          width="300px"
          autoPlay
          src={url}
          onPlay={e => console.log("playing")}
        />
    </div>
  );
};
export default ResponsivePlayer;
