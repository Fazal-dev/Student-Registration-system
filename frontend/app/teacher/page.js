"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { deleteStudent, getStudents } from "@/lib/student";
import { errorMessage, successMessage } from "@/lib/utils";
import StudentDetails from "@/components/StudentDetails";
import { useRouter } from "next/navigation";
import { getUserId, getUserRole, LogoutUser } from "@/lib/auth";
import { Loader2, LogOut, PencilLine, Trash2 } from "lucide-react";
import withAuth from "@/components/withAuth";

function Teacher() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [editStudent, setEditStudent] = useState(null);
  const [open, setOpen] = useState(false);

  async function fetchStudents() {
    try {
      setIsLoading(true);
      const data = await getStudents();
      setStudents(data?.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  const handleLogout = () => {
    LogoutUser();
    router.push("/login");
  };

  useEffect(() => {
    fetchStudents();
  }, [router]);

  const openEdit = (student) => {
    if (!student) return;
    setEditStudent(student);
    setOpen(true);
  };

  // Handle Delete Student
  async function handleDelete(id) {
    try {
      const result = await deleteStudent(id);

      if (result.status) {
        successMessage(result.message);
        setStudents(students.filter((student) => student._id !== id));
      } else {
        errorMessage(result.message);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mx-auto w-[800px]">
        <div className="grid grid-cols-2 gap-4">
          <div></div>
          <div className="flex justify-end">
            <Button
              onClick={() => handleLogout()}
              className="bg-red-500 hover:bg-red-400 text-white"
            >
              <LogOut />
              Logout
            </Button>
          </div>
        </div>

        <Card className="mt-5">
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-semibold mb-4">Student List</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="px-10  mx-auto ">
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan="6" className="text-center">
                      <div className="flex justify-center items-center gap-2 text-gray-500">
                        <Loader2 className="animate-spin" />
                        Loading students...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : students && students.length != 0 ? (
                  students.map((student, index) => (
                    <TableRow key={student._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.firstName}</TableCell>
                      <TableCell>{student.lastName}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.age}</TableCell>
                      <TableCell>
                        <Button
                          title="edit"
                          variant="outline"
                          onClick={() => {
                            openEdit(student);
                          }}
                        >
                          <PencilLine />
                        </Button>
                        <Button
                          title="delete"
                          variant="destructive"
                          onClick={() => handleDelete(student._id)}
                          className="ml-2"
                        >
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="text-center" colSpan="6">
                      No students there
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {/* student details form model */}
      <StudentDetails
        open={open}
        setOpen={setOpen}
        fetchStudents={fetchStudents}
        student={editStudent}
      />
    </div>
  );
}

export default withAuth(Teacher, "teacher");
