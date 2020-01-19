import React, { Component, useState, useEffect } from "react";
import Axios from "axios";
import Media from "./Media";

const Topten = () => {
  const [top10, setTop10] = useState([]);
  const songsApi = `http://localhost:22142/api/songs`;
  const itunesLookUpApi = `https://itunes.apple.com/lookup?`;
  const top10req = `${songsApi}/top10`;
  useEffect(() => {
    getTop10();
  }, []);

  const fetchItem = async itunes_id => {
    const res = await Axios.get(itunesLookUpApi, {
      params: {
        id: itunes_id
      }
    });
    const itemResult = res.data.results;
    return itemResult[0];
  };

  const getTop10 = async () => {
    const res = await Axios.get(top10req);
    const top10 = res.data;

    const top10FullData = await Promise.all(
      top10.map(async ({ itunes_id, count_search }) => {
        const item = await fetchItem(itunes_id);
        return item;
      })
    );
    setTop10(top10FullData);
  };

  return (
    <div className="top-ten">
      <h4>
        This is Currenty the top 10 Videos/Songs most watched on this website
      </h4>
      <div className="media-list">
        {top10.map((item, index) => {
          return (
            <Media
              index={index + 1}
              key={item.trackId}
              trackId={item.trackId}
              artistName={item.artistName}
              trackName={item.trackName}
              image100={item.artworkUrl100}
            ></Media>
          );
        })}
      </div>
    </div>
  );
};

export default Topten;
