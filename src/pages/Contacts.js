import Contact from '../components/contact/Contact';
import map from '../img/content-map.png';

const Contacts = ({ title }) => {
  return (
    <main className="contacts">
      <div className="container">
        <div className="content-list-wrapper">
          <h1 className="title-1">{title}</h1>

          <ul className="content-list">
            <li className="content-list__item">
              <h2 className="title-2">Location</h2>
              <p>Moscow, Russia</p>
            </li>
            <li className="content-list__item">
              <h2 className="title-2">Telegram / WhatsApp</h2>
              <p><a href="tel:+79257398612">+7 (925) 739-86-12</a></p>
            </li>
            <li className="content-list__item">
              <h2 className="title-2">Email</h2>
              <p><a href="mailto:ministrov2018@gmail.com">ministrov2018@gmail.com</a></p>
            </li>
          </ul>
        </div>

        <div className="contacts-map">
          <img src={map} alt="Map of the city" />
        </div>

        <div className="keep-in-touch">
          <Contact title={'Keep in touch'} text={'Write to me'}/>
        </div>
      </div>
    </main>
  )
}

export default Contacts;