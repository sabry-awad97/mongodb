import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import { selectErrorMessage, useActions, useAppSelector } from "../../redux";

interface IFormProps {
  name?: string;
  age?: string;
  yearsActive?: string;
  genre?: string;
}

const ArtistCreate: FC<InjectedFormProps<{}, IFormProps>> = ({
  handleSubmit,
}) => {
  const { clearError, createArtist } = useActions();
  const errorMessage = useAppSelector(selectErrorMessage);
  const navigate = useNavigate();

  const onSubmit = (formProps: IFormProps) => {
    createArtist({ navigate, ...formProps });
  };

  useEffect(() => {
    return () => {
      clearError();
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-field">
        <Field name="name" component="input" placeholder="Name" />
      </div>
      <div className="input-field">
        <Field name="age" component="input" placeholder="Age" />
      </div>
      <div className="input-field">
        <Field
          name="yearsActive"
          component="input"
          placeholder="Years Active"
        />
      </div>
      <div className="input-field">
        <Field name="genre" component="input" placeholder="Genre" />
      </div>
      <div className="has-error">{errorMessage}</div>
      <button className="btn">Submit</button>
    </form>
  );
};

export default reduxForm<{}, IFormProps>({
  form: "create",
})(ArtistCreate);
