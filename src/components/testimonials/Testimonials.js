import Carousel from '../carousel/Carousel';
import Heading from '../heading/Heading';
import './style.css';

const Testimonials = () => {

  return (
    <div className="testimonials">
      <div className="container">
        <Heading className="testimonials__header title-2">Testimonials</Heading>

        <Carousel/>
      </div>
    </div>
  )
}

export default Testimonials;