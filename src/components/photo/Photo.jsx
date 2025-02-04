import { motion } from "framer-motion";
// import myPicture from "../../assets/png/my-photo.png";
import myPicture from "../../assets/png/photo.png";
import "./style.css";

const Photo = () => {
  return (
    <div className="about__image-block">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.4, ease: "easeIn"}
        }}
      >
        <img
          className="about__image"
          width={500}
          height={500}
          src={myPicture}
          alt="Focus on author's face"
        /> 
      </motion.div>
    </div>
  )
}

export default Photo;