const Image = ({ src, fallback, type = 'image/webp', alt, ...props }) => {
  return (
    <picture {...props}>
      <source srcSet={src} type={type} />
      <img src={fallback} alt={alt} />
    </picture>
  );
};

export default Image;
