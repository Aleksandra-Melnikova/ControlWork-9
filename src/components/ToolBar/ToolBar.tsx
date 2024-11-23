import { NavLink } from "react-router-dom";
import "./Toolbar.css";

const ToolBar = () => {


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <NavLink className={'title-app'} to="/">
            <span className="navbar-brand mb-0 text-white fs-1 ">Finance Tracker</span>
          </NavLink>
          <div className="ms-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={`nav-link fs-4 `}
                  to="/categories"
                >
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link  fs-4 `}

                >
                  Add
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ToolBar;
