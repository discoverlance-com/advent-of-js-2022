import { Outlet, NavLink } from "react-router-dom";

export default function Root() {
  return (
    <>
      <main id="page">
        <h1>
          Advent of Javascript by{" "}
          <a
            href="https://discoverlance.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lance Armah-Abraham
          </a>
        </h1>

        <nav>
          <ul className="nav-list">
            <li>
              <NavLink
                to={`/`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/pomodoro`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                Day 1
              </NavLink>
            </li>
          </ul>
        </nav>

        <div id="outlet">
          <Outlet />
        </div>
      </main>
    </>
  );
}