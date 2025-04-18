const ENV = require('../config/config.js')
const articles = require('../data/shoppingData.json')


// Récupérer des articles à vendre depuis l'API de Etsy
exports.getArticles = async (req, res) => {
    try {
        if (req.params.apiMode === 'test') {
          
          // On injecte l'URL complète dans chaque objet
          const articlesWithFullUrls = articles.map(article => ({
            ...article,
            imageUrl: `${ENV.DEPLOYED_EXPRESS_SERVER_ENDPOINT}${article.imageUrl}`
          }));

          res.status(200).json(articlesWithFullUrls)
        } else {
          res.status(200).json({ message: "Aucun article" })
        }        

    } catch(error) {
        res.status(404).json({
            message: `Erreur dans la récupération des articles : ${error}`
        })
    }
}