const express = require("express");
const Stripe = require("stripe");


require("dotenv").config();

const stripeB = Stripe('sk_test_51MpUneA8wRXdkWHGHjJDSUPXVRwYorrg0Y3EHp71yl0guyWdvoxiSGu6w9tZ9CePrfJU0vlXjjD21ptBhWbtyVn700KwQ25bIA');

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
const{
  cartItems
}=req.body;
const array = Object.values(cartItems)
  console.log(array)
/*
  Object.keys(cartItems).forEach(function (key, index) {
    cartItems[key]
        console.log(cartItems);
  }

  );*/



const line_items = array.map((item)=>{
  return  {
    price_data: {

      currency: 'usd',
      product_data: {
        name: item.name,
        images:[item.img]
      },
      unit_amount: item.price*100,
    },
    quantity: item.qty,
  }


})

  const session = await stripeB.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/users',
    cancel_url: 'http://localhost:3000/users',
  });

  res.send({ url: session.url});
});
module.exports = router;



