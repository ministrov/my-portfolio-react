import { useSelector, useDispatch } from 'react-redux';
import { incrementLike } from '../../srore/counter.slice';
import { PiHeartbeatLight } from "react-icons/pi";
import './style.css';

const CountLikes = () => {
    const likes = useSelector((state) => state.likes);
    const dispatch = useDispatch();

    console.log(likes);
    return (
        <div className="likes">
            <div onClick={() => dispatch(incrementLike())} className="likes__heart">
                <PiHeartbeatLight size={45} color="#0062b9"/>
            </div>
            {`Your likes: ${likes.counter}`}
        </div>
    )
}

export default CountLikes;