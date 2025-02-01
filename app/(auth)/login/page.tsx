"use client";
import { useActionState } from "react";
import { login, forgetPassword } from "../actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, null);
  const [forgotState, forgotAction, forgotIsPending] = useActionState(
    forgetPassword,
    null,
  );

  console.log(state);

  return (
    <div className="flex justify-center items-center h-screen">
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
          Log in
        </Button>
        <div className="flex justify-center mt-2">
          <Button onClick={() => forgotAction()} disabled={forgotIsPending}>
            Forget Password
          </Button>
        </div>
      </form>
    </div>
  );
}
