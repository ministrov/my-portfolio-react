import { useTranslation } from "react-i18next";
import TypingText from "../../components/typingText/TypingText";
import Image from "../../components/image/Image";
import Button from "../../components/button/Button";
import SocialList from "../../components/socials/SocialList";
import MouseScroll from "../../components/mouseScroll/MouseScroll";
import MyAvatar from "../../assets/png/my-avatar.png";
import MyAvatar1 from "../../assets/png/my-avatar.webp";
import "./style.css";

const Promo = () => {
  const { t } = useTranslation();
  return (
    <section className="promo">
      <h2 className="visually-hidden">A promo section for introduction of the author</h2>
      <div
        className="promo__content"
      >
        <TypingText className={'promo__title'} text={"Hey Folks, I'm Anton Zhilin, a Frontend Developer!"} />

        <p className="promo__text">{t("promoText")}</p>

        <div className="promo__btns">
          <Button
            text={t("promoBtn")}
            href={require("../../assets/pdfs/my-cv.pdf")}
            className={"btn--big"}
          />
        </div>
      </div>
      <div className="promo__image-wrapper">
        <Image src={MyAvatar1} fallback={MyAvatar} width={252} height={252} alt={"A funny pixel men with a laptop in his hands"} />
      </div>

      <MouseScroll />

      <div className="promo__socials">
        <SocialList className={"socials__list"} />
      </div>
    </section>
  );
};

export default Promo;
