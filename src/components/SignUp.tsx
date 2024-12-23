"use client";
import { z } from "zod";

import { Button } from "./ui/button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signUpSchema } from "@/lib/zod";
import {
  handleCredentialsSignIn,
  handleCredentialsSignUp,
  handleGoogleSignin,
} from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import LoadingButton from "./LoadingButton";
import Reveal from "./Reveal";

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { update: updateSession } = useSession();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpSchema) => {
    setIsLoading(true);
    try {
      const result = await handleCredentialsSignUp(data);
      if (result.success) {
        const signInResult = await handleCredentialsSignIn({
          email: data.email,
          password: data.password,
        });

        if (signInResult.success) {
          await updateSession();
          toast.success("Sign Up successful!");
          router.replace("/dashboard");
        } else {
          toast.error(signInResult.message);
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Reveal>
      <div className="pt-8 flex items-center justify-center">
        <div className="bg-accent/30 p-6 rounded-lg border max-w-sm w-full space-y-4">
          <div className="pb-4">
            <h4 className="text-4xl text-center font-bold font-oswald mb-2">
              Create Account
            </h4>
            <p className="text-muted-foreground text-center text-sm">
              Welcome to Trust Social
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={handleGoogleSignin}
                  type="button"
                  variant={"outline"}
                  className="w-full"
                >
                  <Image
                    src="/assets/google-logo.png"
                    alt="google-logo"
                    width={24}
                    height={24}
                  />
                  Continue with Google
                </Button>

                <div className="relative flex items-center w-full justify-between">
                  <div className="bg-border h-[0.5px] flex-1"></div>
                  <div className="flex items-center justify-center">
                    <span className="text-xs text-muted-foreground uppercase  px-2 shrink-0">
                      Or continue with
                    </span>
                  </div>
                  <div className="bg-border h-[0.5px] flex-1"></div>
                </div>

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Password"
                            {...field}
                          />
                          <span
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
                            onClick={() =>
                              setIsPasswordVisible(!isPasswordVisible)
                            }
                          >
                            {isPasswordVisible ? (
                              <Eye className="size-5" />
                            ) : (
                              <EyeOff className="size-5" />
                            )}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <LoadingButton isLoading={isLoading}>Sign Up</LoadingButton>
                <p className="text-xs text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link
                    href={"/sign-in"}
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Reveal>
  );
}
