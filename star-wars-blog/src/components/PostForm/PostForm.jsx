import React, { useState, useRef, useEffect } from 'react';
import './PostForm.scss'
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice';
import { selectReloadUsersState, reloadUsersArrayFunction } from '../../redux/slices/reloadUsersArray';
import { ServerServices } from '../../api/api-server';



export default function PostForm({ setDescription, toReset, setToReset }) {

    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [usersList, setUsersList] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(-1); // Index de la suggestion sélectionnée
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const textareaRef = useRef(null);
    const isLogged = useSelector(selectIsLoggedState)
    const reloadUsers = useSelector(selectReloadUsersState)
    const dispatch = useDispatch()
    const { getAllUsers } = ServerServices


    // Reset le textarea
    useEffect(() => {
        if (toReset) {
            setText('')
            setToReset(false)
        }
    }, [toReset, setToReset])


    // Récupération des utilisateurs du site
    useEffect(() => {    
        if (isLogged && (usersList.length === 0 || !reloadUsers)) {
            getAllUsers()
            .then(data => {
                const usersnames = data.map(user => user.name)
                setUsersList(usersnames)
            })
            .catch(error => {
                console.log(error)
            })
            dispatch(reloadUsersArrayFunction(true))
        }
    }, [isLogged, usersList, reloadUsers, dispatch, getAllUsers])


    // Gérer l'autocomplétion en cas de mention
    const handleChange = (e) => {
        const value = e.target.value;
        setDescription(value)
        setText(value);

        const cursorPosition = e.target.selectionStart;
        const textBeforeCursor = value.slice(0, cursorPosition);
        const lastWord = textBeforeCursor.split(' ').pop();

        if (lastWord.startsWith('@') && usersList.length !== 0) {
            const query = lastWord.slice(1).toLowerCase();
            const matches = usersList.filter((user) =>
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
        }
    };

    // Gérer le clavier en cas de mention
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
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    // Gérer les suggestions en cas de mention
    const handleSuggestionClick = (suggestion) => {
        const words = text.split(' ');
        words.pop(); // Supprime "@query"
        setText(words.join(' ') + ' @' + suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className='post-form-wrapper'>
            <textarea
                placeholder='Tapez votre post'
                maxLength={500}
                ref={textareaRef}
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown} // Gestion des événements clavier
                className='post-form-textarea'
                required
            />
            {showSuggestions && (
                <ul
                    className='post-form-suggestions-list'
                    style={{
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                    }}
                >
                    {suggestions.map((s, i) => (
                        <li
                            className='post-form-suggestion-item'
                            key={i}
                            ref={selectedIndex === i ? (el) => el?.scrollIntoView({ block: 'nearest' }) : null} // Gérer le scroll automatique
                            onClick={() => handleSuggestionClick(s)}
                            style={{
                                backgroundColor:
                                    i === selectedIndex ? 'rgb(53, 155, 155)' : 'white', // Surligner la suggestion active
                            }}
                        >
                            {s}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

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