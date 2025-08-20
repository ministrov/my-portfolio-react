import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import './style.css';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>A Not Found Page</title>
        <meta
          name="description"
          content="A page for rendering a not found page"
          data-rh="true"
        />
      </Helmet>
      <section className="page-not-found">
        <h2 className="visually-hidden">A not found page section</h2>

        <ErrorMessage textContent={t('errorMessage.message')} btnText={t('errorMessage.back')} />
      </section>
    </>
  );
};

export default PageNotFound;
