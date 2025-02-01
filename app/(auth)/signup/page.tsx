"use client";
import { useActionState } from "react";
import { signup } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  const [state, action, isPending] = useActionState(signup, null);

  console.log(state);

  return (
    <Card className="flex justify-center items-center h-screen">
      <CardHeader className="flex justify-center items-center">
        <CardTitle>Sign up</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form
          className="w-10/12 max-w-xl mx-auto flex flex-col gap-4"
          action={action}
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button className="w-full" disabled={isPending}>
            Sign up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
