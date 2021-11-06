 var cart = require('../../models/cart-model');

 const addCartClient = async function(request, response) {
     if (request.user) {
         const data = request.body;
         const cartClient = await cart.find({ client: data.client, product: data.product });
         // para que no se dupliquen los productos en el carrito
         if (cartClient.length == 0) {
             const register = await cart.create(data);
             response.status(200).send({ data: register });
         } else if (cartClient.length >= 1) {
             response.status(200).send({ data: undefined });
         }

     } else {
         response.status(500).send({ message: "Not Access" });
     }
 };

 const getCartClient = async function(request, response) {
     if (request.user) {
         const id = request.params['id'];
         const cartClient = await cart.find({ client: id }).populate('product'); // populate devuelve el objeto entero

         response.status(200).send({ data: cartClient });
     } else {
         response.status(500).send({ message: "Not Access" });
     }
 };

 const deleteItemToCartClient = async function(request, response) {
     if (request.user) {
         const id = request.params['id'];
         const register = await cart.findByIdAndRemove({ _id: id });

         response.status(200).send({ data: register });
     } else {
         response.status(500).send({ message: "Not Access" });
     }
 };

 module.exports = {
     addCartClient: addCartClient,
     getCartClient: getCartClient,
     deleteItemToCartClient: deleteItemToCartClient
 };