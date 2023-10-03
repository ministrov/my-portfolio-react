import Carousel from '../carousel/Carousel';
import './style.css';

const Testimonials = () => {

  return (
    <div className="testimonials">
      <div className="container">
        <h3 className="testimonials__header title-2">Testimonials</h3>

        <Carousel/>
      </div>
    </div>
  )
}

export default Testimonials;