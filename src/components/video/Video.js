import { motion } from 'framer-motion';
import video from './video.mp4';
import './style.css';

const Video = () => {
  return (
    <div className="video">
      <motion.video
        autoPlay
        loop
        muted
        playsilines="true"
        className="back-video"
      >
        <source src={video} type="video/mp4" />
      </motion.video>
    </div>
  )
}

export default Video;