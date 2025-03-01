import { useSelector } from 'react-redux';
import { PiHeartbeatLight } from "react-icons/pi";
import './style.css';

const CountLikes = () => {
    const likes = useSelector((state) => state.likes);

    return (
        <div className="likes">
            <PiHeartbeatLight size={45} color="#0062b9"/>
            <span className="likes__count">{`${likes.counter}`}</span>
        </div>
    )
}

export default CountLikes;