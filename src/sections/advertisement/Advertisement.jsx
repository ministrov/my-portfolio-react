import { useWindowSize } from '../../hooks/useWindowSize';
import Heading from '../../components/heading/Heading';
import './style.css';

const Advertisement = () => {
  const windowSize = useWindowSize();

  console.log(windowSize);
  return (
    <section className="advertisement">
      <div className="container">
        <Heading
          title={'Advertisement'}
          slogan={'Give you the best place to your advertisement'}
        />

        <div className="advertisement__advs">
          Your advertisement could be here.
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
