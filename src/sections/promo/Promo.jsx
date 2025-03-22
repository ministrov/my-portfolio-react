import { useDispatch } from "react-redux";
import { incrementLike } from "../../store/counter.slice";
import TypingText from "../../components/typingText/TypingText";
import Image from "../../components/image/Image";
import Button from "../../components/button/Button";
import SocialList from "../../components/socials/SocialList";
import MouseScroll from "../../components/mouseScroll/MouseScroll";
import MyAvatar from "../../assets/png/my-avatar.png";
import MyAvatar1 from "../../assets/png/my-avatar.webp";
import "./style.css";

const Promo = () => {
  const dispatch = useDispatch();
  return (
    <section className="promo">
      <h2 className="visually-hidden">A promo section for introduction of the author</h2>
      <div
        className="promo__content"
      >
        <TypingText className={'promo__title'} text={"Hey Folks, I'm Anton Zhilin, a Frontend Developer!"}/>

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
            onClick={() => dispatch(incrementLike())}
            text={"Give a like"}
            className={"btn--big"}
          />
        </div>
      </div>
      <div className="promo__image-wrapper">
        <Image src={MyAvatar1} fallback={MyAvatar} width={252} height={252} alt={"A funny pixel men with a laptop in his hands"}/>
      </div>

      <MouseScroll />

      <div className="promo__socials">
        <SocialList className={"socials__list"}/>
      </div>
    </section>
  );
};

export default Promo;
