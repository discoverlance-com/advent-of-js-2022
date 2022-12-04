import { Outlet, NavLink, useNavigation } from "react-router-dom";

const NAV_LIST = [
  {
    href: "/pomodoro",
    title: "Day 1",
  },
  {
    href: "/e-commerce-component",
    title: "Day 2",
  },
];

export default function Root() {
  const navigation = useNavigation();
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
            {NAV_LIST.map((item) => (
              <li>
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div
          id="outlet"
          className={navigation.state === "loading" ? "loading" : ""}
        >
          <Outlet />
        </div>
      </main>
    </>
  );
}
