
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { Certificate } from '../types';

interface CertificateCardProps {
  certificate: Certificate;
  onClick: (cert: Certificate) => void;
}

// Cast to any to bypass environment-specific TypeScript errors with framer-motion props
const MButton = motion.button as any;

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onClick }) => {
  return (
    <MButton
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(certificate)}
      className="w-full text-left bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex items-center group"
    >
      <div className="bg-indigo-50 p-4 rounded-xl mr-5 group-hover:bg-indigo-600 transition-colors duration-300">
        <Award className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors duration-300" />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-800 leading-tight">
          {certificate.title}
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          {certificate.issuer} • {certificate.date}
        </p>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-2">
        <ExternalLink className="w-5 h-5 text-slate-400" />
      </div>
    </MButton>
  );
};

export default CertificateCard;
