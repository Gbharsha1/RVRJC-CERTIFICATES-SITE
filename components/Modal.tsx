
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ShieldCheck } from 'lucide-react';
import { Certificate } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate | null;
}

// Cast to any to bypass environment-specific TypeScript errors with framer-motion props
const MDiv = motion.div as any;

const getImageUrl = (path: string) => {
  if (path.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${path.slice(1)}`;
  }
  return path;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, certificate }) => {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <MDiv
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        />
      )}
      {isOpen && (
        <MDiv
          key="modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none p-4"
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden pointer-events-auto flex flex-col md:flex-row relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white backdrop-blur rounded-full shadow-lg transition-all"
            >
              <X className="w-5 h-5 text-slate-800" />
            </button>

            <div className="h-64 w-full md:w-1/2 md:h-auto bg-slate-100 relative group">
              <img
                src={getImageUrl(certificate.imageUrl)}
                alt={certificate.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
                <span className="text-slate-400 text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Issued {certificate.date}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-2">{certificate.title}</h2>
              <p className="text-lg font-medium text-indigo-600 mb-6">{certificate.issuer}</p>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-auto">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">Description</h4>
                <p className="text-slate-700 leading-relaxed">
                  {certificate.description}
                </p>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200"
                >
                  Close
                </button>

              </div>
            </div>
          </div>
        </MDiv>
      )}
    </AnimatePresence>
  );
};

export default Modal;
