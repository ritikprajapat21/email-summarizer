"use client";

import CheckoutPage from "@/components/custom/checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PaymentPage() {
  const searchParams = useSearchParams();
  // Get amount from URL query parameter, default to 9.99 if not provided
  const amount = parseFloat(searchParams.get("amount") || "9.99");

  // Use theme background and text colors, adjust padding/margins
  return (
    <main className="max-w-2xl mx-auto p-6 lg:p-10 text-center">
      <div className="mb-10">
        {/* Adjust heading size for consistency */}
        <h1 className="text-3xl font-bold mb-2">Mail Sage Payment</h1>
        <h2 className="text-xl text-muted-foreground">
          Complete your payment for
          <span className="font-semibold text-foreground"> ${amount.toFixed(2)}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: amount * 100,
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
}
