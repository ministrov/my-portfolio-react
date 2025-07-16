import { motion } from 'framer-motion';

const FadeIn = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.5, ease: 'easeInOut' },
      }}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn;