import React, { useState, useEffect } from "react";
import axios from "axios";
import Media from "./Media";

const MediaList = ({ itunesAPI, search = "ed sheeran" }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getMediaBySearch();
  }, [search]);

  const getMediaBySearch = async () => {
    const res = await axios.get(itunesAPI, {
      params: {
        term: search,
        limit: 25
      }
    });
    const mediaResult = res.data.results;
    setMedias(mediaResult);
  };

  const resizePhotoURL = photoURL => {
    let resizeURL = photoURL.substring(0, photoURL.lastIndexOf("/"));
    const pixelSize = 500;
    resizeURL = resizeURL + `/${pixelSize}x${pixelSize}bb.jpg`;
    return resizeURL;
  };

  return (
    <div className="media-list">
      {medias.map(media => (
        <Media
          key={media.trackId}
          trackId={media.trackId}
          artistName={media.artistName}
          trackName={media.trackName}
          image100={resizePhotoURL(media.artworkUrl100)}
        ></Media>
      ))}
    </div>
  );
};

export default MediaList;
