import { createPortal } from 'react-dom';
import video from './video.jpg';
import './style.css';

const Video = () => {
  return createPortal(
    <div className="video">
      <img src={video} className="video__image" alt="Pic about video" />
    </div>,
    document.getElementById('portal')
  )
}

export default Video;