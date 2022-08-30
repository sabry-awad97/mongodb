import React, { FC, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IArtist } from "../../../database/models/artist.model";
import { useActions, useAppSelector } from "../../redux";
import { selectArtist } from "../../redux";

interface Props {}

const ArtistDetail: FC<Props> = () => {
  const params = useParams();
  const { findArtist, resetArtist, deleteArtist } = useActions();
  const navigate = useNavigate();

  const artist = useAppSelector(selectArtist) as IArtist & { _id: string };

  useEffect(() => void findArtist(params.id!), [params.id]);

  useEffect(() => () => void resetArtist(), []);

  if (!artist) {
    return <div>No Artists</div>;
  }

  const renderAlbums = () => {
    const { albums } = artist;

    if (!albums || !albums.map) {
      return;
    }

    return albums.map((album) => {
      return (
        <div className="card album" key={album.title}>
          <div className="card-image">
            <img src={album.image} />
            <span className="card-title">
              <h4>{album.title}</h4>
            </span>
          </div>
          <div className="card-content">
            <div>
              <h5>{album.copiesSold}</h5>
              <i>copies sold</i>
            </div>
            <div>
              <h5>{album.numberTracks}</h5>
              <i>tracks</i>
            </div>
          </div>
        </div>
      );
    });
  };

  const { age, genre, image, labelName, name, netWorth, yearsActive, _id } =
    artist;

  return (
    <div>
      <div className="spacer">
        <Link to="/">Back</Link>
        <Link to={`/artists/${_id}/edit`}>Edit</Link>
        <a
          onClick={() => {
            deleteArtist(params.id!);

            navigate("/");
          }}
        >
          Delete
        </a>
      </div>
      <ul className="collection artist-detail">
        <li className="collection-item header">
          <div>
            <h3>{name}</h3>
            <h5>Master of {genre}</h5>
          </div>
          <img src={image} className="right" />
        </li>
        <li className="collection-item">
          <h5>{yearsActive}</h5>
          <p>
            <i>Years Active</i>
          </p>
        </li>
        <li className="collection-item">
          <h5>{age}</h5>
          <p>
            <i>Years Old</i>
          </p>
        </li>
        <li className="collection-item">
          <h5>${netWorth}</h5>
          <p>
            <i>Net Worth</i>
          </p>
        </li>
        <li className="collection-item">
          <h5>{labelName}</h5>
          <p>
            <i>Label</i>
          </p>
        </li>
        <li className="flex wrap">{renderAlbums()}</li>
      </ul>
    </div>
  );
};

export default ArtistDetail;
