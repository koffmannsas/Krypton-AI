import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code) {
      console.log('Authorization code:', code);
      // Prêt pour traitement OAuth (e.g. envoyer au backend pour échanger contre un token d'accès)
    }
  }, [searchParams]);

  return (
    <>
      <Helmet>
        <title>Authentification | Krypton AI</title>
      </Helmet>
      
      <div className="bg-[#050505] text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
        >
          <div className="w-16 h-16 bg-[#FF2718]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF2718]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-black mb-4 uppercase tracking-tighter">
            Connexion réussie
          </h1>
          
          <p className="text-slate-400 mb-8">
            L'authentification a été effectuée avec succès. Vous pouvez maintenant fermer cette page et retourner à votre application.
          </p>

          <button 
            onClick={() => window.close()}
            className="w-full py-4 px-6 bg-[#FF2718] hover:bg-[#E10600] text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            Fermer cette page
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default AuthCallbackPage;
