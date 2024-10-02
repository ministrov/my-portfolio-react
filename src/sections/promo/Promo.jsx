import Button from "../../components/button/Button";
import Social from "../../components/social/Social";
import MouseScroll from "../../components/mouseScroll/MouseScroll";
import MyAvatar from "../../assets/png/my-avatar.png";
import "./style.css";

const Promo = ({ setIsOpen }) => {
  return (
    <section className="promo">
      <div
        className="promo__content"
      >
        <h2 className="promo__title">Hey Folks, I'm Anton Zhilin</h2>
        <p className="promo__text">
          Welcome to a world where pixels come alive and digital dreams become
          reality. Step into my realm and let me weave captivating designs with
          code, creating seamless experiences that leave a lasting impression.
        </p>

        <div className="promo__btns">
          <Button
            text={"Download CV"}
            href={require("../../assets/pdfs/my-cv.pdf")}
            className={"btn--big"}
          />
          <Button
            onClick={() => setIsOpen(true)}
            text={"Click me"}
            className={"btn--big"}
          />
        </div>
      </div>
      <div className="promo__image-wrapper">
        <img src={MyAvatar} className="promo__image" alt="Avatar img" />
      </div>

      <MouseScroll />

      <div className="promo__socials">
        <Social/>
      </div>
    </section>
  );
};

export default Promo;
