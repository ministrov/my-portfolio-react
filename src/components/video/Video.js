import video from './video.mp4';
import './style.css';

const Video = () => {
  return (
    <div className="video">
      <video autoPlay loop muted playsilines="true" className="back-video">
        <source src={video} type="video/mp4" />
      </video>
    </div>
  )
}

export default Video;