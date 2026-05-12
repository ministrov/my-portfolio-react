import { authorData } from '../../const/index.js';
import photo from '../../assets/png/photo.webp';
import './style.css';

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
  const { name, role, location, photoAlt, code } = authorData;

  /**
   * Генерирует JSX для блока кода с синтаксической подсветкой
   * @returns {JSX.Element} Элемент <code> с разметкой
   */
  const renderCodeBlock = () => (
    <code>
      <span className="token-keyword">const</span>{' '}
      <span className="token-variable">author</span>{' '}
      <span className="token-operator">=</span>{' '}
      <span className="token-punctuation">{'{'}</span>
      {'\n  '}
      <span className="token-property">name</span>
      <span className="token-punctuation">:</span>{' '}
      <span className="token-string">'{code.name}'</span>
      <span className="token-punctuation">,</span>
      {'\n  '}
      <span className="token-property">role</span>
      <span className="token-punctuation">:</span>{' '}
      <span className="token-string">'{code.role}'</span>
      <span className="token-punctuation">,</span>
      {'\n  '}
      <span className="token-property">location</span>
      <span className="token-punctuation">:</span>{' '}
      <span className="token-string">'{code.location}'</span>
      <span className="token-punctuation">,</span>
      {'\n  '}
      <span className="token-property">experience</span>
      <span className="token-punctuation">:</span>{' '}
      <span className="token-string">'{code.experience}'</span>
      <span className="token-punctuation">,</span>
      {'\n  '}
      <span className="token-property">focus</span>
      <span className="token-punctuation">:</span>{' '}
      <span className="token-string">'{code.focus}'</span>
      <span className="token-punctuation">,</span>
      {'\n  '}
      <span className="token-property">stack</span>
      <span className="token-punctuation">:</span>{' '}
      <span className="token-punctuation">[</span>
      {code.stack.map((tech, index) => (
        <span key={tech}>
          <span className="token-string">'{tech}'</span>
          {index < code.stack.length - 1 ? <span className="token-punctuation">, </span> : ''}
        </span>
      ))}
      <span className="token-punctuation">]</span>
      <span className="token-punctuation">,</span>
      {'\n  '}
      <span className="token-property">interests</span>
      <span className="token-punctuation">:</span>{' '}
      <span className="token-punctuation">[</span>
      {code.interests.map((interest, index) => (
        <span key={interest}>
          <span className="token-string">'{interest}'</span>
          {index < code.interests.length - 1 ? <span className="token-punctuation">, </span> : ''}
        </span>
      ))}
      <span className="token-punctuation">]</span>
      <span className="token-punctuation">,</span>
      {'\n  '}
      <span className="token-property">currentlyLearning</span>
      <span className="token-punctuation">:</span>{' '}
      <span className="token-punctuation">[</span>
      {code.currentlyLearning.map((item, index) => (
        <span key={item}>
          <span className="token-string">'{item}'</span>
          {index < code.currentlyLearning.length - 1 ? <span className="token-punctuation">, </span> : ''}
        </span>
      ))}
      <span className="token-punctuation">]</span>
      <span className="token-punctuation">,</span>
      {'\n  '}
      <span className="token-property">availableFor</span>
      <span className="token-punctuation">:</span>{' '}
      <span className="token-punctuation">[</span>
      {code.availableFor.map((option, index) => (
        <span key={option}>
          <span className="token-string">'{option}'</span>
          {index < code.availableFor.length - 1 ? <span className="token-punctuation">, </span> : ''}
        </span>
      ))}
      <span className="token-punctuation">]</span>
      <span className="token-punctuation">,</span>
      {'\n'}
      <span className="token-punctuation">{'};'}</span>
    </code>
  );

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
              alt={photoAlt}
              loading="lazy"
            />
          </figure>

          <div className="author-meta">
            <h2 className="author-name">{name}</h2>
            <p className="author-role">{role}</p>
            <p className="author-location">{location}</p>
          </div>
        </div>

        {/* Блок с кодом */}
        <pre className="author-code">
          {renderCodeBlock()}
        </pre>
      </div>
    </div>
  );
};

export default AuthorPhoto;
