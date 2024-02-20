import { motion } from "framer-motion";
import Button from "../button/Button";
import MouseScroll from "../mouseScroll/MouseScroll";
import MyAvatar from "./my-avatar.png";
import "./style.css";

const Promo = ({ setIsOpen }) => {
  // console.log(setIsOpen);
  return (
    <section className="promo">
      <div className="promo__wrapper">
        <motion.div
          className="promo__text-wrapper"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "tween", duration: 1 }}
        >
          <h2 className="promo__title">Hey, My name is Anton Zhilin</h2>
          <p className="promo__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic facilis tempora explicabo quae quod deserunt eius sapiente solutions for complex problems
          </p>
        </motion.div>
        <div className="promo__btns">
          <Button
            text={"Download CV"}
            href={require("../../assets/pdfs/my-cv.pdf")}
            className={"btn--bg"}
          />
          <Button onClick={() => setIsOpen(true)} text={"Click me"} className={"btn--bg"} />
        </div>
        <div className="promo__image-wrapper">
          <img src={MyAvatar} className="promo__image" alt="Avatar img" />
        </div>

        <MouseScroll/>
      </div>
    </section>
  );
};

export default Promo;
