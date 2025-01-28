import { useState } from 'react';
import './style.css';

const MyCheckBox = () => {
  const [liked, setLiked] = useState(false);

  function handleChange(e) {
    setLiked(e.target.checked);
  }
  return (
    <div className='checkbox'>
      <label>
        <input 
          type="checkbox"
          checked={liked}
          onChange={handleChange}
        />

        I liked this
      </label>

      <p> You {liked ? 'liked': 'did not like'} this.</p>
    </div>
  )
}

export default MyCheckBox