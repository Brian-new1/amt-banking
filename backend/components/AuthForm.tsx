"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // Sign Up with Appwrite & Create  plain Link token
      if (type === "sign-up") {
        const newUser = await signUp(data);

        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="flex min-h-screen w-full max-w-[380px] flex-col justify-center gap-5 py-10 md:gap-8 translate-x-[20px]">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className=" flex items-center gap-2 cursor-pointer">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="ATM Bank Logo"
            priority
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            ATM Bank
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-[24px] ld:text-36 font-semibold text-gray-900">
            {user ? "link Account" : type === "sign-in" ? "sign-in" : "sign-up"}

            <p className="text-[16px] font-normal text-gray-600">
              {user
                ? "Link Your Account to get started"
                : "Please Enter Your Details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-6 md:gap-y-8"
            >
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="  Enter Your First Name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="  Enter Your Last Name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="  Enter Your Specific Address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="  Enter Your City"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="  Example: Bamenda"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="  Example: 00000"
                    />
                  </div>
                  <div className="flex gap-4 mt-[30px]">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date Of Birth"
                      placeholder="  YYYY-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="ssn"
                      placeholder="  Example: 1234"
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="  Enter Your Email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="password"
                placeholder="  Enter Your Password"
              />
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className=" translate-y-[20px]  mt-4 text-[16px] rounded-lg border border-transparent bg-gradient-to-r from-[#0179FE] to-[#4893FF] font-semibold text-white shadow-md px-8 py-6"
                >
                  {isLoading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "sign In "
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {" "}
              {type === "sign-in"
                ? "Don't Have An Account? "
                : "Already Have An Account"}{" "}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="text-14 cursor-pointer font-medium bg-gradient-to-r from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent "
            >
              {type === "sign-in" ? "sign Up" : "sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
