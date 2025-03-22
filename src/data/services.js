import { SlGlobe } from "react-icons/sl";
import { SiAffinitydesigner } from "react-icons/si";
import { TbSeo } from "react-icons/tb";

export const services = [
  {
    num: '01',
    title: 'Web Development',
    description: 'I craft responsive and intuitive web interfaces using cutting-edge technologies and best practices. My goal is to create websites that not only look stunning but also perform flawlessly across all devices.',
    href: '',
    icon: <SlGlobe color='white' size={25}/>
  },
  {
    num: '02',
    title: 'UI/UX Design',
    description: 'I design user-centric interfaces that prioritize usability and aesthetics, ensuring a smooth and enjoyable user experience. My focus is on creating visually appealing designs that enhance engagement and simplify interactions.',
    href: '',
    icon: <SiAffinitydesigner color='white' size={25}/>
  },
  {
    num: '03',
    title: 'SEO',
    description: 'I optimize websites to improve search engine rankings, driving organic traffic and increasing visibility online. By implementing effective SEO strategies, I ensure your content reaches its target audience and achieves maximum impact.',
    href: '',
    icon: <TbSeo color='white' size={25}/>
  }
];
