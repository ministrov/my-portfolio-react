const Image = ({ src, fallback, type = 'image/webp', alt, ...props }) => {
  return (
    <picture>
      <source srcSet={src} type={type} />
      <img src={fallback} {...props} alt={alt}/>
    </picture>
  )
}

export default Image;