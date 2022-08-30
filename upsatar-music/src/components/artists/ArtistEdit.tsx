import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IArtist } from "../../../database/models/artist.model";
import {
  selectArtist,
  selectErrorMessage,
  useActions,
  useAppSelector,
} from "../../redux";

interface IArtistState {
  name: string;
  age: number;
  yearsActive: number;
  genre: string;
}

const ArtistEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { findArtist, clearError, editArtist } = useActions();

  const [state, setState] = useReducer(
    (state: IArtistState, newState: Partial<IArtistState>): IArtistState => ({
      ...state,
      ...newState,
    }),
    {
      name: "",
      genre: "",
      age: 0,
      yearsActive: 0,
    }
  );

  const artist = useAppSelector(selectArtist) as IArtist & { _id: string };
  const errorMessage = useAppSelector(selectErrorMessage);

  useEffect(() => {
    findArtist(params.id!);
  }, [params.id]);

  useEffect(() => {
    if (artist) {
      const { name, age, yearsActive, genre } = artist;
      setState({ name, age, yearsActive, genre });
    }
  }, [artist]);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { age, yearsActive, genre, name } = state;
    editArtist({
      id: params.id!,
      name,
      genre,
      age: age.toString(),
      yearsActive: yearsActive.toString(),
    });
    navigate(`/artists/${params.id}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="input-field">
        <input
          value={state.name}
          onChange={(e) => setState({ name: e.target.value })}
          placeholder="Name"
        />
      </div>
      <div className="input-field">
        <input
          value={state.age}
          onChange={(e) => setState({ age: +e.target.value })}
          placeholder="Age"
        />
      </div>
      <div className="input-field">
        <input
          value={state.yearsActive}
          onChange={(e) => setState({ yearsActive: +e.target.value })}
          placeholder="Years Active"
        />
      </div>
      <div className="input-field">
        <input
          value={state.genre}
          onChange={(e) => setState({ genre: e.target.value })}
          placeholder="Genre"
        />
      </div>
      <div className="has-error">{errorMessage}</div>
      <button className="btn">Submit</button>
    </form>
  );
};

export default ArtistEdit;
