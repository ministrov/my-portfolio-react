import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import './style.css';

/**
 * Страница 404 (не найдена).
 * Одна секция, подписанная видимым h1 из `ErrorMessage` (`id="not-found-title"`):
 * ярлык, заголовок, текст с адресом и два выхода — на главную и к проектам.
 * Управляет мета-тегами для SEO; `noindex, follow` — страница не попадает в
 * индекс, а ссылки с неё учитываются.
 *
 * @component
 * @example
 * return <PageNotFound />
 */
const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <title>{t('metadata.notFound.title')}</title>
      <meta name="description" content={t('metadata.notFound.description')} />
      <meta name="robots" content="noindex, follow" />

      <section className="page-not-found" aria-labelledby="not-found-title">
        <ErrorMessage />
      </section>
    </>
  );
};

export default memo(PageNotFound);
