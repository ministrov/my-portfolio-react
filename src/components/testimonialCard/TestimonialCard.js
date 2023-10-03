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
        <h5 className="tariff__subtitle">Включает:</h5>

        <ul className="tariff__contains">
          <li>одновременный парсинг: {simultaniousParsing}</li>
          <li>количество парсингов в день: {parsingPerDay}</li>
        </ul>

        <h5 className="tariff__subtitle">Способы сбора аудитории:</h5>

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

        <h5 className="tariff__subtitle">Срок действия:</h5>
        <p className="tariff__days">30 дней</p>

        <h5 className="tariff__subtitle">Стоимость:</h5>
        <p className="tariff__price">{price}</p>
      </div>
      <button className="tariff__btn">Выбрать тариф</button>
    </article>
  );
};
export default TestimonialCard;
