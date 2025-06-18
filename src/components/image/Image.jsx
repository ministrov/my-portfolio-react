import './style.css';

const Image = ({ src, fallback, type = 'image/webp', alt, ...props }) => {
  return (
    <picture>
      <source srcSet={src} type={type} />
      <img {...props} className="image" src={fallback} alt={alt} />
    </picture>
  );
};

export default Image;
