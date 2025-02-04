const Image = ({ src, fallback, type = 'image/webp', alt, ...props }) => {
  return (
    <picture>
      <source srcSet={src} type={type} />
      <img {...props} src={fallback} alt={alt} />
    </picture>
  )
}

export default Image;