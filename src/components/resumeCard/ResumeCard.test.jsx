import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ResumeCard from './ResumeCard';

// Компонент не вызывает t(): тексты приходят готовыми строками, i18n не нужен
const STAGES = [
  {
    date: 'Ноябрь 2024 — настоящее время',
    summary: 'Разрабатываю и поддерживаю e-commerce платформу.',
    points: [
      'Спроектировал и внедрил виджет отзывов.',
      'Запускаю акционные лендинги.',
      'Слежу за Core Web Vitals.',
    ],
  },
  {
    date: 'Декабрь 2023 — ноябрь 2024',
    summary: 'Участвовал в разработке интернет-магазина.',
    points: ['Адаптивная вёрстка.', 'Продуктовые слайдеры.'],
  },
];

describe('ResumeCard', () => {
  it('без необязательных пропсов рендерит только заголовок и даты', () => {
    const { container } = render(
      <ResumeCard
        title="Фриланс-разработчик"
        date="Сентябрь 2021 — ноябрь 2023"
      />
    );

    expect(
      screen.getByRole('heading', { level: 3, name: 'Фриланс-разработчик' })
    ).toBeInTheDocument();
    expect(screen.getByText('Сентябрь 2021 — ноябрь 2023')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(container.querySelector('.resume-card__label')).toBeNull();
    expect(container.querySelector('.resume-card__text')).toBeNull();
  });

  it('без className у корня ровно класс блока — без «undefined»', () => {
    render(<ResumeCard title="Заголовок" date="2024" />);

    expect(screen.getByRole('article')).toHaveAttribute('class', 'resume-card');
  });

  it('добавляет класс-микс родителя', () => {
    render(
      <ResumeCard
        title="Заголовок"
        date="2024"
        className="about-experience__item"
      />
    );

    expect(screen.getByRole('article')).toHaveClass(
      'resume-card',
      'about-experience__item'
    );
  });

  it('рендерит подпись над заголовком', () => {
    render(
      <ResumeCard label="ООО «Сервис Маркет»" title="Заголовок" date="2024" />
    );

    expect(screen.getByText('ООО «Сервис Маркет»')).toHaveClass(
      'resume-card__label'
    );
  });

  it('рендерит этапы: даты, сводки и пункты элементами списка', () => {
    render(
      <ResumeCard
        title="Frontend-разработчик"
        date="2023 — 2026"
        stages={STAGES}
      />
    );

    STAGES.forEach(({ date, summary }) => {
      expect(screen.getByText(date)).toBeInTheDocument();
      expect(screen.getByText(summary)).toBeInTheDocument();
    });

    // У каждого этапа свой список; пункты — listitem в своём списке
    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(2);
    expect(within(lists[0]).getAllByRole('listitem')).toHaveLength(3);
    expect(within(lists[1]).getAllByRole('listitem')).toHaveLength(2);
    expect(
      within(lists[0]).getByText('Запускаю акционные лендинги.')
    ).toBeInTheDocument();
  });

  it('этап без даты и без пунктов — только сводка, без пустого списка', () => {
    const { container } = render(
      <ResumeCard
        title="Заголовок"
        date="2024"
        stages={[
          { summary: 'Сводка без пунктов.' },
          { summary: 'Пустые пункты.', points: [] },
        ]}
      />
    );

    expect(screen.getByText('Сводка без пунктов.')).toBeInTheDocument();
    expect(container.querySelector('.resume-card__stage-date')).toBeNull();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('рендерит абзац text — вариант образования без этапов', () => {
    render(
      <ResumeCard
        label="PurpleSchool"
        title="Профессия Backend-разработчик на Python"
        date="Июнь 2026 — настоящее время"
        text="Расширяю компетенции в сторону backend-разработки."
      />
    );

    expect(
      screen.getByText('Расширяю компетенции в сторону backend-разработки.')
    ).toHaveClass('resume-card__text');
  });
});
