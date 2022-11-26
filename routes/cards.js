const cardsRouter = require('express').Router();
const { getCards, createCard, deleteCard, addLike, deleteLike } = require('../controllers/cards')

cardsRouter.route('/')
.get(getCards)
.post(createCard);

cardsRouter.route('/:cardId')
.delete(deleteCard);

cardsRouter.route('/:cardId/likes')
.put(addLike);

cardsRouter.route('/:cardId/likes')
.delete(deleteLike);

//usersRouter.get('/:userId', getUser);


module.exports = cardsRouter;

// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору

// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки