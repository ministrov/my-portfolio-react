# План: форма обратной связи в секции Contact

Ветка: `feature/production-tweaks`
Дата: 2026-06-10

---

## Проблема

Секция Contact сейчас — заголовок + одна кнопка, открывающая модальное окно «4 шага». Содержание и виды пусты: нет прямого канала связи, нет смысла задерживаться.

---

## Что строим

**Двухколоночный layout** (десктоп): слева — краткий призыв к действию с контактными деталями, справа — форма.
На мобайле — одна колонка, форма под текстовым блоком.

Существующая кнопка «Связаться» (→ Modal с «4 шагами») **остаётся**, но перемещается под форму как вторичный CTA — «Как происходит заказ?». Таким образом форма — основной канал, модал — информационный.

---

## Дизайн

### Левый блок — контактные детали

```
[ крупный подзаголовок ]
Давайте обсудим ваш проект

[ иконка ] ministrov2018@gmail.com
[ иконка ] Москва · Remote / Hybrid
[ иконка ] Пн–Пт, 10:00–19:00

[ социальные ссылки — компонент SocialList ]

[ ссылка-кнопка ghost ] «Как происходит заказ →»
```

Карточный стиль (тот же белый фон + border + radius 16px, что в about/faq). Левая синяя полоска — акцент.

### Правый блок — форма

Поля:

1. **Имя** — `<input type="text">`, `required`, мин. 2 символа
2. **Email** — `<input type="email">`, `required`, RFC-валидация через `input.validity.typeMismatch`
3. **Тема** — `<input type="text">`, `required`, мин. 3 символа
4. **Сообщение** — `<textarea>` 4 строки, `required`, мин. 20 символов

Каждое поле: `<label>` над полем (не floating — читабельнее), синяя рамка на `:focus`, красная рамка + inline-ошибка при невалидном значении.

Кнопка отправки: полная ширина, цвет `--color-blue-700`, иконка `BiSend` (react-icons — уже есть).

### Состояния формы

| Состояние         | Поведение                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `idle`            | начальное, поля пусты, кнопка активна                                                     |
| `dirty` (по blur) | валидация поля, показ ошибки если нужно                                                   |
| `submitting`      | кнопка — лоадер (спиннер через CSS), поля `disabled`                                      |
| `success`         | форма заменяется блоком «Спасибо, скоро отвечу» с иконкой ✔ и кнопкой «Написать ещё»      |
| `error`           | над формой — красный баннер «Что-то пошло не так, попробуйте позже или напишите на email» |

---

## Отправка email

**Без новых npm-зависимостей.** Используем [Web3Forms](https://web3forms.com/) — бесплатный сервис (до 250 форм/месяц). Принцип: обычный `fetch POST` на `https://api.web3forms.com/submit` с JSON-телом. Никакого SDK, никакого `npm install`.

Что нужно сделать один раз вручную перед реализацией:

1. Зайти на web3forms.com → «Get your Access Key»
2. Ввести почту `ministrov2018@gmail.com` → подтвердить письмо
3. Получить Access Key (строка вида `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
4. Положить ключ в переменную окружения `.env.local`: `REACT_APP_WEB3FORMS_KEY=ваш-ключ`

Пример запроса:

```js
const res = await fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify({
    access_key: process.env.REACT_APP_WEB3FORMS_KEY,
    name: values.name,
    email: values.email,
    subject: values.subject,
    message: values.message,
  }),
});
```

Альтернатива (если Web3Forms не подходит): **Formspree** — та же схема, но 50 форм/месяц бесплатно.

---

## Валидация (без библиотек)

Правила валидации — объект конфигурации, одна функция `validate(name, value)`:

```js
const RULES = {
  name: { required: true, minLength: 2 },
  email: { required: true, type: 'email' },
  subject: { required: true, minLength: 3 },
  message: { required: true, minLength: 20 },
};
```

- Поле становится «touched» при первом blur.
- Ошибка показывается только если `touched[field] === true`.
- При сабмите принудительно `touched` выставляется для всех полей.
- Если есть хотя бы одна ошибка — scroll к первому полю с ошибкой.

---

## Структура файлов

```
src/
  components/
    contactForm/
      ContactForm.jsx   ← форма + валидация + fetch
      style.css

  sections/
    contact/
      Contact.jsx       ← добавить ContactForm, левый блок, новый layout
      style.css         ← двухколоночный grid, карточный стиль
```

`ContactForm` — самодостаточный компонент: принимает `onSuccess` колбек (опционально).
`Contact` — собирает layout: левый блок + `<ContactForm>`.

---

## i18n ключи (ru + en)

Новый namespace `contact` (сейчас его нет, есть только `heading.contact`):

```json
"contactForm": {
  "fields": {
    "name":        { "label": "Ваше имя",    "placeholder": "Антон Жилин" },
    "email":       { "label": "Email",        "placeholder": "example@mail.ru" },
    "subject":     { "label": "Тема",         "placeholder": "Обсудить проект" },
    "message":     { "label": "Сообщение",    "placeholder": "Расскажите о вашем проекте..." }
  },
  "submit":       "Отправить сообщение",
  "submitting":   "Отправляем...",
  "successTitle": "Сообщение отправлено!",
  "successText":  "Спасибо! Отвечу в течение 24 часов.",
  "successReset": "Написать ещё",
  "errorText":    "Что-то пошло не так. Попробуйте позже или напишите напрямую:",
  "errors": {
    "required":   "Обязательное поле",
    "minLength":  "Минимум {{count}} символов",
    "email":      "Введите корректный email"
  },
  "info": {
    "subtitle":   "Давайте обсудим ваш проект",
    "email":      "ministrov2018@gmail.com",
    "location":   "Москва · Remote / Hybrid",
    "hours":      "Пн–Пт, 10:00–19:00",
    "orderLink":  "Как происходит заказ?"
  }
}
```

---

## Порядок коммитов

1. `feat(contactForm)` — компонент `ContactForm` с валидацией, состояниями и fetch (без реального ключа — `process.env` placeholder)
2. `style(contactForm)` — стили формы: поля, ошибки, состояние success/error, кнопка
3. `feat(contact)` — обновление секции: двухколоночный layout, левый блок, монтаж `ContactForm`; Modal кнопка → вторичный CTA
4. `style(contact)` — CSS обновление секции: grid, карточный стиль левого блока, адаптив
5. `i18n(contactForm)` — ключи в ru.json + en.json

_(Если ключ Web3Forms будет готов к реализации — шаг 5 включает `.env.local.example` с placeholder)_

---

## Решения (согласовано 2026-06-10)

1. **Web3Forms key**: начинаем с placeholder (`REACT_APP_WEB3FORMS_KEY=PLACEHOLDER`). Реальный ключ вставить вручную после регистрации на web3forms.com.
2. **Modal**: перемещается под форму как вторичный CTA «Как происходит заказ?» — не удаляется.
3. **Поле «Тема»**: свободный `<input type="text">`.
4. **Анимация**: Framer Motion — fade-in на success-блок и slide-in на inline-ошибки.
5. **Страницы**: `Contact` уже стоит на `HomePage` и `AboutPage` — форма появится на обеих автоматически (DRY, без дублирования). На `ProjectsPage` Contact нет и не нужен.
