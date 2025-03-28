import { Helmet } from "react-helmet-async";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>A Not Found Page</title>
        <meta
          name="description"
          content="A page for rendering a not found page"
          data-rh="true"
        />
        <link rel="canonical" href="*" />
      </Helmet>
      <section className="page-not-found">
        <h2 className='visually-hidden'>A not found page section</h2>

        <ErrorMessage />
      </section>    
    </>
  );
};

export default PageNotFound;
