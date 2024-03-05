import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Button from "../components/button/Button";

const Page404 = () => {
  return (
    <div className="page-404 container">
      <ErrorMessage />
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        Page doesn't exist
      </p>

      <Button
        text={"Back to main page"}
        href={"/"}
        className={"btn--med btn--theme"}
      />
    </div>
  );
};

export default Page404;
