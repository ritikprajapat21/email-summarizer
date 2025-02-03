"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import {
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/zod/schema";

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

  const data = {
    email: result.data.email,
    password: result.data.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { ...previousState, error: { supabase: error.message } };
  }

  redirect("/mails");
}

export async function signup(previousState: any, formData: FormData) {
  const result = signUpSchema.safeParse({
    name: formData.get("name") as string,
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
    return { ...previousState, error: { supabase: error.message } };
  }

  redirect("/login");
}

export async function forgotPassword(previousState: any, formData: FormData) {
  const result = forgotPasswordSchema.safeParse({
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
    return { ...previousState, error: { supabase: error.message } };
  }

  //revalidatePath("/", "layout");
  redirect("/login?emailSent=true");
}
