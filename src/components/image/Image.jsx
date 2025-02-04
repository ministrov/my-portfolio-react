const Image = ({ src, fallback, width = 283, height = 290, type = 'image/webp', alt }) => {
  return (
    <picture>
      <source srcSet={src} type={type} />
      <img src={fallback} width={width} height={height} alt={alt} />
    </picture>
  )
}

export default Image;