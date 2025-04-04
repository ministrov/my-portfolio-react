// import { useTranslation } from 'react-i18next';
import ServicesListItem from '../../components/servicesListItem/ServicesListItem';
import { motion } from 'framer-motion';
import { SlGlobe } from 'react-icons/sl';
import { SiAffinitydesigner } from 'react-icons/si';
import { TbSeo } from 'react-icons/tb';
import './style.css';

const Services = () => {
  // const { t } = useTranslation();

  // console.log(t);
  const services = [
    {
      num: '01',
      title: 'Web Development',
      description:
        'I craft responsive and intuitive web interfaces using cutting-edge technologies and best practices. My goal is to create websites that not only look stunning but also perform flawlessly across all devices.',
      href: '',
      icon: <SlGlobe color="white" size={25} />,
    },
    {
      num: '02',
      title: 'UI/UX Design',
      description:
        'I design user-centric interfaces that prioritize usability and aesthetics, ensuring a smooth and enjoyable user experience. My focus is on creating visually appealing designs that enhance engagement and simplify interactions.',
      href: '',
      icon: <SiAffinitydesigner color="white" size={25} />,
    },
    {
      num: '03',
      title: 'SEO',
      description:
        'I optimize websites to improve search engine rankings, driving organic traffic and increasing visibility online. By implementing effective SEO strategies, I ensure your content reaches its target audience and achieves maximum impact.',
      href: '',
      icon: <TbSeo color="white" size={25} />,
    },
  ];

  return (
    <section className="services">
      <h2 className="visually-hidden">Section for a services</h2>
      <div className="container">
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.4, duration: 0.7, ease: 'easeIn' },
          }}
          className="services__list"
        >
          {services.map((service) => (
            <ServicesListItem key={service.num} service={service} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Services;
