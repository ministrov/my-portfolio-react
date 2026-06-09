import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Heading from '../heading/Heading';
import Tag from '../tag/Tag';
import { skills } from '../../const';
import './style.css';

// Анимация контейнера списка
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// Анимация элемента списка
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

// Motion-обёртка для Tag, совместимая с Framer Motion.
// Создаётся один раз на уровне модуля, чтобы не пересоздавать тип компонента на каждом рендере.
const MotionTag = motion(Tag);

/**
 * Компонент секции "Возможности" (навыки и технологии).
 * Отображает заголовок, описание и список технологий в виде тегов.
 * Использует анимации Framer Motion для плавного появления элементов.
 *
 * @component
 * @returns {JSX.Element} Секция с навыками
 */
const AboutCapabilities = () => {
  const { t } = useTranslation();

  return (
    <section className="about-capabilities">
      <div className="container">
        <div className="about-capabilities__wrapper">
          <Heading
            variant="display"
            title={t('heading.capabilities.name')}
            accent={t('heading.capabilities.accent')}
          />

          <div className="about-capabilities__text-container">
            <p className="about-capabilities__text">
              {t('aboutCapabilities.text')}
            </p>

            <motion.ul
              className="about-capabilities__list"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              aria-label={t('aboutCapabilities.ariaLabel', {
                defaultValue: 'Список технологий',
              })}
            >
              {skills.map((skill) => (
                <MotionTag key={skill} variants={itemVariants}>
                  {skill}
                </MotionTag>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCapabilities;
