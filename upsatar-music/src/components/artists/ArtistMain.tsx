import React from "react";
import ArtistFilter from "./ArtistFilter";
import ArtistIndex from "./ArtistIndex";

const ArtistMain = () => {
  return (
    <div className="row">
      <div className="col s4">
        <ArtistFilter />
      </div>
      <div className="col s8">
        <ArtistIndex />
      </div>
    </div>
  );
};

export default ArtistMain;
