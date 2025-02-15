import { Helmet } from "react-helmet-async";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Button from "../components/button/Button";

const Page404 = () => {
  return (
    <section className="page-not-found">
      <h2 className='visually-hidden'>A not found page section</h2>
      <Helmet>
        <title>A Not Found Page</title>
        <meta
          name="description"
          content="A page for rendering a not found page"
          data-rh="true"
        />
        <link rel="canonical" href="*" />
      </Helmet>

      <ErrorMessage />
      <p className="page-not-found__text">Page doesn't exist</p>

      <Button
        text={"Back to main page"}
        href={"/"}
        className={"btn--med btn--theme"}
      />
    </section>
  );
};

export default Page404;
