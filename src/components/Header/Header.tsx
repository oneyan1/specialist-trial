import { Link, useLocation } from "react-router-dom";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { setSearchElement } from "../../store/reducers/SpecialistsSlice";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  let location = useLocation();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>();
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const totalRows = useAppSelector((state) =>
    location.pathname === "/"
      ? state.specialists.specialistsList.length
      : state.specialists.favoriteSpecialistList.length
  );

  const searchHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    []
  );

  useEffect(() => {
    if (debouncedValue !== undefined) {
      dispatch(setSearchElement(debouncedValue));
    }
  }, [debouncedValue]);

  return (
    <div className="header">
      <h1 className="title">Favorite specialists ({totalRows})</h1>

      <div className="button-block">
        <Link to="/">
          <button
            className={`button-block__button button-block__button_left ${
              location.pathname === "/"
                ? "button-block__button_active"
                : "button-block__button_regular"
            }`}
          >
            All favorite
          </button>
        </Link>
        <Link to="favorites">
          <button
            className={`button-block__button button-block__button_right ${
              location.pathname === "/favorites"
                ? "button-block__button_active"
                : "button-block__button_regular"
            }`}
          >
            My specialists
          </button>
        </Link>
      </div>

      <div className="search">
        <label className="search-label">
          <input
            type="text"
            className={
              searchValue ? "search-input search-input__active" : "search-input"
            }
            placeholder="Search..."
            onChange={searchHandler}
          />
        </label>
      </div>
    </div>
  );
};

export default Header;
