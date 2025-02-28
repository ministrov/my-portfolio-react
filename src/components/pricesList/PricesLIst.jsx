import { PricesListItem } from './PricesListItem';
import { prices } from '../../data/prices';
import "./style.css";

const PricesList = () => {
  return (
    <ul className="prices__list">
        {prices.map((price) => (
            <PricesListItem 
                key={price.id} 
                title={price.title} 
                description={price.description} 
                price={price.price}
            />
        ))}
    </ul>
  )
}

export default PricesList;