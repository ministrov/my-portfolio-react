import video from './video.jpg';
import './style.css';

const Video = () => {
  return (
    <div className="video">
      <img src={video} className="video__image" alt="Pic about video" />
    </div>
  )
}

export default Video;