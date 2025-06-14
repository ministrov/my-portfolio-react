import { useTranslation } from 'react-i18next';

const PromoTyping = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <span>{t('promo.part1')}</span>
      <span>{t('promo.part2')}</span>
    </div>
  );
};

export default PromoTyping;
