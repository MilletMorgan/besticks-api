import Stripe from 'stripe';
// eslint-disable-next-line no-unused-vars
import { decrementTicket } from '../../pro/events.js';

const stripe = new Stripe('sk_test_51K6AxCBeWMoOWIva3YaOXnWhpR8GoqbxqnsDat5kCZcS7ONDtaGQIBBDfZyCag1lqOIWic164fapvXVAzTrmTobn0063IcZJWB');
const webhookSecret = ''; // TODO: Put secret in .env.local and import it here
const baseUrl = 'https://web-app-beta-five.vercel.app';

export const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.line_items,
      metadata: {
        eventId: req.body.id,
      },
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    });

    res.json({ id: session.id });
  } catch (e) {
    res.status(500).json({ e });
  }
};

// eslint-disable-next-line consistent-return
export const webhook = async (req, res) => {
  let event;
  // Get the signature sent by Stripe
  const signature = req.headers['stripe-signature'];

  console.log('body:', req.body.data);

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      webhookSecret,
    );
  } catch (err) {
    console.log(`⚠️ Webhook signature verification failed. ${err.message}`);
    return res.sendStatus(400);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      // eslint-disable-next-line no-case-declarations
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      // eslint-disable-next-line no-case-declarations
      // const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send(200);
};
