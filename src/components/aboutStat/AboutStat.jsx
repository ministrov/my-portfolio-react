import { useRef } from 'react';
import useScrambleText from '../../hooks/useScrambleText';
import useCharWidths from '../../hooks/useCharWidths';

/**
 * Плашка факта в секции «Обо мне»: значение расшифровывается посимвольно,
 * когда строка статистики попадает в кадр, ярлык остаётся статичным.
 *
 * Приём переиспользует `useScrambleText` — тот же механизм, что расшифровывает
 * подзаголовок hero. Это осознанно: подпись проекта (DESIGN.md → Signature:
 * The Developer's Console) перестаёт быть разовым трюком в одном месте и
 * читается как система. Побочная выгода — значения вроде `Middle` и `B2` не
 * числа, и счётчик чисел на них не работал бы, а расшифровка строки работает
 * с любым значением.
 *
 * Цикл здесь намеренно не включён (в отличие от hero): факты — не бегущая
 * строка, расшифровка играет один раз на входе в кадр.
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {string} props.value - Значение факта (`4+`, `10+`, `Middle`, `B2`)
 * @param {string} props.label - Подпись под значением (уже переведённая строка)
 * @param {number} [props.delayMs=0] - Задержка старта расшифровки (мс), разводит плашки во времени
 * @param {boolean} [props.active=false] - Идёт ли расшифровка (строка статистики в кадре)
 * @returns {JSX.Element} Плашка факта
 *
 * @example
 * <AboutStat value="4+" label="года опыта" delayMs={90} active={isInView} />
 */
const AboutStat = ({ value, label, delayMs = 0, active = false }) => {
  const valueRef = useRef(null);
  const glyphs = useScrambleText(value, {
    delayMs,
    stepMs: 60,
    tickMs: 45,
    active,
  });
  // Ширина символа фиксируется под финальный глиф: у пропорционального Oswald
  // случайные буквы шире/уже настоящих, и без этого плашка дёргалась бы в
  // ширину прямо во время расшифровки, толкая соседние плашки по flex-строке
  const charWidths = useCharWidths(valueRef, value);

  return (
    <li className="about__stat">
      <span className="about__stat-number" ref={valueRef}>
        <span className="visually-hidden">{value}</span>
        <span aria-hidden="true">
          {glyphs.map(({ char, locked }, index) => (
            <span
              // Индекс — корректный ключ: глифы позиционные, массив не
              // переупорядочивается и не фильтруется
              key={index}
              className={`about__stat-char${locked ? '' : ' about__stat-char--decoding'}`}
              style={
                charWidths ? { width: `${charWidths[index]}px` } : undefined
              }
            >
              {char}
            </span>
          ))}
        </span>
      </span>
      <span className="about__stat-label">{label}</span>
    </li>
  );
};

export default AboutStat;
