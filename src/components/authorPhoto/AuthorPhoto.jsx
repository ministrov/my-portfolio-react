import photo from '../../assets/png/photo.webp';
import './style.css';

const AuthorPhoto = () => {
  return (
    <div className="container">
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
              <h2 className="author-name">Имя Фамилия</h2>
              <p className="author-role">
                Frontend Developer · React / Next.js
              </p>
              <p className="author-location">Moscow · Remote / Hybrid</p>
            </div>
          </div>

          <pre className="author-code">
            {`const author = {
              experience: '5+ years',
              focus: 'Frontend architecture, animation, DX',
              stack: ['React', 'Next.js', 'TypeScript', 'CSS-in-JS']
            };`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AuthorPhoto;

// import photo from '../../assets/png/photo.webp';
// import './style.css';

// const AuthorPhoto = () => {
//   return (
//     <div className="wrapper">
//       <div className="container">
//         <img
//           className="author-img"
//           src={photo}
//           width={500}
//           height={500}
//           alt="Крупным планом автор проекта"
//         />
//       </div>
//     </div>
//   );
// };

// export default AuthorPhoto;
