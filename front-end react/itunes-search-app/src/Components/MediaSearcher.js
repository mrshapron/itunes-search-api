import React, { Component, useState } from "react";
import SearchBar from "./SearchBar";
import MediaList from "./MediaList";
const MediaSearcher = () => {
  const itunesAPI = `https://itunes.apple.com/search?`;
  const [query, setQuery] = useState("");

  const sumbitSearch = search => {
    setQuery(search);
  };
  return (
    <div className="media-searcher">
      <SearchBar onSearchSumbit={sumbitSearch} />
      <MediaList itunesAPI={itunesAPI} search={query || undefined} />
    </div>
  );
};

export default MediaSearcher;
