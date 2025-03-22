import Heading from "../../components/heading/Heading";
import "./style.css";

const Advertisement = () => {
  return (
    <section className="advertisement">
      <div className="container">
        <Heading title={"Advertisement"} slogan={"Give you a place to your advertisement"} />

        <div className="advertisement__advs">"Your advertisement could be here."</div>
      </div>
    </section>
  )
}

export default Advertisement;