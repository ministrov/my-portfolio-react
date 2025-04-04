import { PiHeartbeatLight } from 'react-icons/pi';
import './style.css';

const CountLikes = () => {
  return (
    <div className="likes">
      <PiHeartbeatLight size={45} color="#0062b9" />
    </div>
  );
};

export default CountLikes;
