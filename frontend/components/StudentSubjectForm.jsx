import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import environment from "@/lib/environment";
import toast from "react-hot-toast";
import { useEffect } from "react";

const FormSchema = z.object({
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
export default function StudentSubjectForm({ setOpen, open, subjects }) {
  const subjectNames = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "ComputerScience",
  ];

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (subjects) {
      const updatedValues = subjectNames.reduce((acc, subject) => {
        const subjectMarks =
          subjects?.find((s) => s.subjectName === subject)?.mark || 0;
        acc[subject] = subjectMarks;
        return acc;
      }, {});

      form.reset(updatedValues);
    }
  }, [subjects, form.reset]);

  // Handle Edit Student
  async function onSubmit(data) {
    const subjectsArray = subjectNames.map((subject) => ({
      subjectName: subject,
      mark: Number(data[subject]),
    }));

    const formattedData = {
      subjects: subjectsArray,
    };

    const user_id = localStorage.getItem("user_id");

    try {
      const res = await fetch(`${environment.baseUrl}api/student/${user_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const result = await res.json();

      if (result.status) {
        toast.success(result.message);

        setOpen(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Enter Subject Marks</DialogTitle>
            <DialogDescription>
              Add your marks here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          {/* 9 Subject Input Fields */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
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

              {/* Save & Cancel Buttons */}
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
                  {form.formState.isSubmitting == true ? "loading..." : "Save "}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
