import { useState, useEffect, useCallback } from 'react'
import './Like.scss'
import { useSelector } from 'react-redux'
import { selectIsLoggedState } from '../../redux/slices/isLoggedUserSlice'
import { selectLoggedUser } from '../../redux/slices/loggedUserSlice'
import { ServerServices } from '../../api/api-server'



export default function Like({ post, comment }) {

    const loggedUser = useSelector(selectLoggedUser)
    const isLogged = useSelector(selectIsLoggedState)
    const [likeColor, updateLikeColor] = useState("black")
    const [likeArray, updateLikeArray] = useState([])
    const [currentUserLike, updateCurrentUserLike] = useState()
    const [likeIsHere, setLikeIsHere] = useState(false)
    const [commentLike, setCommentLike] = useState()
    const { getLikes, attributeLike, dislikeRequest } = ServerServices


    // Id d'un post ou d'un commentaire ?
    const isPostOrComment = useCallback(() => {
        let typeId;
        if (post) {
            typeId = post._id;
            setCommentLike();
        } else if (comment) {
            typeId = comment._id;
            setCommentLike("comment-like");
        }
        return typeId;
    }, [post, comment, setCommentLike]);


    // Récupération du tableau de likes du post / du commentaire courant
    useEffect(() => {
        const fetchLikes = async () => {
            const typeId = isPostOrComment();
            if (post || comment) {
                try {
                    const likesData = await getLikes(typeId);
                    updateLikeArray(likesData);
                    setLikeIsHere(false);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchLikes();
    }, [isPostOrComment, post, comment, likeIsHere, getLikes]);


    // Gestion de l'affichage : message "liké" ou non
    useEffect(() => {
        if (likeArray && loggedUser) {
            const userLike = likeArray.find(like => like.user === loggedUser._id)
            if (userLike) {
                updateLikeColor('white')
            } else {
                updateLikeColor('black')
            }
            updateCurrentUserLike(userLike)
        }
    }, [likeArray, loggedUser])


    // Fonction pour liker un post / un commentaire
    const attributeALike = async () => {
        const typeId = isPostOrComment();
        if (post || comment) {
            try {
                await attributeLike(typeId);
                setLikeIsHere(true);
            } catch (error) {
                console.log(error);
            }
        }
    };


    // "Disliker" un post / un commentaire
    const dislike = async () => {
        isPostOrComment()
        if (post || comment) {
            try {
                await dislikeRequest(currentUserLike._id);
                setLikeIsHere(true);
            } catch (error) {
                console.log(error);
            }
        }
    };

    
    // Appel au like / au dislike (alternance)
    const likeOrDislike = (e) => {
        e.preventDefault()
        if (currentUserLike) {
            dislike()
        } else {
            attributeALike()
        }
    }


    return (
        <>
        <div className={`like-thumb-div ${commentLike}`}>
        {isLogged ? (
            <svg
                onClick={(e) => likeOrDislike(e)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        likeOrDislike(e)
                    }
                }}
                tabIndex="0" 
                className={`like-svg`} 
                version="1.0"
                width="512pt"
                height="436pt"
                viewBox="0 0 512 436"
                preserveAspectRatio="xMidYMid"
                id="svg2"
                sodipodidocname="like3.svg"
                xmlnsinkscape="http://www.inkscape.org/namespaces/inkscape"
                xmlnssodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                xmlns="http://www.w3.org/2000/svg"
                xmlnssvg="http://www.w3.org/2000/svg">
                <defs
                id="defs2" />
                <sodipodinamedview
                id="namedview2"
                pagecolor="#ffffff"
                bordercolor="#000000"
                borderopacity="0.25"
                inkscapeshowpageshadow="2"
                inkscapepageopacity="0.0"
                inkscapepagecheckerboard="0"
                inkscapedeskcolor="#d1d1d1"
                inkscapedocument-units="pt" />
                <g
                transform="matrix(0.1,0,0,-0.1,0,436)"
                fill="#000000"
                stroke="none"
                id="g2"
                inkscapelabel="g2">
                <path
                d="m 2796,4330 c -61,-24 -119,-79 -154,-145 l -27,-50 -5,-320 -6,-320 -46,-130 c -134,-377 -271,-625 -433,-789 -110,-111 -211,-170 -353,-206 l -42,-11 2,-957 c 3,-1099 -9,-975 112,-1101 75,-78 167,-143 252,-179 123,-51 150,-53 1244,-50 l 1015,3 54,30 c 148,82 253,277 296,548 4,23 19,53 39,75 125,138 206,361 206,563 0,63 3,73 34,114 57,74 79,145 84,270 2,61 -1,146 -8,191 -12,80 -11,83 20,173 79,232 37,438 -123,595 -88,87 -197,146 -335,183 -97,26 -99,26 -563,31 l -465,4 15,96 c 10,65 15,179 15,347 0,240 -1,254 -26,347 -36,130 -86,242 -155,346 -181,272 -455,417 -647,342 z m 221,-235 c 67,-34 181,-139 235,-218 103,-152 147,-295 155,-504 8,-198 -7,-339 -74,-720 l -6,-33 h 584 c 642,0 650,-1 778,-62 76,-36 154,-110 181,-171 40,-91 32,-225 -19,-325 -29,-57 -34,-118 -17,-192 18,-77 21,-223 5,-271 -14,-39 -42,-74 -82,-99 l -28,-17 -3,-149 c -3,-171 -18,-241 -74,-348 -20,-38 -57,-92 -82,-120 -64,-69 -68,-81 -90,-209 -21,-124 -39,-181 -75,-243 -33,-56 -97,-112 -137,-119 -18,-3 -474,-5 -1013,-3 l -980,3 -66,22 c -73,25 -130,62 -201,131 l -48,46 v 851 850 l 76,39 c 300,154 544,510 735,1074 l 59,175 v 299 299 l 26,26 c 21,21 32,25 65,20 22,-3 65,-18 96,-32 z"
                id="path1"
                />
                <path
                d="M 116,2550 C 79,2538 31,2494 14,2453 2,2426 0,2227 0,1282 V 144 L 22,100 C 37,70 59,47 85,33 l 40,-23 657,3 c 646,2 657,2 684,23 40,29 64,65 74,110 12,49 12,2213 1,2273 -11,57 -37,91 -91,119 l -44,22 -631,-1 c -346,0 -643,-5 -659,-9 z"
                id="path2"
                fill='white'
                inkscapelabel="path2" 
                />
                <path
                fill={likeColor}
                d="m 295.89304,538.82958 c -10.36655,-3.71054 -16.69598,-7.64694 -26.26593,-16.3353 l -7.37059,-6.69161 -0.0669,-113.4985 -0.0669,-113.49851 7.83955,-4.04559 c 42.94497,-22.16166 73.22723,-66.54959 101.5279,-148.82026 l 6.41678,-18.65371 V 77.229927 37.173754 l 3.21854,-2.907762 c 3.8938,-3.51781 5.66788,-3.630339 14.29055,-0.906441 7.48142,2.363378 14.59384,7.103631 24.15723,16.100179 12.49016,11.74985 22.2339,27.116798 27.80413,43.85019 7.12814,21.41345 8.53338,51.85122 4.01853,87.04198 -1.25683,9.79628 -7.17863,46.61771 -8.06571,50.15209 l -0.46898,1.86853 65.81885,0.0109 c 72.20763,0.012 92.81293,0.64593 102.62348,3.15731 12.49045,3.1974 26.62553,12.29229 33.51463,21.56419 4.74831,6.39065 6.61411,12.08084 7.05009,21.50086 0.45242,9.77509 -0.90217,16.91181 -4.96296,26.14773 -4.52163,10.28404 -4.97619,17.46869 -2.03383,32.14641 1.2936,6.45304 1.29558,26.21956 0.003,30.15215 -2.02613,6.16447 -6.41694,11.21488 -13.3074,15.30647 -1.24359,0.73845 -1.47501,3.02964 -2.03033,20.10143 -0.68277,20.98963 -1.72282,27.99034 -5.68813,38.2876 -2.92535,7.59666 -9.63369,18.4023 -16.10558,25.9425 -7.14095,8.31971 -7.75106,9.96643 -11.94023,32.22737 -3.18441,16.92176 -7.15087,26.06728 -14.76891,34.05297 -2.87538,3.01414 -6.60089,5.9524 -8.94717,7.05651 l -4.02029,1.89187 -131.86538,-0.0337 -131.86537,-0.0337 z"
                id="path4"
                transform="matrix(7.5,0,0,-7.5,0,4360)" 
                />
                </g>
                {post && currentUserLike && (
                    <title>Disliker ce post</title>
                )}
                {post && !currentUserLike && (
                    <title>Liker ce post</title>
                )}
                {!post && currentUserLike && (
                    <title>Disliker ce commentaire</title>
                )}
                {!post && !currentUserLike && (
                    <title>Liker ce commentaire</title>
                )}
                
            </svg>
        ) : (
            <svg
                className={`like-svg-disabled`}
                version="1.0"
                width="512pt"
                height="436pt"
                viewBox="0 0 512 436"
                preserveAspectRatio="xMidYMid"
                id="svg2"
                sodipodidocname="like-disabled.svg"
                inkscapeversion="1.3.2 (091e20e, 2023-11-25, custom)"
                inkscapeexport-filename="like-disabled.svg"
                inkscapeexport-xdpi="96"
                inkscapeexport-ydpi="96"
                xmlnsinkscape="http://www.inkscape.org/namespaces/inkscape"
                xmlnssodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                xmlns="http://www.w3.org/2000/svg"
                xmlnssvg="http://www.w3.org/2000/svg">
                <defs id="defs2" />
                <sodipodinamedview
                id="namedview2"
                pagecolor="#ffffff"
                bordercolor="#000000"
                borderopacity="0.25"
                inkscapeshowpageshadow="2"
                inkscapepageopacity="0.0"
                inkscapepagecheckerboard="0"
                inkscapedeskcolor="#d1d1d1"
                inkscapedocument-units="pt"
                inkscapezoom="1.059082"
                inkscapecx="341.33334"
                inkscapecy="289.40158"
                inkscapewindow-width="1760"
                inkscapewindow-height="919"
                inkscapewindow-x="-8"
                inkscapewindow-y="-8"
                inkscapewindow-maximized="1"
                inkscapecurrent-layer="g2" 
                />
                <g
                transform="matrix(0.1,0,0,-0.1,0,436)"
                fill="#000000"
                stroke="none"
                id="g2"
                inkscapelabel="g2">
                <path
                d="m 2796,4330 c -61,-24 -119,-79 -154,-145 l -27,-50 -5,-320 -6,-320 -46,-130 c -134,-377 -271,-625 -433,-789 -110,-111 -211,-170 -353,-206 l -42,-11 2,-957 c 3,-1099 -9,-975 112,-1101 75,-78 167,-143 252,-179 123,-51 150,-53 1244,-50 l 1015,3 54,30 c 148,82 253,277 296,548 4,23 19,53 39,75 125,138 206,361 206,563 0,63 3,73 34,114 57,74 79,145 84,270 2,61 -1,146 -8,191 -12,80 -11,83 20,173 79,232 37,438 -123,595 -88,87 -197,146 -335,183 -97,26 -99,26 -563,31 l -465,4 15,96 c 10,65 15,179 15,347 0,240 -1,254 -26,347 -36,130 -86,242 -155,346 -181,272 -455,417 -647,342 z m 221,-235 c 67,-34 181,-139 235,-218 103,-152 147,-295 155,-504 8,-198 -7,-339 -74,-720 l -6,-33 h 584 c 642,0 650,-1 778,-62 76,-36 154,-110 181,-171 40,-91 32,-225 -19,-325 -29,-57 -34,-118 -17,-192 18,-77 21,-223 5,-271 -14,-39 -42,-74 -82,-99 l -28,-17 -3,-149 c -3,-171 -18,-241 -74,-348 -20,-38 -57,-92 -82,-120 -64,-69 -68,-81 -90,-209 -21,-124 -39,-181 -75,-243 -33,-56 -97,-112 -137,-119 -18,-3 -474,-5 -1013,-3 l -980,3 -66,22 c -73,25 -130,62 -201,131 l -48,46 v 851 850 l 76,39 c 300,154 544,510 735,1074 l 59,175 v 299 299 l 26,26 c 21,21 32,25 65,20 22,-3 65,-18 96,-32 z"
                id="path5"
                inkscapelabel="path1" 
                />
                <path
                d="M 116,2550 C 79,2538 31,2494 14,2453 2,2426 0,2227 0,1282 V 144 L 22,100 C 37,70 59,47 85,33 l 40,-23 657,3 c 646,2 657,2 684,23 40,29 64,65 74,110 12,49 12,2213 1,2273 -11,57 -37,91 -91,119 l -44,22 -631,-1 c -346,0 -643,-5 -659,-9 z"
                id="path6"
                inkscapelabel="path2"
                />
                </g>
                {post ? (
                    <title>Connectez-vous pour liker ce post</title>
                ) : (
                    <title>Connectez-vous pour liker ce commentaire</title>
                )}
                
            </svg>
            )}
        </div>
        <div className='like-counter-div'>
            {likeArray && (
                post ? (
                    <p className='like-counter' style={{cursor: 'default'}}>{likeArray.length}</p>
                ) : (
                    <p className='like-counter' style={{cursor: 'default', fontSize: '11px'}}>{likeArray.length}</p>
                )
            )}
        </div>
        </>
    )
}
