// Importer le contrôleur et le modèle nécessaire
const { getTopicsByCategoryId } = require('../controllers/topic.controller.js');
const Category = require('../models/category.model.js');

// Mock du modèle Category
jest.mock('../models/category.model.js');

describe('getTopicsByCategoryId', () => {
    let req, res;

    beforeEach(() => {
        req = { params: { id: '669e44bad902edbb14ceb1d6' } }; // ID de catégorie en params
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    it("devrait retourner tous les topics d'une catégorie donnée", async () => {
        // Mock des données de catégorie avec des topics
        const mockCategory = {
            title: "Trilogie originale",
            topics: [
            {
                _id: "66c344d4a44b0f19827b4432",
                title: "Han shot first: le débat officiel",
                description: "Est-ce que oui ou non Han Solo a tiré le premier lors de son face à face avec Greedo dans \"Un Nouvel Espoir\" ?",
                posts: [
                    "66c344d4a44b0f19827b4435",
                    "66c38914df7e6e1d805f5261",
                    "66c3d1d47909c22e91a7af04",
                    "66c3d45f7909c22e91a7af22"
                ],
                createdAt: "2024-08-19T13:12:52.158Z",
                __v: 109
            },
            {
                _id: "66e722c4611ac06d55ad920b",
                title: "Quel est votre personnage préféré ?",
                description: "Quel est votre personnage préféré de toute la trilogie, et pourquoi ?",
                posts: [
                    "66e722c4611ac06d55ad920d",
                    "66e7279e611ac06d55ad9247",
                    "66e72817611ac06d55ad9291"
                ],
                createdAt: "2024-09-15T18:09:08.358Z",
                __v: 15
            }
            ]
        };

        // Mock de findById pour retourner un objet simulé avec la méthode populate
        Category.findById.mockReturnValue({
            populate: jest.fn().mockResolvedValue(mockCategory),
        });

        // Exécuter le contrôleur
        await getTopicsByCategoryId(req, res);

        // Vérifier que findById a été appelé avec le bon ID
        expect(Category.findById).toHaveBeenCalledWith('669e44bad902edbb14ceb1d6');

        // Vérifier le status et la réponse JSON
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            title: mockCategory.title,
            topics: mockCategory.topics,
        });
    });
});
