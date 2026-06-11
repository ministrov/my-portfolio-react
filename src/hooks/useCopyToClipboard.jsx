import { useCallback, useEffect, useRef, useState } from 'react';

/** Задержка автоматического сброса флага «скопировано» (мс). */
const RESET_DELAY = 2000;

/**
 * Хук копирования произвольного текста в буфер обмена.
 * После успешного копирования выставляет флаг `copied` и сбрасывает его
 * через `resetDelay`. Защищён от обновления стейта после размонтирования
 * (см. паттерн isMounted в LanguageProvider).
 *
 * @param {number} [resetDelay=2000] - Задержка сброса флага `copied` (мс).
 * @returns {Object} Объект состояния копирования:
 *   - copied: boolean — был ли текст только что скопирован;
 *   - copy: (text: string) => Promise<boolean> — копирует текст, возвращает успех.
 *
 * @example
 * const { copied, copy } = useCopyToClipboard();
 * <button onClick={() => copy('me@example.com')}>
 *   {copied ? 'Скопировано' : 'Копировать'}
 * </button>
 */
const useCopyToClipboard = (resetDelay = RESET_DELAY) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  /**
   * Копирует переданный текст в буфер обмена.
   * @param {string} text - Текст для копирования.
   * @returns {Promise<boolean>} Успешность операции.
   */
  const copy = useCallback(
    async (text) => {
      try {
        if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
        await navigator.clipboard.writeText(text);
        if (!isMountedRef.current) return true;

        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) setCopied(false);
        }, resetDelay);

        return true;
      } catch {
        return false;
      }
    },
    [resetDelay]
  );

  return { copied, copy };
};

export default useCopyToClipboard;
