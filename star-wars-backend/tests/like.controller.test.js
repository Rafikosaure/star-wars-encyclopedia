// Importer le contrôleur et les modèles nécessaires
const { getLikes } = require('../controllers/like.controller.js');
const Comment = require('../models/comment.model.js');

// Mock des modèles
jest.mock('../models/comment.model.js');


describe('getLikes controller', () => {
    let req, res;

    // Définir un identifiant simulé
    const testId = 'abcdef'

    beforeEach(() => {
        req = { params: { id: testId } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it("devrait retourner les likes d'un commentaire s'ils existent", async () => {

        const commentWithLikesMock = {
            _id: testId,
            post: '66c344d4a44b0f19827b4435',
            content: "J'étais sûr que ce débat apparaitrait dans le forum ! Un classique",
            author: {
                id: '6687c2722a8bff812fc1ac46'
            },
            likes: [
                {
                    _id: '67484aeb7de7513989af4dc0',
                    likeType: testId,
                    user: '67017fc9aaecf759b50bb5b6',
                },
                {
                    _id: 'kqfjmlqkjlm jqkofjqklcmff',
                    likeType: testId,
                    user: 'uqpoffmiKfpqjmfpoqkfqofk',
                }
            ],
        }
        
        await Comment.findById.mockReturnValue({
            populate: jest.fn().mockResolvedValue(commentWithLikesMock),
        });
        
        await getLikes(req, res);

        // Vérifier les appels
        expect(Comment.findById).toHaveBeenCalledWith(testId);

        // Vérifier le status et la réponse JSON
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(commentWithLikesMock.likes);
    });

    // it("devrait retourner les likes d'un post si aucun commentaire n'est trouvé", async () => {
    //     const mockLikes = { likes: ['like3', 'like4'] };

    //     // Simulation de l'absence de commentaire, mais présence du post
    //     Comment.findById.mockResolvedValueOnce(null);
    //     Post.findById.mockResolvedValueOnce({
    //         populate: jest.fn().mockResolvedValueOnce(mockLikes)
    //     });

    //     await getLikes(req, res);

    //     // Vérifier les appels
    //     expect(Comment.findById).toHaveBeenCalledWith('sampleId');
    //     expect(Post.findById).toHaveBeenCalledWith('sampleId');
    //     expect(res.status).toHaveBeenCalledWith(200);
    //     expect(res.json).toHaveBeenCalledWith(mockLikes.likes);
    // });

    // it("devrait retourner une erreur 404 si ni le post ni le commentaire n'ont de likes", async () => {
    //     // Simulation de l'absence de post et de commentaire
    //     Comment.findById.mockResolvedValueOnce(null);
    //     Post.findById.mockResolvedValueOnce(null);

    //     await getLikes(req, res);

    //     // Vérifier que le statut 404 et le message d'erreur sont renvoyés
    //     expect(res.status).toHaveBeenCalledWith(404);
    //     expect(res.json).toHaveBeenCalledWith({ message: "Likes not found!" });
    // });
});







/*
// Importer le contrôleur et les modèles nécessaires
const { getLikes } = require('../controllers/like.controller.js');
const Post = require('../models/post.model.js');
const Comment = require('../models/comment.model.js');
const { populate } = require('../models/isMentionned.model.js');

// Définition du timeout
const SECONDS = 1000;

// Mock du modèle Post
jest.mock('../models/post.model.js');

// Mock du modèle Comment
jest.mock('../models/comment.model.js')


describe('getLikes', () => {
    let req, res;

    beforeEach(() => {
        req = { params: { id: '67321a09ccc6922332cc6c2c' } };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    it('devrait retourner le tableau des likes d\'un post', async () => {
        const mockLikes = [ {
            _id: '67321a10ccc6922332cc6c48',
            likeType: '67321a09ccc6922332cc6c2c',
            user: '6687c2722a8bff812fc1ac46',
            createdAt: '2024-11-11T14:52:00.599Z',
            __v: 0
        } ];


        const mockLikeType = {
            author: { id: '6687c2722a8bff812fc1ac46' },
            _id: '67321a09ccc6922332cc6c2c',
            post: '66c344d4a44b0f19827b4435',
            content: "J'étais sûr que ce débat apparaitrai dans le forum ! Un classique pour les fans. Et oui, Han a tiré le premier, évidemment !",
            likes: [
                {
                    _id: '67321a10ccc6922332cc6c48',
                    likeType: '67321a09ccc6922332cc6c2c',
                    user: '6687c2722a8bff812fc1ac46',
                    createdAt: '2024-11-11T14:52:00.599Z',
                    __v: 0
                }
            ],
            createdAt: '2024-11-11T14:51:53.555Z',
            __v: 1
        }



        // Mock pour Comment.findById
        Comment.findById.mockResolvedValueOnce(mockLikeType);

        // Effectuer l'appel au contrôleur
        await getLikes(req, res);

        // Vérification
        expect(Comment.findById).toHaveBeenCalledWith('67321a09ccc6922332cc6c2c');
        
        expect(res.json).toHaveBeenCalledWith(mockLikeType.likes);
    }, 10 * SECONDS);
});
*/