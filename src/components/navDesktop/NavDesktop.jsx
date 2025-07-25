import { BiHomeAlt2 } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
// import { PiChatCircleBold } from "react-icons/pi";
// import { IoPricetagsOutline } from "react-icons/io5";
import './style.css';

export const routes = [
  {
    title: "mainNav.home",
    href: "/",
    Icon: BiHomeAlt2,
  },
  {
    title: "mainNav.projects",
    href: "/projects",
    Icon: FiSearch,
  }
];

export const NavDesktop = () => {
  return (
    <ul className="hidden lg:flex lg:items-center gap-5 text-sm">
      {routes.map((route) => {
        const { Icon, href, title } = route;
        return (
          <li>
            <a
              href={href}
              className="flex items-center gap-1 hover:text-neutral-400 transition-all"
            >
              <Icon />
              {title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};