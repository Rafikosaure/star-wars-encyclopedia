const { createAFollowTopicArray } = require('../controllers/followTopic.controller');
const FollowTopic = require('../models/followTopic.model');
const User = require('../models/user.model');

// Mock des modèles
jest.mock('../models/followTopic.model');
jest.mock('../models/user.model');

describe('createAFollowTopicArray controller', () => {
    let req, res;

    // Définir les identifiants de test
    const userId = 'userId'
    const topicId = 'topicId'
    const followTopicId = 'followTopicId'

    beforeEach(() => {
        req = {
            user: { id: userId },
            params: { id: topicId },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it('devrait créer puis retourner un nouveau tableau de discussions suivies', async () => {
        // Mock des fonctions des modèles
        const mockUser = { 
            _id: userId, 
            name: 'Test User',
            email: "test.user@jest.com",
            password: "aaaa",
            picture: '',
            isAdmin: false
        };
        User.findById.mockResolvedValue(mockUser);

        const mockNewFollowTopic = {
            followTopicId: followTopicId,
            topicId: topicId,
            users: [mockUser]
        }

        FollowTopic.create.mockResolvedValue(mockNewFollowTopic)
        await createAFollowTopicArray(req, res);

        // Assertions sur les modèles
        expect(User.findById).toHaveBeenCalledWith(userId);
        jest.spyOn(FollowTopic, 'findOne').mockReturnValue(Promise.resolve({ followTopicId: followTopicId }))
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockNewFollowTopic);
    });

    it("devrait retourner un code 404 en cas d'erreur", async () => {
        User.findById.mockRejectedValue(new Error('Database error'));

        await createAFollowTopicArray(req, res);

        // Assertions
        expect(User.findById).toHaveBeenCalledWith(userId);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'followTopic array creation failed!',
        });
    });
});
