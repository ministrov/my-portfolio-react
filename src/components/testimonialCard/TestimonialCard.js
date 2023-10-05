import './style.css';

const TestimonialCard = ({
  title,
  simultaniousParsing,
  parsingPerDay,
  price,
  gatheringAudience,
}) => {
  return (
    <article className="tariff">
      <h4 className="tariff__header">{title}</h4>
      <div className="tariff__card_wrapper">
        <h5 className="tariff__subtitle">Includes:</h5>

        <ul className="tariff__contains">
          <li>simultanious parsing: {simultaniousParsing}</li>
          <li>how much parsing per day: {parsingPerDay}</li>
        </ul>

        <h5 className="tariff__subtitle">Ways of gathering audience:</h5>

        <ul className="tariff__contains">
          {gatheringAudience === 1 && <li>участники групп/каналов</li>}
          {gatheringAudience === 2 && (
            <>
              <li>участники групп/каналов</li>
              <li>активность участников групп/каналов</li>
            </>
          )}
          {gatheringAudience === 3 && (
            <>
              <li>участники групп/каналов</li>
              <li>активность участников групп/каналов</li>
              <li>геолокация</li>
            </>
          )}
        </ul>

        <h5 className="tariff__subtitle">Date of expiry:</h5>
        <p className="tariff__days">30 days</p>

        <h5 className="tariff__subtitle">Pricing:</h5>
        <p className="tariff__price">{price}</p>
      </div>
      <button className="tariff__btn">Choose tariff</button>
    </article>
  );
};
export default TestimonialCard;
