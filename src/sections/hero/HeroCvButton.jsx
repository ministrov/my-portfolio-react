import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoArrowUpRight, GoCheck } from 'react-icons/go';
import cvPdf from '../../assets/pdfs/my-cv.pdf';

/**
 * Сколько кнопка CV держит подтверждение нажатия (мс).
 * Скачивание файла уходит в хром браузера и никак не отражается на самой
 * странице — без этого отклика главная конверсия сайта срабатывает молча.
 */
export const DOWNLOAD_ACK_MS = 2200;

/**
 * Главная кнопка героя — скачивание резюме в PDF: ссылка с `download` во
 * вращающейся рамке-spotlight.
 *
 * После нажатия на `DOWNLOAD_ACK_MS` стрелка сменяется галочкой (модификатор
 * `hero__btn--acked`), а скринридер слышит «загрузка началась» из скрытой
 * области `role="status"` с `aria-live="polite"`. Повторное нажатие продлевает
 * подтверждение, а не обрывает его.
 *
 * Классы — блока героя (`hero__btn*`), стили — в его `style.css`. Анимацию
 * появления и соседнюю вторичную кнопку задаёт `Hero` на обёртке
 * `.hero__actions`. Подписи — из i18n-ключей `hero.btn` и `hero.btnDownloading`.
 *
 * @component
 * @returns {JSX.Element} Колонка с кнопкой резюме и областью статуса
 * @example
 * <m.div className="hero__actions" {...ctaMotion}>
 *   <HeroCvButton />
 *   <CtaButton variant="outline" className="hero__secondary-cta" />
 * </m.div>
 */
const HeroCvButton = () => {
  const { t } = useTranslation();
  const [isDownloadAcked, setIsDownloadAcked] = useState(false);
  const ackTimeoutRef = useRef(null);

  // Таймер отклика переживает размонтирование кнопки (например, при уходе со
  // страницы вместе с героем), поэтому снимается явно.
  // Флага isMounted здесь быть не должно: обработчик синхронный, гонки нет
  useEffect(() => () => clearTimeout(ackTimeoutRef.current), []);

  /** Подтверждает нажатие на кнопку скачивания резюме. */
  const handleDownload = useCallback(() => {
    setIsDownloadAcked(true);
    clearTimeout(ackTimeoutRef.current);
    ackTimeoutRef.current = setTimeout(
      () => setIsDownloadAcked(false),
      DOWNLOAD_ACK_MS
    );
  }, []);

  return (
    <div className="hero__btn-col">
      <div className="hero__btn-frame">
        <span className="hero__btn-spin" aria-hidden="true" />
        <a
          className={`hero__btn${isDownloadAcked ? ' hero__btn--acked' : ''}`}
          href={cvPdf}
          download="Anton_Zhilin_CV.pdf"
          rel="noopener noreferrer"
          onClick={handleDownload}
        >
          {t('hero.btn')}
          <span className="hero__btn-icon">
            {isDownloadAcked ? <GoCheck /> : <GoArrowUpRight />}
          </span>
        </a>
      </div>

      <span className="visually-hidden" role="status" aria-live="polite">
        {isDownloadAcked ? t('hero.btnDownloading') : ''}
      </span>
    </div>
  );
};

export default HeroCvButton;
