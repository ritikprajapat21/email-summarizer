"use client";
import { useActionState } from "react";
import { login } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, null);
  const isString = typeof state?.error === "string";

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-10/12 max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-bold">Log in</h2>
          </CardTitle>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="underline">
              Click Here
            </Link>
          </p>
        </CardHeader>
        <CardContent>
          <form
            className="max-w-xl mx-auto flex flex-col gap-4"
            action={action}
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs underline">
                  Forgot Password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button
              className="w-fit mx-auto font-semibold"
              disabled={isPending}
            >
              Log in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
