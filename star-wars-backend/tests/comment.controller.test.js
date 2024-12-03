const createCommentController = require('../controllers/comment.controller');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');

jest.mock('../models/post.model'); // Mock du modèle Post
jest.mock('../models/user.model'); // Mock du modèle User
jest.mock('../models/comment.model'); // Mock du modèle Comment

describe('createComment Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {
                id: '60adf4f2d5b3f41b8b54ef60' // Un ID de post factice
            },
            body: {
                content: 'Test commentaire',
                citation: {
                    citationAuthorId: '60adf4f2d5b3f41b8b54ef61', // Un ID d'auteur factice
                    citationText: 'Citation exemple'
                }
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('devrait retourner 404 si le post n\'existe pas', async () => {
        // Mock du modèle Post pour retourner null (post non trouvé)
        Post.findById.mockResolvedValue(null);

        await createCommentController.createComment(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "Post not found!"
        });
    });

    it('devrait retourner 404 si l\'auteur de la citation n\'existe pas', async () => {
        // Mock du modèle Post pour retourner un post valide
        Post.findById.mockResolvedValue({ _id: req.params.id, comments: [] });

        // Mock du modèle User pour retourner null (auteur non trouvé)
        User.findById.mockResolvedValue(null);

        await createCommentController.createComment(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "Author not found!"
        });
    });

    it('devrait créer un commentaire avec citation avec succès', async () => {
        // Mock du modèle Post pour retourner un post valide avec une méthode save
        const mockPost = { _id: req.params.id, comments: [], save: jest.fn().mockResolvedValue(true) };
        Post.findById.mockResolvedValue(mockPost);

        // Mock du modèle User pour retourner un auteur valide
        User.findById.mockResolvedValue({ _id: req.body.citation.citationAuthorId, name: 'Auteur' });

        // Mock de la méthode create pour Comment pour simuler la création du commentaire
        const mockCreateComment = { content: req.body.content, citation: req.body.citation };
        Comment.create.mockResolvedValue(mockCreateComment);

        await createCommentController.createComment(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockCreateComment);

        // Vérifie que save a été appelé sur le post
        expect(mockPost.save).toHaveBeenCalled();
    });

    it('devrait retourner 500 si la création du commentaire échoue', async () => {
        // Mock du modèle Post pour retourner un post valide
        Post.findById.mockResolvedValue({ _id: req.params.id, comments: [] });

        // Mock du modèle User pour retourner un auteur valide
        User.findById.mockResolvedValue({ _id: req.body.citation.citationAuthorId, name: 'Auteur' });

        // Mock pour faire échouer la création du commentaire
        Comment.create.mockResolvedValue(null); // Comment.create retourne null

        await createCommentController.createComment(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Comment creation failed!"
        });
    });

    it('devrait gérer les erreurs serveur', async () => {
        // Mock pour simuler une erreur serveur dans la fonction findById du Post
        Post.findById.mockRejectedValue(new Error('Erreur serveur'));

        await createCommentController.createComment(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: expect.any(String)
        }));
    });
});
