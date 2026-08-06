import { useTranslation } from 'react-i18next';
import { MdContentCopy, MdCheck } from 'react-icons/md';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import './style.css';

/**
 * Кнопка-ссылка для копирования email в буфер обмена.
 * Заменяет mailto-ссылку: работает независимо от почтового клиента,
 * настроенного в системе пользователя. При успешном копировании на ~2 сек
 * меняет иконку на «галочку» и объявляет результат для скринридеров.
 *
 * @component
 * @param {Object} props
 * @param {string}  props.email       - Email-адрес для отображения и копирования.
 * @param {string} [props.className]  - Доп. класс-модификатор (напр. `copy-email--accent`).
 * @returns {JSX.Element}
 * @example
 * <CopyEmail email="me@example.com" className="copy-email--accent" />
 */
const CopyEmail = ({ email, className = '' }) => {
  const { t } = useTranslation();
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      className={['copy-email', className].filter(Boolean).join(' ')}
      onClick={() => copy(email)}
      title={copied ? t('contactForm.info.copied') : t('contactForm.info.copy')}
    >
      <span className="copy-email__text">{email}</span>
      {copied ? (
        <MdCheck
          className="copy-email__icon copy-email__icon--ok"
          aria-hidden="true"
        />
      ) : (
        <MdContentCopy className="copy-email__icon" aria-hidden="true" />
      )}
      <span className="copy-email__sr" aria-live="polite">
        {copied ? t('contactForm.info.copied') : ''}
      </span>
    </button>
  );
};

export default CopyEmail;
