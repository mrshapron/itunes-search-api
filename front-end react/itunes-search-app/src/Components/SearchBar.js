import React, { Component, useState } from "react";

const SearchBar = ({ onSearchSumbit }) => {
  const [search, setSearch] = useState("");

  const HandleSearchChange = e => {
    setSearch(e.target.value);
  };

  return (
    <form
      className="search-form"
      onSubmit={e => {
        e.preventDefault();
        onSearchSumbit(search);
      }}
    >
      <input
        className="search-bar"
        type="text"
        value={search}
        onChange={HandleSearchChange}
        placeholder="Search for your song, artist, movie etc.."
      />
      <button className="search-button" type="sumbit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
