import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from '../image/Image';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);

  // Закрытие по ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Блокировка скролла при открытии
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);

  // Фокусировка на модалке при открытии
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        data-testid="modal-overlay"
      >
        <motion.div
          ref={modalRef}
          className="project-modal"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
        >
          <button
            className="modal-close"
            onClick={onClose}
            aria-label={t('projectModal.close')}
          >
            &times;
          </button>

          <div className="modal-content">
            <div className="modal-image">
              <Image
                src={project.wepImg}
                fallback={project.img}
                alt={project.imageAlt}
                width={800}
                height={600}
              />
            </div>

            <div className="modal-details">
              <h2 id="modal-title">{project.title}</h2>
              <p className="modal-description">{project.description}</p>

              <div className="modal-technologies">
                <h3>{t('projectModal.technologies')}:</h3>
                <div className="tags-container">
                  {project.skills.map((skill, index) => (
                    <span key={index} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="modal-links">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="demo-link"
                  >
                    {t('projectModal.liveDemo')}
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;