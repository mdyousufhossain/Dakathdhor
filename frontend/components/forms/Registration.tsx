'use client'
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
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
import { RegisterSchema } from "@/lib/validation";
import { Checkbox } from "../ui/checkbox";
import { apiRequest } from "@/app/api/registration/api";
import Loader from "../cards/loader";
import { useRouter } from "next/navigation";






function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const router = useRouter()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      batman: false,
      mobile: "",
      location: "",
      bio: "",
    },
  });


  


  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);
    try {
      const response = await apiRequest("/user/register", "POST", values);
      console.log("Registration successful:", response);
      // redirecting , i will improve it lated 
      router.push('/')
    } catch (error) {
        console.error("Registration failed:", error);
        // @ts-ignore
        if (error?.response?.data?.message.includes("Username")) {
          setUsernameError("Username is already taken");
          // @ts-ignore // im sleepy ..too lazy to find this badboi type safty 
        } else if (error?.response?.data?.message.includes("Email")) {
          setEmailError("Email is already in use");
        }
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your username"
                      {...field}
                      disabled={isLoading}
                      className={
                        usernameError ? "border-red-500" : "border-green-500"
                      }
                    />
                  </FormControl>
                  {usernameError && (
                    <p className="text-red-500">{usernameError}</p>
                  )}
                  {!usernameError && form.watch("username") && (
                    <p className="text-green-500">Username is available</p>
                  )}
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
                    <Input
                      placeholder="Make it strong"
                      type="password"
                      {...field}
                      disabled={isLoading}
                    />
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
                    <Input
                      placeholder="Your email address"
                      type="email"
                      {...field}
                      disabled={isLoading}
                      className={emailError ? "border-red-500" : "border-green-500"}
                    />
                  </FormControl>
                  {emailError && (
                    <p className="text-red-500">{emailError}</p>
                  )}
                  {!emailError && form.watch("email") && (
                    <p className="text-green-500">Email is available</p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="batman"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-gray-700">
                      Are you sure you want to be Batman?
                    </FormLabel>
                    <FormDescription className="text-sm text-gray-500">
                      You will receive notifications from victims, and involvement may be risky.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your mobile number" type="text" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Your location" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>
                    Location will be sent when you request emergency help.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input placeholder="Tell us something about yourself" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>
                    E.g., "A fan of Jalal Uddin Rumi"
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader /> : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default RegistrationForm;
