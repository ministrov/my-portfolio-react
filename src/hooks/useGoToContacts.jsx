import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';

/**
 * `id` заголовка секции контактов (`sections/contact/Contact.jsx`) — единая
 * цель «Обсудить проект» и «Контактов». От ухода под фикс-хедер заголовок
 * защищает `scroll-margin-top` из правила `[id$='-heading']` в `main.css`.
 */
export const CONTACT_HEADING_ID = 'contact-heading';

/**
 * Хук перехода к контактам с любой страницы.
 * Возвращает функцию, которая в следующем кадре — когда меню или модалка,
 * закрытые перед вызовом, уже отпустили блокировку скролла — ищет заголовок
 * контактов. Он есть на странице (главная, /about, /projects) — прокрутка
 * к нему без смены адреса; его нет (404) — переход на `/#contact-heading`,
 * дальше главную докручивает `ScrollToTop`. При `prefers-reduced-motion`
 * прокрутка мгновенная. Заголовок лежит в другом компоненте, поэтому ищется
 * по id, а не через ref.
 *
 * @returns {Function} `goToContacts()` — аргументы игнорирует, поэтому
 *   годится прямо в `onClick`.
 *
 * @example
 * const goToContacts = useGoToContacts();
 * <button type="button" onClick={goToContacts}>Обсудить проект</button>
 */
const useGoToContacts = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  return useCallback(() => {
    requestAnimationFrame(() => {
      const heading = document.getElementById(CONTACT_HEADING_ID);

      if (heading) {
        heading.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      } else {
        navigate(`/#${CONTACT_HEADING_ID}`);
      }
    });
  }, [navigate, prefersReducedMotion]);
};

export default useGoToContacts;
