import { createCheckoutSession } from "@/lib/stripe"
import { router } from "../__internals/router"
import { privateProcedure } from "../procedures"

export const paymentRouter = router({
  createCheckoutSession: privateProcedure.mutation(async ({ c, ctx }) => {
    const { user } = ctx

    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
      env: {
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!
      },
    })

    return c.json({ url: session.url })
  }),

  getUserPlan: privateProcedure.query(async ({ c, ctx }) => {
    const { user } = ctx
    return c.json({ plan: user.plan })
  }),
})
