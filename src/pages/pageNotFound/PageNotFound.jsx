import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import './style.css';

/**
 * Страница 404 (не найдена).
 * Отображает сообщение об ошибке с возможностью вернуться на главную.
 * Управляет мета-тегами для SEO.
 *
 * @component
 * @example
 * return <PageNotFound />
 */
const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('metadata.notFound.title')}</title>
        <meta
          name="description"
          content={t('metadata.notFound.description')}
          data-rh="true"
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <section className="page-not-found">
        <h1 className="visually-hidden">{t('metadata.notFound.title')}</h1>

        <ErrorMessage
          textContent={t('errorMessage.message')}
          btnText={t('errorMessage.back')}
        />
      </section>
    </>
  );
};

export default memo(PageNotFound);
