import { motion } from "framer-motion";
import Image from '../image/Image';
import authorPhoto from "../../assets/png/photo.png";
import webPPhoto from "../../assets/png/photo.webp";
import "./style.css";

const Photo = () => {
  return (
    <motion.div
      className="about__image-block"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2, duration: 0.4, ease: "easeIn"}
      }}
    >
      <Image 
        className="about__image"
        width={500}
        height={500}
        fallback={authorPhoto}
        src={webPPhoto}
        alt={"Focus on author's face"}
      />
        {/* <img
          className="about__image"
          width={500}
          height={500}
          src={authorPhoto}
          alt="Focus on author's face"
        />  */}
    </motion.div>
  )
}

export default Photo;