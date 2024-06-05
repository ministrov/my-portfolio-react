import Social from "../social/Social";
import "./style.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="main-footer__upper">
          <div className="main-footer__row main-footer__row-1">
            <h2 className="main-footer__heading-sm">
              <span>Socials</span>
            </h2>
            <ul className="main-footer__list">
              <Social/>
            </ul>
          </div>
          <div className="main-footer__row main-footer__row-2">
            {/* <Logo /> */}
            {/* Need to remove and add LOGO component */}
            <h4 className="main-footer__heading-sm">Anton Zhilin</h4>
            <p className="main-footer__short-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit facilis
              tempora explicabo quae quod deserunt
            </p>
          </div>
        </div>

        <div className="main-footer__lower">
          &copy; Copyright 2021. Made by
          <a rel="noreferrer" target="_blank" href="https://rammaheshwari.com">
            Anton Zhilin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
