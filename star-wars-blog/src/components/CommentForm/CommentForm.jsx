import React, { useState, useRef } from 'react'
import './CommentForm.scss'
import { reinitializeCommentCitation, selectCommentCitation } from '../../redux/slices/commentCitationSlice'
import { useSelector, useDispatch } from 'react-redux'
import { reloadUsersArrayFunction } from '../../redux/slices/reloadUsersArray'
import { reloadPosts } from '../../redux/slices/postsReload'
import { selectLoggedUser } from '../../redux/slices/loggedUserSlice'
import { ServerServices } from '../../api/api-server'
import mentionsManager from '../../sharedFunctions/mentionsManager'
import subscribersManager from '../../sharedFunctions/subscribersManager'



export default function CommentForm({ post, usersList, topicId, currentPage }) {

    const currentCommentCitation = useSelector(selectCommentCitation)
    const commentCitationText = currentCommentCitation.text
    const commentCitationAuthorId = currentCommentCitation.authorId
    const commentCitationPostId = currentCommentCitation.postId
    const loggedUser = useSelector(selectLoggedUser)
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1); // Index de la suggestion sélectionnée
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [isMentionValidated, setIsMentionValidated] = useState(false)
    const textareaRef = useRef(null);
    const usernames = usersList.map(user => user.name)
    const dispatch = useDispatch()
    const { createCommentRequest } = ServerServices


    // Créer un commentaire
    const createNewComment = async (data) => {
        if (data.keyCode === 13 && data.shiftKey === false && !isMentionValidated) {
            data.preventDefault()
            if (data.target.value.length === 0) {
                dispatch(reinitializeCommentCitation())
                return
            }
    
            // Construction du corps de la requête
            const fetchContent = data.target.value.replace(/\s+/g, ' ').trim()
            let fetchData = {
                post: post._id,
                content: fetchContent,
                author: {
                    id: loggedUser._id
                },
                likes: []
            }
    
            // Gestion des éventuelles citations
            if (commentCitationText && commentCitationAuthorId && commentCitationPostId === post._id) {
                const fetchCitationText = commentCitationText.split("a dit :").at(-1).trim().replace(/^"|"$/g, "")
                fetchData.citation = {
                    citationAuthorId: commentCitationAuthorId, 
                    citationText: fetchCitationText
                }
            }
    
            try {
                // Envoi de la requête pour créer le commentaire
                const result = await createCommentRequest(post._id, fetchData);
    
                // Gestion des mentions
                dispatch(reloadUsersArrayFunction(false))
                mentionsManager(fetchContent, result._id, usersList, topicId, currentPage)
                
                // Gestion des abonnés à la discussion
                subscribersManager(topicId, result._id, loggedUser, "commentaire", currentPage)
                
                // Rafraîchissement des commentaires affichés
                dispatch(reloadPosts())
            } catch (error) {
                console.error('Erreur lors de la création du commentaire:', error);
            }
    
            setText('')
            dispatch(reinitializeCommentCitation())
        }
    }
    

    // Gestion de l'autocomplétion en cas de mention
    const handleChange = (e) => {
        const value = e.target.value;
        setText(value);

        const cursorPosition = e.target.selectionStart;
        const textBeforeCursor = value.slice(0, cursorPosition);
        const lastWord = textBeforeCursor.split(' ').pop();

        if (lastWord.startsWith('@') && usernames.length !== 0) {
            setIsMentionValidated(true)
            const query = lastWord.slice(1).toLowerCase();
            const matches = usernames.filter((user) =>
                user.toLowerCase().includes(query)
            );

            setSuggestions(matches);
            setShowSuggestions(matches.length > 0);
            setSelectedIndex(-1); // Réinitialiser l'index sélectionné

            const textarea = textareaRef.current;
            const caretPos = getCaretCoordinates(textarea, cursorPosition);

            if (caretPos) {
                setPosition(caretPos);
            }
        } else {
            setShowSuggestions(false);
            setIsMentionValidated(false)
        }
    };


    // Gestion du clavier en cas de mention
    const handleKeyDown = (e) => {
        if (!showSuggestions) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev > 0 ? prev - 1 : suggestions.length - 1
            );
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                handleSuggestionClick(suggestions[selectedIndex]);
            }
            setIsMentionValidated(false)
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setIsMentionValidated(false)
        }
    };


    // Gestion des suggestions
    const handleSuggestionClick = (suggestion) => {
        const words = text.split(' ');
        words.pop(); // Supprime "@query"
        setText(words.join(' ') + ' @' + suggestion);
        setShowSuggestions(false);
    };


  return (
    <>
        <form className='new-comment-form' 
            onKeyDown={(e) => createNewComment(e)}
            >
            {commentCitationText && commentCitationPostId === post._id && (
                <div className='comment-citation-div'>
                    <span className='comment-citation-cancel' title='Annuler la citation' onClick={() => dispatch(reinitializeCommentCitation())}>✖</span>
                    <p className='comment-citation-content'>{commentCitationText}</p>
                </div>
            )}

            <textarea className='new-comment-form-textarea' name='newComment' type="text" maxLength={500} placeholder='Tapez un commentaire' 
            required 
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Gestion des événements clavier
            />
                {showSuggestions && (
                    <ul
                        className='comment-form-suggestions-list'
                        style={{
                            top: `${position.top}px`,
                            left: `${position.left}px`,
                        }}
                    >
                        {suggestions.map((s, i) => (
                            <li
                                className='comment-form-suggestion-item'
                                key={i}
                                ref={selectedIndex === i ? (el) => el?.scrollIntoView({ block: 'nearest' }) : null} // Gérer le scroll automatique
                                onClick={() => handleSuggestionClick(s)}
                                style={{
                                    color:
                                        i === selectedIndex ? 'black' : 'white',
                                    backgroundColor:
                                        i === selectedIndex ? 'white' : 'black' // Surligner la suggestion active
                                }}
                            >
                                {s}
                            </li>
                        ))}
                    </ul>
                )}
        </form>
    </>
  )
}


// Fonction pour récupérer la position du curseur
const getCaretCoordinates = (textarea, cursorPosition) => {
    const style = getComputedStyle(textarea);
    const div = document.createElement('div');
    const span = document.createElement('span');
    Object.assign(div.style, {
        position: 'absolute',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        visibility: 'hidden',
        top: 0,
        left: 0,
        font: style.font,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        padding: style.padding,
        border: style.border,
        boxSizing: style.boxSizing,
        width: `${textarea.offsetWidth}px`,
    });

    const textBeforeCursor = textarea.value.slice(0, cursorPosition);
    div.textContent = textBeforeCursor;
    span.textContent = '|';
    div.appendChild(span);

    document.body.appendChild(div);

    const spanRect = span.getBoundingClientRect();
    const top = spanRect.top + window.scrollY;
    const left = spanRect.left + window.scrollX;

    document.body.removeChild(div);

    return { top, left };
};