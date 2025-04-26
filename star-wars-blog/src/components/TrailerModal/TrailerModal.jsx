import { useRef, useState, useEffect, useCallback } from "react";
import "./TrailerModal.scss";



const TrailerModal = ({ videoURL }) => {
    
    const dialogRef = useRef(null);
    const [iframeSrc, setIframeSrc] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    // Fonction pour extraire l'ID de la vidéo depuis une URL complète
    const extractVideoId = useCallback((url) => {
        const regex = /www\.youtube-nocookie\.com\/embed\/([a-zA-Z0-9_-]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }, []);


    // Fonction pour vérifier si la miniature YouTube existe
    const checkVideoThumbnail = useCallback((videoId) => {
        const img = new Image();
        img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    
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
            dialogRef.current.close();
        }
    };


    // Ferme la modale uniquement si l'utilisateur clique sur l'arrière-plan
    const handleBackdropClick = (e) => {
        if (e.target === dialogRef.current) {
            closeModal(e);
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

        <dialog ref={dialogRef} className="trailer-modal" onClick={(e) => handleBackdropClick(e)}>
            <div className="trailer-modal__content">
                <button 
                className="trailer-modal__close-button" 
                onClick={(e) => closeModal(e)}
                onKeyDown={(e) => e.key === "Enter" && closeModal(e)}
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
                        className="trailers-iframe"
                    />
                )
            )}
                
            </div>
        </dialog>
        </>
    );
};

export default TrailerModal;