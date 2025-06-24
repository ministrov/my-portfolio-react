import { motion } from 'framer-motion';
import author from '../../assets/png/photo.webp';
import './style.css';

const Photo = () => {
  return (
    <motion.div
      className="about__image-block"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1, duration: 1, ease: 'easeInOut' },
      }}
    >
      <img
        className="about__image"
        src={author}
        width={500}
        height={500}
        alt={"Focus on author's face"}
      />
    </motion.div>
  );
};

export default Photo;
