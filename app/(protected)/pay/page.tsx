"use client";

import CheckoutPage from "@/components/custom/checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // Import an icon for the back link
import { Button } from "@/components/ui/button"; // Import Button for the back link

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PaymentPage() {
  const searchParams = useSearchParams();
  // Get amount from URL query parameter, default to 9.99 if not provided
  const amount = Number.parseFloat(searchParams.get("amount") || "9.99"); // Use Number.parseFloat

  // Use standard container, padding, background, and text colors
  return (
    // Use container for consistent width and centering, add padding
    <main className="container mx-auto p-6 lg:p-10">
      {/* Add a back button */}
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link href="/mails">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Mails
        </Link>
      </Button>
      {/* Center the header text */}
      <div className="mb-10 text-center">
        {/* Keep heading styles */}
        <h1 className="text-3xl font-bold mb-2">Mail Sage Payment</h1>
        <h2 className="text-xl text-muted-foreground">
          Complete your payment for
          <span className="font-semibold text-foreground">
            {" "}
            ${amount.toFixed(2)}
          </span>
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
