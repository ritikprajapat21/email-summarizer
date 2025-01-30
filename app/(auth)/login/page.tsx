"use client";
import { useActionState } from "react";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, null);

  console.log(state);

  return (
    <form action={action}>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button disabled={isPending}>Log in</button>
      <button>Sign up</button>
    </form>
  );
}
