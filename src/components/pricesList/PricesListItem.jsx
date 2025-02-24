import './style.css';

export const PricesListItem = ({ title, description, price }) => {
  return (
    <li className='prices__list-item'>
        <div className='prices__list-item-wrap'>
            <h3 className='prices__list-item-header'>{title}</h3>
            <p className='prices__list-item-text'>{description}</p>
            <span className='prices__list-item-price'>{price}</span>
        </div>
    </li>
  )
}
