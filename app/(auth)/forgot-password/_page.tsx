"use client";
import { useActionState } from "react";
import { forgotPassword } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ZodError from "@/components/custom/zod-error";

export default function forgotPasswordPage() {
  const [state, action, isPending] = useActionState(forgotPassword, null);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-10/12 max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-bold">Forgot Password</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="max-w-xl mx-auto flex flex-col gap-4"
            action={action}
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
              <ZodError error={state?.error?.email} />
            </div>
            <ZodError error={state?.error?.supabase} />
            <Button
              className="w-fit mx-auto font-semibold"
              disabled={isPending}
            >
              Send Email
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
