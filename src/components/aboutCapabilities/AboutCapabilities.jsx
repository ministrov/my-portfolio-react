import { useTranslation } from 'react-i18next';
import Heading from '../heading/Heading';
import Tag from '../tag/Tag';
import { skills } from '../../const/index.js';
import './style.css';

const AboutCapabilities = () => {
  const { t } = useTranslation();

  return (
    <section className="about-capabilities">
      <div className="container">
        <div className="about-capabilities__wrapper">
          <Heading title={t('heading.capabilities.name')} />

          <div className="about-capabilities__text-container">
            <p className="about-capabilities__text">
              {t('aboutCapabilities.text')}{' '}
            </p>

            <ul className="about-capabilites__list">
              {skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCapabilities;
