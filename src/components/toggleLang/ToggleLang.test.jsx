import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '../../utils/i18n/index';
import { LanguageContext } from '../../context/LanguageProvider';
import ToggleLang from './ToggleLang';

const renderToggle = ({ lang }) => {
  const toggleLang = vi.fn();

  render(
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      <ToggleLang />
    </LanguageContext.Provider>
  );

  return toggleLang;
};

describe('ToggleLang', () => {
  it('отмечает текущий язык через aria-pressed', () => {
    renderToggle({ lang: 'ru' });

    const group = screen.getByRole('group', {
      name: 'Переключить язык интерфейса',
    });
    const ru = within(group).getByRole('button', { name: 'RU' });
    const en = within(group).getByRole('button', { name: 'EN' });

    expect(ru).toHaveAttribute('aria-pressed', 'true');
    expect(en).toHaveAttribute('aria-pressed', 'false');
  });

  it('клик по неактивному языку вызывает переключение', () => {
    const toggleLang = renderToggle({ lang: 'ru' });

    fireEvent.click(screen.getByRole('button', { name: 'EN' }));

    expect(toggleLang).toHaveBeenCalled(1);
  });

  it('клик по активному языку шпион не вызван', () => {
    const toggleLang = renderToggle({ lang: 'ru' });

    fireEvent.click(screen.getByRole('button', { name: 'RU' }));

    expect(toggleLang).not.toHaveBeenCalled();
  });
});
// 1. **Прочитай** (около часа): Testing Library → About Queries (почему `getByRole` первым);
//    Vitest → `vi.fn` (функция-шпион: запоминает, сколько раз и с чем её вызвали); React →
//    Passing Data Deeply with Context (что делает `Provider` — передаёт значение всему, что внутри).
// 2. **Начало файла** — как в `MobileMenu.test.jsx`: импорты из `vitest` и `@testing-library/react`,
//    строка 10 — инициализация i18next. Роутер не нужен: в `ToggleLang` нет ссылок.
// 3. **Помощник рендера** — как `renderMenu` (`MobileMenu.test.jsx:31`): принимает `lang`, создаёт
//    шпион `toggleLang`, рендерит `ToggleLang` внутри `LanguageContext.Provider` со значением
//    `{ lang, toggleLang }` и возвращает шпиона.
// 4. **Тест 1 — разметка:** группа находится по роли и имени (текст — в `ru.json`, ключ
//    `toggleLang.ariaLabel`); у кнопки текущего языка `aria-pressed` — `true`, у второй — `false`.
//    Матчер `toHaveAttribute` — пример в `MobileMenu.test.jsx:86`.
// 5. **Тест 2 — клик по неактивной:** шпион вызван один раз — как `CtaButton.test.jsx:85–91`.
// 6. **Тест 3 — клик по активной:** шпион не вызван — `not.toHaveBeenCalled()`, как
//    `MobileMenu.test.jsx:127`. Пока на активной кнопке стоит `disabled`, этот тест проходит
//    **случайно**: клик по `disabled` не доходит до обработчика. Сначала убери `disabled`, потом
//    прогони тест.
// 7. **Проверь, что тест умеет падать:** временно убери условие `if (!isActive)` — тест 3 должен
//    покраснеть. Верни условие. Зелёный тест, который не может покраснеть, ничего не проверяет.
// 8. **Запуск:** `npm test -- ToggleLang` (перезапускается при сохранении файла).
