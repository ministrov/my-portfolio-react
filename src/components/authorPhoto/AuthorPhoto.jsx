import photo from '../../assets/png/photo.webp';
import './style.css';

const AuthorPhoto = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <img
          src={photo}
          width={500}
          height={500}
          alt="Крупным планом автор проекта"
        />
      </div>
    </div>
  );
};

export default AuthorPhoto;
