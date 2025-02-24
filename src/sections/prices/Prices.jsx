import Heading from '../../components/heading/Heading';
import PricesList from '../../components/pricesList/PricesLIst';
import "./style.css";

const Prices = () => {
  return (
    <section className="prices">
      <div className="container">
        <Heading title={"Prices"} slogan={"Give you a best prices for professional web developing"} />

        {/* Pricing card list */}
        <PricesList/>
      </div>
    </section>
  )
}

export default Prices;