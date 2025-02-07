import { Helmet } from "react-helmet-async";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Button from "../components/button/Button";

const Page404 = () => {
  return (
    <section className="page-not-found">
      <Helmet>
        <title>A Not Found Page</title>
        <meta
          name="description"
          content="A page for rendering a not found page"
          data-rh="true"
        />
        <link rel="canonical" href="*" />
      </Helmet>

      <section className="page-404">
        <ErrorMessage />
        <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
          Page doesn't exist
        </p>

        <Button
          text={"Back to main page"}
          href={"/"}
          className={"btn--med btn--theme"}
        />
      </section>
    </section>
  );
};

export default Page404;
