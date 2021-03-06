const db = require('../models');
//const mongoose = require("mongoose");
//const ObjectID = require("mongoose").ObjectID;

module.exports = function (app) {
  app.get('/', getArticles, renderIndex);
  app.get('/favorites', getArticles, renderFavorites);
};

//get all articles from MongoDB in descending order (so that they are more recent)
function getArticles(req, res, next) {
  db.Article.find()
    .sort({ _id: -1 })
    .then(function (data) {
      var articles = [];
      data.forEach(article => {
        //this is storing all data in an object, was having trouble with rendering but this worked
        var articleData = {
          id: JSON.stringify(article._id),
          title: article.title,
          favorite: article.favorite,
          note: article.note,
          link: article.link,
          img: article.img,
          teaser: article.teaser,
          topic: article.topic,
        };
        articles.push(articleData);
      });
      req.Article = articles;
      next();
    })
    .catch(function (err) {
      res.json(err);
    });
}

function renderIndex(req, res) {
  res.render('index', { ...req });
}

function renderFavorites(req, res) {
  res.render('favorites', { ...req });
}
