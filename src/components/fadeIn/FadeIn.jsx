import { motion } from 'framer-motion';

const FadeIn = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.5, ease: 'easeInOut' },
      }}
    // initial={{ opacity: 0, y: 10 }}
    // animate={{ opacity: 1, y: 0 }}
    // transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn;