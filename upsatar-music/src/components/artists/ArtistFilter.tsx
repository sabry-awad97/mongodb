import React, { FC, useEffect } from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import {
  selectAgeRange,
  selectYearsActiveRange,
  useActions,
  useAppSelector,
} from "../../redux";
import { selectFilters } from "../../redux/form/form.selectors";
import { Range } from "../filters/ReduxRange";

const TEXT_FIELDS = [{ label: "Name", prop: "name" }];

interface IRange {
  min: number;
  max: number;
}

interface IFormProps {
  age?: IRange;
  yearsActive?: IRange;
  sort?: string;
}

const ArtistFilter: FC<InjectedFormProps<{}, IFormProps>> = ({
  handleSubmit,
}) => {
  const filters = useAppSelector(selectFilters);
  const ageRange = useAppSelector(selectAgeRange);
  const yearsActiveRange = useAppSelector(selectYearsActiveRange);

  const { searchArtists, setAgeRange, setYearsActiveRange } = useActions();

  useEffect(() => {
    if (filters) {
      searchArtists({
        name: "",
        sort: "",
        ...filters,
      });
    } else {
      searchArtists({
        name: "",
        sort: "",
      });
    }

    setAgeRange();
    setYearsActiveRange();
  }, []);

  const onSubmit = (formProps: IFormProps) => {
    searchArtists({
      name: "",
      sort: "",
      ...formProps,
    });
  };

  const renderInputs = () => {
    return TEXT_FIELDS.map(({ label, prop }) => (
      <div className="input-field" key={prop}>
        <Field
          placeholder={label}
          id={prop}
          name={prop}
          component="input"
          type="text"
        />
      </div>
    ));
  };

  return (
    <div className="card blue-grey darken-1 row">
      <div className="card-content white-text">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="center-align card-title">Search</div>

          {renderInputs()}

          <div className="input-field">
            <Field
              id="age"
              label="Age"
              component={Range}
              type="text"
              name="age"
              range={ageRange}
            />
          </div>

          <div className="input-field">
            <Field
              id="years-active"
              label="Years Active"
              component={Range}
              type="text"
              name="yearsActive"
              range={yearsActiveRange}
            />
          </div>

          <div>
            <label className="select" htmlFor="sort">
              Sort By
            </label>
            <Field id="sort" name="sort" component="select">
              <option value="name">Name</option>
              <option value="age">Age</option>
              <option value="albums">Albums Released</option>
            </Field>
          </div>

          <div className="center-align">
            <button className="btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default reduxForm<{}>({
  destroyOnUnmount: false,
  form: "filters",
  initialValues: { sort: "name" },
})(ArtistFilter);
