// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Heading from '../heading/Heading';
import './style.css';

const AboutExperience = () => {
  const { t } = useTranslation();

  return (
    <section className={`about-experience`}>
      <div className="container">
        <Heading title={t('heading.experience.name')} />

        <div>AboutExperience</div>
      </div>
    </section>
  );
};

export default AboutExperience;
