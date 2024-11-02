"use client";
import { z } from "zod";

import { motion } from "framer-motion";
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
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signInSchema } from "@/lib/zod";
import {
  handleCredentialsSignIn,
  handleGoogleSignin,
} from "@/app/actions/authActions";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";
import { useSession } from "next-auth/react";

type SignInSchema = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const error = params.get("error");
  const { update: updateSession } = useSession();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInSchema) => {
    setIsLoading(true);
    try {
      const signIn = await handleCredentialsSignIn(data);
      if (signIn.success) {
        await updateSession();
        toast.success("Successfully signed in!");
        router.push("/dashboard");
      } else {
        toast.error(signIn.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      router.replace("/sign-in");
      setTimeout(() => {
        switch (error) {
          case "OAuthAccountNotLinked":
            toast.error(
              "This email is already registered. Please sign in with your email and password.",
              {
                duration: 3000,
              }
            );
            break;
          default:
            toast.error("An unexpected error occurred. Please try again.", {
              duration: 3000,
            });
        }
      }, 100);
    }
  }, [error, router]);
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
      className="p-4 flex-1 flex items-center justify-center"
    >
      <div className="bg-accent/30 p-6 rounded-lg border max-w-sm w-full space-y-4">
        <div className="flex gap-2 items-center justify-center mb-2 pb-4">
          <h4 className="text-3xl md:text-4xl text-center font-bold font-oswald ">
            Hi, Welcome Back!
          </h4>
          {/* <Image
            src="/assets/hi-wave.gif"
            alt="wave"
            width={32}
            height={32}
            unoptimized
          /> */}
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
                  <span className="text-xs text-muted-foreground uppercase px-2 shrink-0">
                    Or continue with
                  </span>
                </div>
                <div className="bg-border h-[0.5px] flex-1"></div>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
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
                          className="pr-10"
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
              <Button disabled={isLoading}>
                {isLoading ? (
                  <ClipLoader
                    color="hsl(var(--foreground))"
                    size={28}
                    loading={isLoading}
                    className="text-foreground"
                  />
                ) : (
                  "Sign In"
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Don&apos;t have an accocunt?{" "}
                <Link
                  href={"/sign-up"}
                  className="text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
