import { useTranslation } from 'react-i18next';
import { LazyMotion, m, domAnimation } from 'motion/react';
import Heading from '../heading/Heading';
import Tag from '../tag/Tag';
import { STACK_GROUPS } from '../../const';
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

// Motion-обёртка для Tag.
// Создаётся один раз на уровне модуля, чтобы не пересоздавать тип компонента на каждом рендере.
// В motion 12 вызов m(Tag) объявлен устаревшим в пользу m.create(Tag).
const MotionTag = m.create(Tag);

/**
 * Секция «Мой стек» на /about: технологии группами чипов, без абзаца.
 *
 * Разметка — список описаний: `dl > div > dt + dd`. `dt` — подпись группы из
 * словаря (`aboutCapabilities.groups.<key>`), `dd` — её чипы списком `Tag`.
 * `div` внутри `dl` — допустимая в HTML обёртка пары, на нём строится сетка
 * «подпись слева, чипы справа». Группы и имена технологий — `STACK_GROUPS`
 * из `const/`; имена не переводятся.
 *
 * Доступное имя «Стек технологий» — у всего `dl`: списков чипов пять, своего
 * имени у них нет — каждый относится к `dt` своей пары по структуре `dl` и
 * порядку чтения. Чипы каждой группы проявляются каскадом,
 * когда группа входит в кадр, — те же варианты и тайминги, что у прежнего
 * единственного списка; подписи не анимируются.
 *
 * @component
 * @returns {JSX.Element} Секция с заголовком и группами технологий
 *
 * @example
 * <AboutCapabilities />
 */
const AboutCapabilities = () => {
  const { t } = useTranslation();

  return (
    <section
      className="about-capabilities"
      aria-labelledby="capabilities-heading"
    >
      <div className="container">
        <div className="about-capabilities__wrapper">
          <Heading
            id="capabilities-heading"
            title={t('heading.capabilities.name')}
            accent={t('heading.capabilities.accent')}
          />

          <div className="about-capabilities__card">
            <LazyMotion features={domAnimation}>
              <dl
                className="about-capabilities__groups"
                aria-label={t('aboutCapabilities.ariaLabel')}
              >
                {STACK_GROUPS.map(({ key, items }) => (
                  <div className="about-capabilities__group" key={key}>
                    <dt className="about-capabilities__term">
                      {t(`aboutCapabilities.groups.${key}`)}
                    </dt>
                    <dd className="about-capabilities__details">
                      {/* role="list" — не дубль: при list-style: none
                          (глобально у li в main.css) Safari с VoiceOver
                          перестаёт объявлять список и число пунктов */}
                      <m.ul
                        className="about-capabilities__chips"
                        role="list"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                      >
                        {items.map((item) => (
                          <MotionTag key={item} variants={itemVariants}>
                            {item}
                          </MotionTag>
                        ))}
                      </m.ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </LazyMotion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCapabilities;
