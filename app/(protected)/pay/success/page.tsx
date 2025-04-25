import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <main className="container mx-auto flex min-h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      {/* Use Card component for consistent structure */}
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Thank You!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Your payment has been received successfully.</p>
          {/* Display amount with theme colors */}
          <div className="rounded-md border bg-card p-4 text-4xl font-bold text-primary">
            ${amount}
          </div>
          {/* Button to return to mails page */}
          <Button asChild className="mt-6">
            <Link href="/mails">Return to Mails</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
