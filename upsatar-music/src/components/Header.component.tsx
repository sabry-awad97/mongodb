import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [id, setId] = useState("");

  useEffect(() => {
    setLink();
  }, []);

  const setLink = () => {
    window.Artist.find({})
      .limit(100)
      .then((artists) => {
        const artist = artists[~~(Math.random() * artists.length)];
        if (artist) {
          setId(artist._id.toString());
        }
      });
  };

  return (
    <div className="row">
      <nav>
        <div className="nav-wrapper">
          <div className="col s12">
            <a href="#" className="brand-logo">
              UpStar Music
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to={`/artists/${id}`} onClick={setLink}>
                  Random Artist
                </Link>
              </li>
              <li>
                <Link to={"/artists/new"}>Create Artist</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
