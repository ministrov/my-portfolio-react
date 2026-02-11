import photo from '../../assets/png/photo.webp';
import './style.css';

const AuthorPhoto = () => {
  return (
    <div className="author-wrapper">
      <div className="author-card">
        <div className="author-window-bar">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
          <span className="author-window-title">/about/me.tsx</span>
        </div>

        <div className="author-content">
          <div className="author-photo-ring">
            <img
              className="author-img"
              src={photo}
              width={260}
              height={260}
              alt="Крупным планом автор проекта"
            />
          </div>

          <div className="author-meta">
            <h2 className="author-name">Антон Жилин</h2>
            <p className="author-role">Frontend Developer · React / Next.js</p>
            <p className="author-location">Москва · Remote / Hybrid</p>
          </div>
        </div>

        <pre className="author-code">
          <code>
            <span className="token-keyword">const</span>{' '}
            <span className="token-variable">author</span>{' '}
            <span className="token-operator">=</span>{' '}
            <span className="token-punctuation">{'{'}</span>
            {'\n  '}
            <span className="token-property">name</span>
            <span className="token-punctuation">:</span>{' '}
            <span className="token-string">'Антон Жилин'</span>
            <span className="token-punctuation">,</span>
            {'\n  '}
            <span className="token-property">role</span>
            <span className="token-punctuation">:</span>{' '}
            <span className="token-string">'Senior Frontend Engineer'</span>
            <span className="token-punctuation">,</span>
            {'\n  '}
            <span className="token-property">location</span>
            <span className="token-punctuation">:</span>{' '}
            <span className="token-string">'Moscow, Russia'</span>
            <span className="token-punctuation">,</span>
            {'\n  '}
            <span className="token-property">experience</span>
            <span className="token-punctuation">:</span>{' '}
            <span className="token-string">'5+ years'</span>
            <span className="token-punctuation">,</span>
            {'\n  '}
            <span className="token-property">focus</span>
            <span className="token-punctuation">:</span>{' '}
            <span className="token-string">
              'Frontend architecture, animation, DX'
            </span>
            <span className="token-punctuation">,</span>
            {'\n  '}
            <span className="token-property">stack</span>
            <span className="token-punctuation">:</span>{' '}
            <span className="token-punctuation">[</span>
            <span className="token-string">'React'</span>
            <span className="token-punctuation">, </span>
            <span className="token-string">'Next.js'</span>
            <span className="token-punctuation">, </span>
            <span className="token-string">'TypeScript'</span>
            <span className="token-punctuation">, </span>
            <span className="token-string">'CSS-in-JS'</span>
            <span className="token-punctuation">]</span>
            <span className="token-punctuation">,</span>
            {'\n  '}
            <span className="token-property">interests</span>
            <span className="token-punctuation">:</span>{' '}
            <span className="token-punctuation">[</span>
            <span className="token-string">'UX'</span>
            <span className="token-punctuation">, </span>
            <span className="token-string">'Design systems'</span>
            <span className="token-punctuation">, </span>
            <span className="token-string">'Animations'</span>
            <span className="token-punctuation">]</span>
            <span className="token-punctuation">,</span>
            {'\n  '}
            <span className="token-property">currentlyLearning</span>
            <span className="token-punctuation">:</span>{' '}
            <span className="token-punctuation">[</span>
            <span className="token-string">'Testing'</span>
            <span className="token-punctuation">, </span>
            <span className="token-string">'Node.js'</span>
            <span className="token-punctuation">]</span>
            <span className="token-punctuation">,</span>
            {'\n  '}
            <span className="token-property">availableFor</span>
            <span className="token-punctuation">:</span>{' '}
            <span className="token-punctuation">[</span>
            <span className="token-string">'Remote'</span>
            <span className="token-punctuation">, </span>
            <span className="token-string">'Consulting'</span>
            <span className="token-punctuation">]</span>
            <span className="token-punctuation">,</span>
            {'\n'}
            <span className="token-punctuation">{'};'}</span>
          </code>
        </pre>
      </div>
    </div>
  );
};

export default AuthorPhoto;
