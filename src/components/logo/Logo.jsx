import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import "./style.css";

const Logo = ({ type = null, className }) => {
  const { t } = useTranslation();
  return (
    <div className={`${className}__logo logo`}>
      <Link to="/" className={`logo__name ${type}`}>
        {t("logoName")}
      </Link>
    </div>
  );
};

export default Logo;
