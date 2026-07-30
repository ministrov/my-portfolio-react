# Handoff: Hero Reveal (анимация hero-секции, AntoshkinDev)

## Overview
Анимированный вход hero-секции лендинга + новая CTA-кнопка «Скачать резюме» в стиле
glassmorphism с вращающейся градиентной кромкой. Цель — «wow»-эффект при первой загрузке
страницы, без изменения структуры контента.

## About the Design Files
`Hero Reveal.dc.html` — это **дизайн-референс, сделанный в HTML** (прототип внешнего вида и
поведения), а не продакшн-код для копирования. Задача: воспроизвести эту анимацию и кнопку в
существующем окружении проекта (Next.js + React у AntoshkinDev) — своими компонентами, своим
способом стилизации (CSS Modules / Tailwind / styled-components — что уже используется).
Разметка в прототипе намеренно инлайновая: переносить нужно значения, не сам инлайн-стиль.

## Fidelity
**High-fidelity.** Цвета, типографика, тайминги и easing финальные — воспроизводить точно.

## Screens / Views
### Hero (единственный экран)
- **Purpose**: первый экран портфолио; удержать внимание и увести в «Скачать резюме».
- **Layout**: секция `min-height: 100vh`, `display:flex; flex-direction:column`, `overflow:hidden`.
  - Фон: `radial-gradient(120% 90% at 50% 0%, #ffffff 0%, #fafaff 45%, #f4f5fb 100%)`.
  - Слой сетки (absolute, inset 0, pointer-events none): два `linear-gradient` линии
    `rgba(20,24,60,0.055) 1px`, `background-size: 148px 148px`, маска
    `radial-gradient(115% 85% at 50% 40%, #000 20%, transparent 78%)`.
  - Слой частиц (absolute, inset 0): 54 круга 2–5.6px, цвета
    `rgba(47,82,247,.85)`, `rgba(123,63,242,.8)`, `rgba(255,92,138,.8)`, `rgba(150,158,190,.55)`,
    `box-shadow: 0 0 (size*3)px` того же цвета с меньшей альфой; позиции случайные (seeded RNG,
    seed 1337 — чтобы SSR и клиент совпадали).
  - «Блум»: круг 1100×1100 по центру (`top:48%`), radial-gradient синий→фиолетовый→прозрачный.
  - Header: `padding: 34px 56px 0`, space-between: логотип / nav / (пилюля языка + CTA «Обсудить проект»).
  - Main: центрирование по обеим осям, `padding: 0 40px 90px`, `text-align:center`.
- **Components**
  - **Kicker**: JetBrains Mono 500 15px, uppercase, `color:#9aa0b4`, финальный `letter-spacing: .42em`.
  - **H1**: Montserrat 800, `clamp(46px, 6.6vw, 108px)`, `line-height:1.04`, `letter-spacing:-.035em`,
    `color:#12162a`. Три строки, каждая — внешний `overflow:hidden` + внутренний блок (маска снизу).
    Третья строка «живые продукты» — градиентный текст
    `linear-gradient(100deg,#2f52f7,#7b3ff2 28%,#3b5bfd 52%,#7b3ff2 78%,#2f52f7)`,
    `background-size:200% 100%`, `background-clip:text`, `color:transparent`.
  - **Sub**: Montserrat 400 `clamp(17px,1.35vw,22px)`, `line-height:1.5`, `color:#5c6379`.
  - **CTA (главный элемент)**: обёртка `padding:2px; border-radius:18px; overflow:hidden;
    box-shadow: 0 20px 52px -16px rgba(47,82,247,.6)`; внутри абсолютный слой
    `conic-gradient(from 0deg,#2f52f7,#8b3ff2,#ff5c8a,#2f52f7)` размером 170%×240% со смещением
    `top:-70%; left:-35%`, `animation: spin 6s linear infinite` — это и есть «живая кромка».
    Сама ссылка: `height:62px; padding:0 32px; border-radius:16px`,
    `background: linear-gradient(150deg, rgba(255,255,255,.88), rgba(255,255,255,.6))`,
    `backdrop-filter: blur(16px) saturate(170%)` (+ `-webkit-`),
    `box-shadow: inset 0 1px 0 rgba(255,255,255,.95), inset 0 -14px 26px -16px rgba(47,82,247,.55)`,
    текст Montserrat 700 16px uppercase `letter-spacing:.09em`, `color:#1b2140`.
    Иконка: круг 30px, `linear-gradient(140deg,#2f52f7,#8b3ff2)`, белая «↗»,
    `box-shadow: 0 6px 14px -4px rgba(47,82,247,.85)`, микро-анимация `hrOrbit` (см. ниже).
    Hover: `transform: translateY(-4px) scale(1.015)`, стекло светлеет до
    `rgba(255,255,255,.96)/.72`, transition `.4s cubic-bezier(.16,1,.3,1)`.
    Пульсирующее кольцо при появлении: `inset:-3px; border:2px solid rgba(47,82,247,.45)`, 2 цикла.
  - **Scroll hint**: JetBrains Mono 500 12px, `letter-spacing:.3em`, `color:#b3b8c8`, лёгкий bob.
  - **Кнопка «Проиграть заново»** — только для демо, в продакшн не переносить.

## Interactions & Behavior
Таймлайн входа (все задержки умножаются на `--hrS` = 1/speed):
| t, s | Элемент | Анимация |
|---|---|---|
| 0 | сетка | `hrGrid` 1.6s: opacity 0→1, scale 1.12→1 |
| 0.15–0.42 | логотип / nav / хедер-CTA | `hrFadeUp` .7s, стагger 0.15/0.3/0.42 |
| 0.2+ | частицы | `hrLive` 7–16s, infinite alternate, индивидуальный delay 0.2–2.8 |
| 0.5 | kicker | `hrTrack` 1.5s: letter-spacing 1.1em→.42em, blur 6px→0 |
| 0.85 | блум за заголовком | `hrBloom` 2.6s: scale .3→1.5, opacity 0→.85→0 |
| 0.9 / 1.05 / 1.22 | строки H1 | `hrRise` 1.15s: translateY 115%→0, rotate 2deg→0, blur 14px→0 |
| 1.6 | блик по заголовку | `hrGlare` 1.5s, полоса белого градиента, `mix-blend-mode: overlay` |
| 1.85 | подзаголовок | `hrFadeUp` .9s |
| 2.05 | CTA | `hrPop` .95s, `cubic-bezier(.2,1.5,.35,1)` — с overshoot |
| 2.4+ | градиент 3-й строки | `hrShift` 9s linear infinite |
| 2.75 | кольцо у CTA | `hrRing` 1.5s ×2 |
| 3.0+ | иконка CTA | `hrOrbit` 3.6s infinite (сдвиг +3/-3px) |
Основной easing входа: `cubic-bezier(.16,1,.3,1)`. Hover-состояния — `.4s`.

Обязательно: `@media (prefers-reduced-motion: reduce)` — отключить входные и бесконечные
анимации, оставить конечные состояния (opacity 1, transform none).

## State Management
Состояния нет. Единственная переменная в прототипе — `runId` для перезапуска (remount) демо.
Частицы генерировать один раз (`useMemo`) детерминированным seeded RNG — иначе hydration mismatch.

## Design Tokens
- Ink: `#12162a`, `#1b2140`, `#3a4058`, `#5c6379`, `#9aa0b4`, `#a7acbe`, `#b3b8c8`
- Accent: `#2f52f7`, `#3b5bfd`, `#5b46f5`, `#7b3ff2`, `#8b3ff2`, pink `#ff5c8a`
- Surface: `#ffffff`, `#fafaff`, `#f4f5fb`; стекло `rgba(255,255,255,.88)→(.6)`
- Radius: 12 / 16 / 18 / 999px
- Spacing: 14, 16, 26, 34, 44, 56, 64, 90px
- Type: Montserrat 400/500/600/700/800; JetBrains Mono 500
- Shadows: `0 8px 24px rgba(47,82,247,.3)`, `0 20px 52px -16px rgba(47,82,247,.6)`

## Assets
Внешних ассетов нет. Шрифты — Google Fonts (Montserrat, JetBrains Mono, подмножества
cyrillic+latin); в Next.js подключить через `next/font/google` с `display: swap`.

## Files
- `Hero Reveal.dc.html` — прототип целиком (разметка + @keyframes в <style> + логика частиц в классе Component).
