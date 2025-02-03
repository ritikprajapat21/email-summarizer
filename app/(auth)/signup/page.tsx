"use client";
import { useActionState } from "react";
import { signup } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
  const [state, action, isPending] = useActionState(signup, null);

  console.log(state);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-10/12 max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-bold">Sign Up</h2>
          </CardTitle>
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
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
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button
              className="w-fit mx-auto font-semibold"
              disabled={isPending}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
