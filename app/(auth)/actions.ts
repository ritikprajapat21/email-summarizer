"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { signInSchema } from "@/lib/zod/schema";

export async function login(previousState: any, formData: FormData) {
  const result = signInSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!result.success) {
    return {
      ...previousState,
      error: result.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: result.data.email,
    password: result.data.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  console.log(error);
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(previousState: any, formData: FormData) {
  const result = signInSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!result.success) {
    return {
      ...previousState,
      error: result.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const data = {
    email: result.data.email,
    password: result.data.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function forgetPassword(previousState: any, formData: FormData) {
  const result = signInSchema.safeParse({
    email: formData.get("email") as string,
  });

  if (!result.success) {
    return {
      ...previousState,
      error: result.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    result.data.email,
  );

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
