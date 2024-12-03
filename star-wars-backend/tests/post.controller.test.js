const express = require('express')
const app = express()
app.use(express.json())
const { getPostAuthor } = require('../controllers/post.controller.js')
const { getPostsByTopicId } = require('../controllers/post.controller.js')
const User = require('../models/user.model.js');
const Topic = require('../models/topic.model.js')



// Mock du modèle User
jest.mock('../models/user.model.js');

// Mock du modèle Topic
jest.mock('../models/topic.model.js');


describe('getPostAuthor', () => {
    let req, res;

    beforeEach(() => {
        req = { params: { id: '6687c2722a8bff812fc1ac46' } }; // ID utilisateur dans req.params
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    it('devrait retourner l\'objet user correspondant à l\'id', async () => {
        // Mock d'un objet user
        const mockUser = {
            _id: '6687c2722a8bff812fc1ac46',
            name: 'Rafik Ben Sadi',
            picture: 'http://localhost:8000/images/face_co.png-1723932657585.webp',
            email: 'rafikbensadi@live.fr',
            password: '$2b$10$yQzZQsQNiN0l.HXTKC4i3uBbRZz4Ucebcfp3WqXKVVzaO93tnvxb6',
            isAdmin: true,
            __v: 0
        };

        // Simuler la résolution de la méthode findById avec mockUser
        User.findById.mockResolvedValueOnce(mockUser);

        // Appel du contrôleur
        await getPostAuthor(req, res);

        // Vérifier que findById a été appelé avec le bon ID
        expect(User.findById).toHaveBeenCalledWith('6687c2722a8bff812fc1ac46');
        
        // Vérifier que la réponse contient l'objet user attendu
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });
});

describe('getPostsByTopicId', () => {
    let req, res;

    const topicId = "testid"
    const pageNumber = 1

    beforeEach(() => {
        req = {
            params: { id: topicId }, // ID de la discussion dans req.params
            query: { page: pageNumber } // Numéro de la page dans req.query
        }; 

        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    it("devrait retourner tous les posts d'une discussion donnée, au maximum 10 posts par page", async () => {
        // Mock des données de la discussion avec ses posts
        const mockTopicWithPosts = {
            title: "Titre de la discussion",
            posts: [
                {
                    author: {
                        id: "authorId01"
                    },
                    _id: "postId01",
                    title: "Un chasseur, part 1",
                    content: "Un chasseur sachant chasser sans son chien...",
                    comments: [
                        "commentId01"
                    ],
                    likes: [
                        "likeId01",
                        "likeId02"
                    ],
                },
                {
                    author: {
                        id: "authorId02"
                    },
                    _id: "postId02",
                    title: "Un chasseur, part 2",
                    content: "C'est quoi la différence entre un bon et un mauvais chasseur ?",
                    comments: [],
                    likes: []
                },
            ],
            totalPages: 1,
            currentPage: pageNumber
        }

        // Mock de findById pour retourner un objet simulé avec la méthode populate
        await Topic.findById.mockReturnValue({
            populate: jest.fn().mockResolvedValue(mockTopicWithPosts),
        });

        // Exécuter le contrôleur
        await getPostsByTopicId(req, res);

        // Vérifier que findById a été appelé avec le bon ID
        expect(Topic.findById).toHaveBeenCalledWith(topicId);

        // Vérifier le status et la réponse JSON
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockTopicWithPosts);
    });
});