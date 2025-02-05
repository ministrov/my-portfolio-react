import { useSelector } from 'react-redux';
import { PiHeartbeatLight } from "react-icons/pi";
import './style.css';

const CountLikes = () => {
    const likes = useSelector((state) => state.counter);

    console.log(likes);
    return (
        <div className="countLikes">
            <PiHeartbeatLight size={35} color="lightblue"/>
            {likes.counter}
        </div>
    )
}

export default CountLikes;