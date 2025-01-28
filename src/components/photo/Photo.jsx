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
          src={myPicture}
          alt="Focus on author's face"
        />

        {/* <motion.svg
          className="about__svg"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="300"
            cy="300"
            r="300"
            stroke="#0062b9"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 1 2"}}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.svg>
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" }
          }}
          className="about__image-wrapper"
        >
          
        </motion.div> */} 
      </motion.div>
    </div>
  )
}

export default Photo