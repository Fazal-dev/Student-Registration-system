import { clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function successMessage(message) {
  return toast.success(message);
}

export function errorMessage(message) {
  return toast.error(message);
}

export function mapSubjectsWithMarks(data, subjectNames) {
  return subjectNames.map((subject) => ({
    subjectName: subject,
    mark: Number(data[subject]),
  }));
}
