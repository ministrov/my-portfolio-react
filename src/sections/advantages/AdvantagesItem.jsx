import { Trans, useTranslation } from 'react-i18next';
import { memo } from 'react';
import './style.css';

/**
 * Компонент элемента списка преимуществ.
 * Отображает иконку (react-icons компонент) и текстовое описание с поддержкой
 * перевода и выделения.
 *
 * Появления по скроллу здесь нет намеренно: раскрытие ничего не сообщает
 * о содержимом и только откладывает момент, когда текст можно прочитать.
 * Движение в этой карточке живёт на наведении (см. style.css).
 *
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {string} props.text - Ключ перевода для текста элемента
 * @param {React.ComponentType} props.icon - react-icons компонент
 * @param {Object} props... - Дополнительные пропсы, передаваемые в элемент li
 * @example
 * <AdvantagesItem text="advantages.items.sixth" icon={BsPhone} />
 */
const AdvantagesItem = ({ text, icon: Icon, ...props }) => {
  // Trans не подписывается на смену языка самостоятельно — без этого вызова
  // memo блокирует ре-рендер элемента при смене языка
  useTranslation();

  return (
    <li className="advantages__item" {...props}>
      <Icon className="advantages__item-img" aria-hidden="true" />
      <p className="advantages__item-text">
        <Trans i18nKey={text} components={{ highlight: <strong /> }} />
      </p>
    </li>
  );
};

export default memo(AdvantagesItem);
