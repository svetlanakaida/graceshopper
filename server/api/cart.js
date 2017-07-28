const router = require('express').Router();
const {Cart, CartItems} = require('../db/models');

/*
when addToCart is clicked push item to cart table.
if cart is not created:
  create a cart for user.
  Push the characters to cartItem table
if cart is present for user
  push the items to cart
*/
router.post('/:userId/cartItem', (req, res, next) => {
    Cart.findOrCreate({
      where:{
        userId: req.params.userId,
        status: 'pending'
      }
    })
    .spread ((userCart, created) => {
      CartItems.create({
        characterId: req.body.characterId,
        quantity: req.body.quantity,
        subtotal: req.body.subtotal,
        cartId: userCart.id
      })
    })
    .then( cartItem => res.send(cartItem))
    .catch(next)
})


/*
when checkout is clicked
 check if user has shipping address
  yes: use it
  no: add shipping address to user table.
*/

/*
when order is clicked: update cart table.
  change status: purchased
  put total
*/
router.put('/:userId/purchase', (req, res, next) => {
  Cart.update({
    status: 'purchased',
    total: req.body.total
  }, {
    where: {
      userId: req.params.userId,
      returning: true
    }
  })
  .then( result => res.send(result[1].dataValues))
})