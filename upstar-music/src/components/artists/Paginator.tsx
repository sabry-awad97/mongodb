import React from "react";
import { selectArtists, useActions, useAppSelector } from "../../redux";
import { selectFilters } from "../../redux/form/form.selectors";

const Paginator = () => {
  const { limit, offset, count } = useAppSelector(selectArtists);
  const values = useAppSelector(selectFilters);
  const { searchArtists } = useActions();

  const back = () => {
    if (offset === 0) {
      return;
    }

    searchArtists({
      offset: offset - 10,
      limit: limit,
      name: "",
      sort: "",
      ...values,
    });
  };

  const advance = () => {
    if (offset + limit > count) {
      return;
    }

    searchArtists({
      offset: offset + 10,
      limit: limit,
      name: "",
      sort: "",
      ...values,
    });
  };

  const left = () => {
    return (
      <li className={offset === 0 ? "disabled" : ""}>
        <a onClick={back}>
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
    );
  };

  const right = () => {
    const end = offset + limit >= count ? true : false;

    return (
      <li className={end ? "disabled" : ""}>
        <a onClick={advance}>
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    );
  };

  return (
    <div className="center-align">
      <ul className="pagination">
        {left()}
        <li>
          <a>Page {offset / 10 + 1}</a>
        </li>
        {right()}
      </ul>
      {count} Records Found
    </div>
  );
};

export default Paginator;
