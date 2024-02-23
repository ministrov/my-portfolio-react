import gitHubicon from '../../assets/svg/gitHub-black.svg';
import './style.css';

const ButtonGitHub = ({ link }) => {
  return (
    <a href={link} target="_blank" className="btn-outline" rel="noreferrer">
      <img src={gitHubicon} alt="gitHub-black button" />
      GitHub repo
    </a>
  )
}

export default ButtonGitHub;