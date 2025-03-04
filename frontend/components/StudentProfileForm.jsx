"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getUserId } from "@/lib/auth";

import { getStudent, updateStudent } from "@/lib/student";
import { errorMessage, successMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  age: z
    .number()
    .gte(18, { message: "Age must be at least 18." })
    .lte(100, { message: "Age must be less than or equal to 100." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
});

export default function StudentProfileForm({ setSubject }) {
  const [user_id, setUserId] = useState(null);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
    },
  });

  const fetchUser = async () => {
    const id = getUserId();
    const result = await getStudent(id);
    const data = result.data[0];
    setSubject(data?.subjects);

    form.reset({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      age: Number(data.age),
    });
  };

  useEffect(() => {
    const user_id = getUserId();
    setUserId(user_id);
    fetchUser();
  }, []);

  async function onSubmit(data) {
    try {
      const result = await updateStudent(user_id, data);
      if (result.status) {
        successMessage(result.message);
        fetchUser();
      } else {
        errorMessage(result.message);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  }

  return (
    <div>
      {" "}
      {/* Profile Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              {/* age */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="18"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        type="email"
                        placeholder="example@mail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <Button
              disabled={form.formState.isSubmitting == true ? true : false}
              className=" text-white"
            >
              {form.formState.isSubmitting == true
                ? "loading..."
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
