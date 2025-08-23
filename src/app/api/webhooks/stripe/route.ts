import { db } from "@/db"

import { headers } from "next/headers"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  })

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("stripe-signature")

  const event = stripe.webhooks.constructEvent(
    body,
    signature ?? "",
    process.env.STRIPE_WEBHOOK_SECRET ?? ""
  )

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const { userId } = session.metadata || { userId: null }

    if (!userId) {
      return new Response("Invalid metadata", { status: 400 })
    }

    await db.user.update({
      where: { id: userId },
      data: { plan: "PRO" },
    })
  }

  return new Response("OK")
}
