
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Boxes, Sparkles, ArrowLeft } from 'lucide-react';
import CertificateCard from './components/CertificateCard';
import Modal from './components/Modal';
import { CERTIFICATES, BRAND } from './constants';
import { Certificate } from './types';

// Cast to any to bypass environment-specific TypeScript errors with framer-motion props
const MDiv = motion.div as any;
const MAnchor = motion.a as any;

const App: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCertClick = (cert: Certificate) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen relative selection:bg-indigo-100 selection:text-indigo-900">
      <MAnchor
        href="https://Gbharsha1.github.io/"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 left-6 z-50 p-3 bg-white/80 backdrop-blur-md border border-white/50 shadow-lg rounded-full text-slate-600 hover:text-indigo-600 hover:scale-110 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </MAnchor>
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/Internships.jpg)` }}
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full min-h-screen">
        <main className="max-w-7xl mx-auto px-6 py-12 lg:py-0 lg:h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-12 items-center">

            {/* Left Column: Branding */}
            <MDiv
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="relative group">
                <MDiv
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`w-24 h-24 sm:w-32 sm:h-32 ${BRAND.logoColor} rounded-[2rem] shadow-2xl shadow-indigo-200 flex items-center justify-center mb-8 relative z-10`}
                >
                  <span className="text-3xl sm:text-4xl font-bold text-white tracking-tighter">
                    GB<span className="text-indigo-200">HV</span>
                  </span>
                </MDiv>
                <div className="absolute -inset-4 bg-indigo-400/20 rounded-[3rem] blur-2xl group-hover:bg-indigo-400/30 transition-all duration-500"></div>
              </div>

              <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4">
                {BRAND.name}
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-md">
                {BRAND.tagline}
              </p>

              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm text-sm text-slate-600 font-semibold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Industry Standard Certified
                </div>
              </div>
            </MDiv>

            {/* Right Column: Certificates */}
            <MDiv
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold text-slate-800 font-handwriting">My Certificates</h2>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-6"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {CERTIFICATES.map((cert, index) => (
                  <MDiv
                    key={cert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <CertificateCard
                      certificate={cert}
                      onClick={handleCertClick}
                    />
                  </MDiv>
                ))}
              </div>

              <div className="mt-8 text-center lg:text-left">
                <p className="text-slate-400 text-sm">

                </p>
              </div>
            </MDiv>
          </div>
        </main>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          certificate={selectedCert}
        />

        <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 text-slate-500 text-xs hidden lg:flex items-center justify-center bg-white/80 backdrop-blur-md border border-white/50 shadow-lg px-6 py-2 rounded-full z-50">
          &copy; {new Date().getFullYear()} {BRAND.name}. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default App;
