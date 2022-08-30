import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import { IArtist } from "../../../database/models/artist.model";
import {
  selectArtists,
  selectSelection,
  useActions,
  useAppSelector,
} from "../../redux";
import Paginator from "./Paginator";

const ArtistIndex = () => {
  const artists = useAppSelector(selectArtists);
  const selection = useAppSelector(selectSelection);

  const { selectArtist, deselectArtist, setRetired, setNotRetired } =
    useActions();

  const onChange = (_id: string) => {
    if (_.includes(selection, _id)) {
      deselectArtist(_id);
    } else {
      selectArtist(_id);
    }
  };

  const renderList = (artist: IArtist) => {
    const { _id } = artist as IArtist & { _id: string };
    const classes = `collection-item avatar ${artist.retired && "retired"}`;

    return (
      <li className={classes} key={_id}>
        <div>
          <input
            id={_id}
            type="checkbox"
            checked={_.includes(selection, _id)}
            onChange={() => onChange(_id)}
          />
          <label htmlFor={_id} />
        </div>
        <img src={artist.image} className="circle" />
        <div>
          <span className="title">
            <strong>{artist.name}</strong>
          </span>
          <p>
            <b>{artist.age}</b> years old
            <br />
            {artist.albums ? artist.albums.length : 0} albums released
          </p>
        </div>
        <Link to={`artists/${_id}`} className="secondary-content">
          <i className="material-icons">play_arrow</i>
        </Link>
      </li>
    );
  };

  const renderPaginator = () => {
    if (artists.all.length) {
      return <Paginator />;
    }
  };

  const renderEmptyCollection = () => {
    if (artists.all.length) {
      return;
    }

    return (
      <div className="center-align">
        <h5>No records found!</h5>
        <div>Try searching again</div>
      </div>
    );
  };

  const renderRetire = () => {
    if (selection.length) {
      return (
        <div>
          <button className="btn" onClick={() => setRetired(selection)}>
            Retire
          </button>
          <button className="btn" onClick={() => setNotRetired(selection)}>
            Unretire
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      {renderRetire()}
      <ul className="collection">
        {artists.all.map(renderList)}
        {renderEmptyCollection()}
      </ul>

      {renderPaginator()}
    </div>
  );
};

export default ArtistIndex;
