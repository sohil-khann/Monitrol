import Stripe from "stripe"

export const createCheckoutSession = async ({
  userEmail,
  userId,
  env,
}: {
  userEmail: string
  userId: string
  env: { STRIPE_SECRET_KEY: string; NEXT_PUBLIC_APP_URL: string }
}) => {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  })

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1RxUZyIjFmj0hVC9S4x9SB95",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    customer_email: userEmail,
    metadata: {
      userId,
    },
  })

  return session
}
