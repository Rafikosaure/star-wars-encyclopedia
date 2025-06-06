import { useEffect } from 'react'

/**
 * Gère les clics/touches en dehors des éléments référencés.
 * @param {React.RefObject[]} refs - Un ou plusieurs refs d’éléments DOM.
 * @param {Function} handler - Fonction appelée si clic/tap en dehors.
 */
function useClickOutside(refs, handler) {
    useEffect(() => {
        const listener = (event) => {
            // Si le clic est dans l'un des éléments référencés, on ne fait rien
            const isInside = refs.some(ref => {
                return ref.current && ref.current.contains(event.target)
            })

            if (!isInside) {
                handler(event)
            }
        }

        document.addEventListener('mouseup', listener)
        document.addEventListener('touchend', listener)

        return () => {
            document.removeEventListener('mouseup', listener)
            document.removeEventListener('touchend', listener)
        }
    }, [refs, handler])
}

export default useClickOutside