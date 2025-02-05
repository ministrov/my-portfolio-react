import { useSelector } from 'react-redux';
import { PiHeartbeatLight } from "react-icons/pi";
import './style.css';

const CountLikes = () => {
    const likes = useSelector((state) => state.counter);

    console.log(likes);
    return (
        <div className="countLikes">
            <PiHeartbeatLight size={45} color="#0062b9"/>
            {`Your likes: ${likes.counter}`}
        </div>
    )
}

export default CountLikes;