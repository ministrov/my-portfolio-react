/**
 * @module contactApi
 * @description Транспортный слой формы обратной связи — отправка через Web3Forms.
 * Знает только про HTTP: никакой валидации, никакого состояния React.
 * Чтобы сменить сервис (EmailJS, свой бэкенд) — меняем только этот файл.
 */

/** URL эндпоинта Web3Forms. */
const API_URL = 'https://api.web3forms.com/submit';

/**
 * Отправляет данные формы обратной связи на сервис Web3Forms.
 *
 * --- Как здесь работает асинхронность ---
 *
 * `async` перед функцией означает две вещи:
 *   1. Функция ВСЕГДА возвращает Promise — даже если внутри нет await.
 *   2. Внутри разрешено использовать ключевое слово await.
 *
 * `await` — оператор «подожди». Он приостанавливает выполнение ЭТОЙ функции
 * и передаёт управление обратно в event loop браузера.
 * Пока функция «спит» — React продолжает рендерить, пользователь может
 * кликать кнопки, анимации продолжают работать. Это не блокирующее ожидание.
 *
 * Два await нужны потому что HTTP-ответ приходит в два этапа:
 *   1-й await fetch()     → ждём заголовки ответа (статус, Content-Type, и т.д.)
 *   2-й await res.json()  → ждём тело ответа и парсим его из JSON-строки в объект
 *
 * try/catch ловит любое исключение внутри блока — как синхронное, так и
 * то что «вылетело» из отклонённого Promise (rejected Promise → throw).
 *
 * @async
 * @param {{ name: string, email: string, subject: string, message: string }} data
 * @returns {Promise<{ success: boolean, message: string }>} Распарсенный ответ Web3Forms.
 * @throws {Error} При сетевой ошибке или если Web3Forms вернул success: false.
 */
export async function submitContactForm(data) {
  // Собираем тело запроса: ключ API + данные формы
  const payload = {
    access_key: process.env.REACT_APP_WEB3FORMS_KEY,
    ...data,
  };

  // ШАГ 1 — смотрим что уходит на сервер
  console.log('[ContactAPI] → Отправляем запрос. Payload:', payload);

  // fetch() сразу возвращает Promise<Response> — не ждёт завершения.
  // await приостанавливает функцию до получения заголовков ответа.
  // После этой строки в `res` — объект Response с HTTP-статусом и заголовками.
  // Тело ответа ещё НЕ прочитано — оно идёт отдельным потоком.
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // говорим серверу: тело запроса — JSON
      Accept: 'application/json', // просим ответ тоже в JSON
    },
    body: JSON.stringify(payload), // JS-объект → строка '{"name":"...","email":"...",...}'
  });

  // ШАГ 2 — смотрим заголовки ответа (тело ещё не прочитано)
  // res.ok === true если HTTP-статус 200–299
  // res.status — числовой код: 200 OK, 400 Bad Request, 500 Server Error, ...
  console.log(
    '[ContactAPI] ← Получены заголовки. HTTP-статус:',
    res.status,
    '| ok:',
    res.ok
  );

  // res.json() читает оставшийся поток данных и парсит JSON → JS-объект.
  // Тоже async — нужен второй await.
  const responseData = await res.json();

  // ШАГ 3 — смотрим полный распарсенный ответ
  // Web3Forms возвращает: { success: true/false, message: "Sent" / "invalid_access_key" / ... }
  console.log('[ContactAPI] ← Тело ответа (JSON):', responseData);

  // Отличаем «бизнес-ошибку» (неверный ключ, превышен лимит) от сетевой:
  // HTTP-статус при этом может быть 200, но success === false
  if (!responseData.success) {
    throw new Error(responseData.message ?? 'Web3Forms: неизвестная ошибка');
  }

  return responseData;
}
