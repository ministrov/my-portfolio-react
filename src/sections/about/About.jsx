// import { useContext } from 'react';
import { useUser } from '../../context/userContext';
import { useTranslation } from 'react-i18next';
import TypingText from '../../components/typingText/TypingText';
import Heading from '../../components/heading/Heading';
import Photo from '../../components/photo/Photo';
import './style.css';

const About = () => {
  const { t } = useTranslation();
  const userId = useUser();

  console.log(userId);
  return (
    <section className="about">
      <div className="container">
        <Heading
          title={t('heading.about.name')}
          slogan={t('heading.about.subheading')}
          className="about__title"
        ></Heading>

        <div className="about__wrapper">
          <div className="about__left">
            <p className="about__description">
              <TypingText
                className={'about__greeting'}
                text={t('about.title')}
              />
              <br />
              <br />
              {t('about.descriptionOne')}
              <br />
              <br />
              {t('about.descriptionTwo')}
            </p>
          </div>

          <div className="about__right">
            <Photo />
          </div>
        </div>
      </div>

      {userId ?? 'default'}
    </section>
  );
};

export default About;
