import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import i18n from '../../utils/i18n/index'; // инициализирует i18next (язык по умолчанию — ru)
import AvailabilityBadge from './AvailabilityBadge';

describe('AvailabilityBadge', () => {
  afterEach(async () => {
    // i18n — синглтон модуля: возвращаем язык, чтобы тесты не влияли друг на друга
    await act(() => i18n.changeLanguage('ru'));
  });

  it('показывает статус на русском', () => {
    render(<AvailabilityBadge />);

    expect(screen.getByText('Открыт к предложениям')).toBeInTheDocument();
  });

  it('показывает статус на английском', async () => {
    render(<AvailabilityBadge />);

    await act(() => i18n.changeLanguage('en'));

    expect(screen.getByText('Open to work')).toBeInTheDocument();
    expect(screen.queryByText('Открыт к предложениям')).not.toBeInTheDocument();
  });

  it('по умолчанию светлый — без модификатора --dark', () => {
    render(<AvailabilityBadge />);

    const badge = screen.getByText('Открыт к предложениям');
    expect(badge).toHaveClass('availability-badge');
    expect(badge).not.toHaveClass('availability-badge--dark');
  });

  it('вариант dark ставит модификатор --dark', () => {
    render(<AvailabilityBadge variant="dark" />);

    expect(screen.getByText('Открыт к предложениям')).toHaveClass(
      'availability-badge',
      'availability-badge--dark'
    );
  });

  it('добавляет класс-микс родителя', () => {
    render(<AvailabilityBadge className="author-meta__badge" />);

    expect(screen.getByText('Открыт к предложениям')).toHaveClass(
      'availability-badge',
      'author-meta__badge'
    );
  });

  it('точка статуса декоративная и скрыта от скринридера', () => {
    const { container } = render(<AvailabilityBadge />);

    expect(container.querySelector('.availability-badge__dot')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });
});
