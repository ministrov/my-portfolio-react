import { useSelector } from 'react-redux';
import { PiHeartbeatLight } from "react-icons/pi";
import './style.css';

const CountLikes = () => {
    const likes = useSelector((state) => state.likes);

    return (
        <div className="likes">
            <div className="likes__heart">
                <PiHeartbeatLight size={45} color="#0062b9"/>
            </div>
            {`Your likes: ${likes.counter}`}
        </div>
    )
}

export default CountLikes;