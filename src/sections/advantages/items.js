import website from '../../assets/svg/website.svg';
import deploy from '../../assets/png/deploy.webp';
import reactIcon from '../../assets/svg/react-js.svg';
import seo from '../../assets/png/seo.webp';
import bug from '../../assets/png/bag.webp';

const items = [
  {
    id: 1,
    text: 'advantages.items.first',
    icon: website,
    alt: '1 - Icon website',
  },
  {
    id: 2,
    text: 'advantages.items.second',
    icon: deploy,
    alt: '2 - Icon deploy',
  },
  {
    id: 3,
    text: 'advantages.items.third',
    icon: reactIcon,
    alt: '3 - Icon reactIcon',
  },
  { id: 4, text: 'advantages.items.fourth', icon: seo, alt: '4 - Icon seo' },
  {
    id: 5,
    text: 'advantages.items.fifth',
    icon: bug,
    alt: '5 - Icon for no bugs',
  },
];

export default items;
