import { useRef, useState, useEffect, useCallback } from "react";
import useClickOutside from "../../hooks/useClickOutside.js";
import useEscapeKey from "../../hooks/useEscapeKey.js";
import config from "../../config";
import "./TrailerModal.scss";



const TrailerModal = ({ videoLink }) => {
    
    const dialogRef = useRef(null);
    const modalContentRef = useRef(null);
    const [iframeSrc, setIframeSrc] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [closeAnim, setCloseAnim] = useState('');
    const videoURL = `${config.youtubeTrailersEndpoint}/${videoLink}`


    // Fermer la modale si l'utilisateur clique en dehors
    useClickOutside([modalContentRef], () => {
        if (dialogRef.current?.open) {
            setIframeSrc('');
            handleCloseWithAnimation();
        }
    });


    // Fermer la modale si l'utilisateur appuie sur la touche "Échap"
    useEscapeKey(() => {
        if (dialogRef.current?.open) {
            setIframeSrc('');
            handleCloseWithAnimation();
        }
    });


    // Instructions pour fermer la modale avec l'animation
    const handleCloseWithAnimation = () => {
        setCloseAnim('closing-animation');
        setTimeout(() => {
            dialogRef.current.close();
            setCloseAnim(''); // Réinitialise l'animation pour la prochaine ouverture
        }, 400); // Délai pour permettre à l'animation de démarrer
    };
    

    // Fonction pour extraire l'ID de la vidéo depuis une URL complète
    const extractVideoId = useCallback((url) => {
        const regex = /www\.youtube-nocookie\.com\/embed\/([a-zA-Z0-9_-]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }, []);


    // Fonction pour vérifier si la miniature YouTube existe
    const checkVideoThumbnail = useCallback((videoId) => {
        const img = new Image();
        img.src = `${config.youtubeImgThumbnailEndpoint}/vi/${videoId}/mqdefault.jpg`;
    
        img.onload = () => {
            setErrorMessage(""); // Aucune erreur, la vidéo existe
            setIframeSrc(videoURL);
        };
    
        img.onerror = () => {
            setErrorMessage("Cette vidéo n'est plus disponible.");
            setIframeSrc("");
        };
    }, [setErrorMessage, setIframeSrc, videoURL]);


    // Gérer le cas d'erreur où l'URL est un lien mort
    useEffect(() => {
        if (videoURL) {
            const extractedVideoId = extractVideoId(videoURL);
            if (extractedVideoId) {
                checkVideoThumbnail(extractedVideoId);
            } else {
                setErrorMessage("URL de la vidéo invalide.");
                setIframeSrc("");
            }
        }
    }, [videoURL, extractVideoId, checkVideoThumbnail]);


    // Ouvrir la fenêtre modale
    const openModal = (e) => {
        e.preventDefault();
        if (dialogRef.current) {
            setIframeSrc("");
            dialogRef.current.showModal();
            setIframeSrc(videoURL);
        }
    };


    // Fermer la fenêtre modale
    const closeModal = (e) => {
        e.preventDefault();
        if (dialogRef.current) {
            setIframeSrc(""); // Vide l'iframe pour stopper la vidéo
            handleCloseWithAnimation();
        }
    };


    return (
        <>
        <p 
        tabIndex='0'
        onClick={(e) => openModal(e)} 
        onKeyDown={(e) => e.key === "Enter" && openModal(e)}
        className="trailer-modal__open-button">
            Voir le trailer
        </p>

        <dialog ref={dialogRef} className={`trailer-modal ${closeAnim}`}>
            <div className="trailer-modal__content" ref={modalContentRef}>
                <button 
                className="trailer-modal__close-button" 
                onClick={(e) => closeModal(e)}
                onKeyDown={(e) => e.key === ("Enter" || "Escape") && closeModal(e)}
                >
                    ✖
                </button>

            {errorMessage ? (
                <p className="trailer-modal__error">{errorMessage}</p>
            ) : (
                iframeSrc && (
                    <iframe
                        key={iframeSrc} // Force le re-render immédiat de l'iframe
                        src={iframeSrc}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                        className={`trailers-iframe`}
                    />
                )
            )}
                
            </div>
        </dialog>
        </>
    );
};

export default TrailerModal;