import myPicture from "../../assets/photo.png";
import "./style.css";

const Photo = () => {
  return (
    <img
      className="about__image"
      src={myPicture}
      alt="Focus on author's face"
    />
  )
}

export default Photo