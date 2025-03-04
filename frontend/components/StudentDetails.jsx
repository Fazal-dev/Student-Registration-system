"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateStudent } from "@/lib/student";
import {
  errorMessage,
  mapSubjectsWithMarks,
  successMessage,
} from "@/lib/utils";
import { useEffect } from "react";
import { subjectNamesArray } from "@/lib/constants";

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
  Mathematics: z
    .number()
    .min(0, { message: "Marks must be at least 0" })
    .max(100, { message: "Marks cannot exceed 100" }),
  Science: z.number().min(0).max(100),
  English: z.number().min(0).max(100),
  History: z.number().min(0).max(100),
  Geography: z.number().min(0).max(100),
  Physics: z.number().min(0).max(100),
  Chemistry: z.number().min(0).max(100),
  Biology: z.number().min(0).max(100),
  ComputerScience: z.number().min(0).max(100),
});

export default function StudentDetails({
  setOpen,
  open,
  student,
  fetchStudents,
}) {
  const subjectNames = subjectNamesArray;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 0,
      ...subjectNames.reduce((acc, subject) => {
        acc[subject] = 0;
        return acc;
      }, {}),
    },
  });

  useEffect(() => {
    form.reset({
      firstName: student?.firstName || "",
      lastName: student?.lastName || "",
      email: student?.email || "",
      age: Number(student?.age) || "",
      ...subjectNames.reduce((acc, subject) => {
        acc[subject] =
          student?.subjects?.find((s) => s.subjectName === subject)?.mark || 0;
        return acc;
      }, {}),
    });
  }, [student]);

  // Handle Edit Student
  async function onSubmit(data) {
    if (!student) return;

    const subjectsArray = mapSubjectsWithMarks(data, subjectNames);

    const formattedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      age: Number(data.age),
      subjects: subjectsArray,
    };

    try {
      const result = await updateStudent(student._id, formattedData);

      if (result.status) {
        successMessage(result.message);
        fetchStudents();
        setOpen(false);
      } else {
        errorMessage(result.message);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  }
  return (
    <div>
      {/* edit student model start */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>if you need to change</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {/* Profile Section */}
                  <div className="space-y-4">
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
                                />
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
                    </div>
                  </div>
                </div>
                <div>
                  {/* Subject Section */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* subjects here */}
                      {subjectNames.map((subject) => (
                        <FormField
                          key={subject}
                          control={form.control}
                          name={subject}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{subject}</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter marks"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <DialogFooter className="mt-4 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting == true ? true : false}
                  className=" text-white ml-2"
                >
                  {form.formState.isSubmitting == true
                    ? "loading..."
                    : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
