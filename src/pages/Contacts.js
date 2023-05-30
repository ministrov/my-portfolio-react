const Contacts = () => {
  return (
    <>
      <main className="section">
        <div className="container">
          <h1 className="title-1">Contacts</h1>

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
      </main>
    </>
  )
}

export default Contacts;