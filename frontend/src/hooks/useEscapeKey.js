import { useEffect } from 'react';

// Hook personnalisé pour gérer la touche "Échap" (Escape)
// Ce hook exécute une fonction de rappel lorsque la touche "Échap" est pressée
const useEscapeKey = (callback) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                callback(e);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [callback]);
};

export default useEscapeKey;