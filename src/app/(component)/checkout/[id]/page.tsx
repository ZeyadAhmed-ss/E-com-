"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

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
import checkoutSchema from "@/src/app/schema/checkout.schema";
import { onlinePayment } from "@/src/Api/checkout/checkout.api";

export default function Checkout() {
  const {id}:{id:string} = useParams()
  const router = useRouter();
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof checkoutSchema>) => {
    const data = await onlinePayment(values,id);
    console.log(data);
    if (data.status === 'success') {
      toast.success("✅ Checkout data submitted successfully!");
      sessionStorage.setItem("checkoutUserId", id);
      window.location.href = data.session.url;

    }
    
  };

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      const timer = setTimeout(() => form.clearErrors(), 3000);
      return () => clearTimeout(timer);
    }
  }, [form.formState.errors, form]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-pink-300 to-purple-900 p-6">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 transition-transform hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Checkout
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            {/* Details */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Shipping address / Notes"
                      {...field}
                      className={`${
                        form.formState.errors.details
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
                      type="text"
                      placeholder="+201234567890"
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

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Cairo"
                      {...field}
                      className={`${
                        form.formState.errors.city
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
              ✅ Proceed to Checkout
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
