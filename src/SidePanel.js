import { Link } from "react-router-dom";
function SidePanel({ links, path }) {
  return (
    <ul className="nav nav-pills flex-column">
      {links.map((l) => (
        <LinkItems isActive={l.path === path} key={l.path} link={l} />
      ))}
    </ul>
  );
}

function LinkItems({ link, isActive }) {
  return (
    <li className="nav-item">
      <Link
        to={link.path}
        className={`nav-link ${isActive ? "active" : ""}`}
        aria-current="page"
      >
        {link.name}
      </Link>
    </li>
  );
}

export default SidePanel;
