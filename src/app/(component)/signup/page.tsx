"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import axios , {AxiosError} from "axios";
import { useRouter } from "next/navigation"; 


import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import formSchema from "../../schema/register.schema";
import { toast } from "sonner";


export default function RegisterPage() {
  const router = useRouter(); 
  const [apiError, setApiError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-xs w-full bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-between`}
        >
          <span>Account created successfully!</span>
        </div>
      ),
      { duration: 3000 }
    );

    setTimeout(() => {
      router.push("/signin");
    }, 2000);
  } catch (err) {
    let message = "Signup failed";

    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<{ message?: string }>;
      message = axiosError.response?.data?.message || message;
    }

    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-xs w-full bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-between`}
        >
          <span>{message}</span>
        </div>
      ),
      { duration: 3000 }
    );
  }
};


  useEffect(() => {
    if (apiError) {
      const timer = setTimeout(() => setApiError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [apiError]);

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      const timer = setTimeout(() => form.clearErrors(), 3000);
      return () => clearTimeout(timer);
    }
  }, [form.formState.errors, form])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-pink-300 to-purple-900 p-6">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 transition-transform hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Register Now
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className={`${
                        form.formState.errors.name
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@mail.com"
                      {...field}
                      className={`${
                        form.formState.errors.email
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      className={`${
                        form.formState.errors.password
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      className={`${
                        form.formState.errors.rePassword
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+20123456789"
                      {...field}
                      className={`${
                        form.formState.errors.phone
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white font-semibold rounded-xl py-3 shadow-lg"
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
