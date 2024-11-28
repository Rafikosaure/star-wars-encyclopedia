const express = require('express')
const app = express()
app.use(express.json())
const { getPostAuthor } = require('../controllers/post.controller.js')
const User = require('../models/user.model.js');
const Post = require('../models/post.model.js')



// Mock du modèle User
jest.mock('../models/user.model.js');

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
