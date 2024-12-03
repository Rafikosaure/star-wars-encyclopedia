const express = require('express')
const app = express()
app.use(express.json())
const { getPostAuthor } = require('../controllers/post.controller.js')
const { getPostsByTopicId } = require('../controllers/post.controller.js')
const { deletePostById } = require('../controllers/post.controller.js');
const { modifyPost } = require('../controllers/post.controller.js');
const Post = require('../models/post.model.js');
const Topic = require('../models/topic.model.js');
const Comment = require('../models/comment.model.js');
const Like = require('../models/like.model.js');
const User = require('../models/user.model.js');


jest.mock('../models/post.model.js');
jest.mock('../models/topic.model.js');
jest.mock('../models/comment.model.js');
jest.mock('../models/like.model.js');
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

describe('Contrôleur deletePostById', () => {
    let req, res;

    beforeEach(() => {
        // Initialiser les objets req et res pour chaque test
        req = {
            params: { id: 'post123' }, // ID du post à supprimer
            user: { id: 'user123' },  // ID de l'utilisateur effectuant la suppression
        };

        res = {
            status: jest.fn().mockReturnThis(), // Mock pour la méthode status()
            json: jest.fn(),                   // Mock pour la méthode json()
        };

        jest.clearAllMocks(); // Réinitialiser les mocks avant chaque test
    });

    it("devrait retourner une erreur si l'utilisateur n'est pas administrateur", async () => {
        // Simuler un utilisateur non administrateur
        User.findById.mockResolvedValue({ isAdmin: false });

        // Appeler le contrôleur
        await deletePostById(req, res);

        // Vérifier les appels et la réponse
        expect(User.findById).toHaveBeenCalledWith('user123');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Access forbidden!' });
    });

    it('devrait supprimer un post et toutes les données associées si l’utilisateur est administrateur', async () => {
        // Mock pour un utilisateur administrateur
        User.findById.mockResolvedValue({ isAdmin: true });

        // Mock pour le topic contenant le post
        const mockTopic = {
            posts: { pull: jest.fn() },
            save: jest.fn().mockResolvedValue(),
        };
        Topic.find.mockResolvedValue([mockTopic]);

        // Mock pour les commentaires associés au post
        const mockComments = [{ _id: 'comment1' }, { _id: 'comment2' }];
        Comment.find.mockResolvedValue(mockComments);

        // Mock pour les suppressions dans les modèles
        Like.deleteMany.mockResolvedValue();
        Comment.deleteMany.mockResolvedValue();
        Post.findByIdAndDelete.mockResolvedValue();

        // Appeler le contrôleur
        await deletePostById(req, res);

        // Vérifier les appels des différentes étapes de suppression
        expect(User.findById).toHaveBeenCalledWith('user123'); // Vérification de l’utilisateur
        expect(Topic.find).toHaveBeenCalledWith({ posts: { $in: { _id: 'post123' } } }); // Vérification du topic
        expect(mockTopic.posts.pull).toHaveBeenCalledWith({ _id: 'post123' }); // Suppression du post du topic
        expect(mockTopic.save).toHaveBeenCalled(); // Sauvegarde du topic

        // Vérification des suppressions des likes
        expect(Like.deleteMany).toHaveBeenCalledWith({ likeType: 'post123' }); // Likes du post
        mockComments.forEach(comment => {
            expect(Like.deleteMany).toHaveBeenCalledWith({ likeType: comment._id }); // Likes des commentaires
        });

        // Vérification des suppressions des commentaires et du post
        expect(Comment.deleteMany).toHaveBeenCalledWith({ post: 'post123' });
        expect(Post.findByIdAndDelete).toHaveBeenCalledWith({ _id: 'post123' });

        // Vérification de la réponse
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Post deleted!' });
    });

    it('devrait gérer les erreurs si une suppression échoue', async () => {
        // Simuler un utilisateur administrateur
        User.findById.mockResolvedValue({ isAdmin: true });

        // Simuler une erreur lors de la recherche du topic
        Topic.find.mockRejectedValue(new Error('Erreur lors de la recherche du topic'));

        // Appeler le contrôleur
        await deletePostById(req, res);

        // Vérifier que l'erreur est correctement propagée
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.any(Error));
    });
});

describe('Contrôleur de modification de post', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: { id: 'post123' },
            body: { content: 'Nouveau contenu du post' },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.clearAllMocks(); // Réinitialisation des mocks avant chaque test
    });

    it('devrait modifier un post avec succès', async () => {
        // Mock du post existant
        const mockPost = {
            _id: 'post123',
            title: 'Titre original',
            content: 'Contenu original',
            author: 'Auteur123',
            comments: [],
            likes: [],
        };

        const updatedPost = {
            ...mockPost,
            content: 'Nouveau contenu du post',
        };

        // Configuration des mocks
        Post.findById.mockResolvedValue(mockPost);
        Post.findByIdAndUpdate.mockResolvedValue(updatedPost);

        // Appel du contrôleur
        await modifyPost(req, res);

        // Vérifications
        expect(Post.findById).toHaveBeenCalledWith('post123');
        expect(Post.findByIdAndUpdate).toHaveBeenCalledWith(
            { _id: 'post123' },
            {
                title: 'Titre original',
                content: 'Nouveau contenu du post',
                author: 'Auteur123',
                comments: [],
                likes: [],
            },
            { new: true }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedPost);
    });

    it('devrait retourner une erreur si le post n\'existe pas', async () => {
        // Configuration du mock pour renvoyer null
        Post.findById.mockResolvedValue(null);

        // Appel du contrôleur
        await modifyPost(req, res);

        // Vérifications
        expect(Post.findById).toHaveBeenCalledWith('post123');
        expect(Post.findByIdAndUpdate).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Post not found!' });
    });

    it('devrait retourner une erreur si la mise à jour échoue', async () => {
        // Mock du post existant
        const mockPost = {
            _id: 'post123',
            title: 'Titre original',
            content: 'Contenu original',
            author: 'Auteur123',
            comments: [],
            likes: [],
        };

        // Configuration des mocks
        Post.findById.mockResolvedValue(mockPost);
        Post.findByIdAndUpdate.mockResolvedValue(null); // La mise à jour échoue

        // Appel du contrôleur
        await modifyPost(req, res);

        // Vérifications
        expect(Post.findById).toHaveBeenCalledWith('post123');
        expect(Post.findByIdAndUpdate).toHaveBeenCalledWith(
            { _id: 'post123' },
            {
                title: 'Titre original',
                content: 'Nouveau contenu du post',
                author: 'Auteur123',
                comments: [],
                likes: [],
            },
            { new: true }
        );
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Data update failed!' });
    });

    it('devrait retourner une erreur en cas de problème serveur', async () => {
        // Mock d'une erreur lors de l'appel de findById
        Post.findById.mockRejectedValue(new Error('Erreur serveur'));

        // Appel du contrôleur
        await modifyPost(req, res);

        // Vérifications
        expect(Post.findById).toHaveBeenCalledWith('post123');
        expect(Post.findByIdAndUpdate).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Post update failed!' });
    });
});