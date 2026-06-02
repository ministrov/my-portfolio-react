import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { authorData } from '../../const';
import photo from '../../assets/png/photo.webp';
import './style.css';

/**
 * Строковое значение в блоке кода (в одинарных кавычках).
 * @param {Object} props
 * @param {string} props.value - Отображаемое значение
 * @returns {JSX.Element}
 */
const CodeString = ({ value }) => (
  <span className="token-string">'{value}'</span>
);

/**
 * Скалярное свойство объекта в блоке кода (`ключ: 'значение',`).
 * @param {Object} props
 * @param {string} props.name - Имя свойства
 * @param {string} props.value - Значение свойства
 * @returns {JSX.Element}
 */
const StringProp = ({ name, value }) => (
  <>
    {'\n  '}
    <span className="token-property">{name}</span>
    <span className="token-punctuation">: </span>
    <CodeString value={value} />
    <span className="token-punctuation">,</span>
  </>
);

/**
 * Свойство-массив строк в блоке кода (`ключ: ['a', 'b'],`).
 * @param {Object} props
 * @param {string} props.name - Имя свойства
 * @param {string[]} props.items - Элементы массива
 * @returns {JSX.Element}
 */
const ArrayProp = ({ name, items }) => (
  <>
    {'\n  '}
    <span className="token-property">{name}</span>
    <span className="token-punctuation">: [</span>
    {items.map((item, index) => (
      <Fragment key={item}>
        <CodeString value={item} />
        {index < items.length - 1 && (
          <span className="token-punctuation">, </span>
        )}
      </Fragment>
    ))}
    <span className="token-punctuation">],</span>
  </>
);

/**
 * Компонент AuthorPhoto отображает карточку с фотографией автора, метаданными
 * и стилизованным блоком кода с информацией об авторе.
 *
 * @component
 * @example
 * return (
 *   <AuthorPhoto />
 * )
 *
 * @returns {JSX.Element} Карточка автора с фотографией и кодом
 */
const AuthorPhoto = () => {
  const { t } = useTranslation();
  const { code } = authorData;

  return (
    <div className="author-wrapper">
      <div className="author-card">
        {/* Заголовок окна в стиле IDE */}
        <div className="author-window-bar">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
          <span className="author-window-title">/about/me.tsx</span>
        </div>

        {/* Основное содержимое: фото и метаданные */}
        <div className="author-content">
          <figure className="author-photo-ring">
            <img
              className="author-img"
              src={photo}
              width={260}
              height={260}
              alt={t('authorPhoto.photoAlt')}
              loading="lazy"
            />
          </figure>

          <div className="author-meta">
            <p className="author-name">{t('authorPhoto.name')}</p>
            <p className="author-role">{t('authorPhoto.role')}</p>
            <p className="author-location">{t('authorPhoto.location')}</p>
          </div>
        </div>

        {/* Блок с кодом */}
        <pre className="author-code">
          <code>
            <span className="token-keyword">const</span>{' '}
            <span className="token-variable">author</span>{' '}
            <span className="token-operator">=</span>{' '}
            <span className="token-punctuation">{'{'}</span>
            <StringProp name="name" value={code.name} />
            <StringProp name="role" value={code.role} />
            <StringProp name="location" value={code.location} />
            <StringProp name="experience" value={code.experience} />
            <StringProp name="focus" value={code.focus} />
            <ArrayProp name="stack" items={code.stack} />
            <ArrayProp name="interests" items={code.interests} />
            <ArrayProp name="currentlyLearning" items={code.currentlyLearning} />
            <ArrayProp name="availableFor" items={code.availableFor} />
            {'\n'}
            <span className="token-punctuation">{'};'}</span>
          </code>
        </pre>
      </div>
    </div>
  );
};

export default AuthorPhoto;
