"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useEffect, useState } from "react";
import StudentSubjectForm from "@/components/StudentSubjectForm";
import StudentProfileForm from "@/components/StudentProfileForm";
import { useRouter } from "next/navigation";
import { getUserId, LogoutUser } from "@/lib/auth";
import { getProfilePic, uploadProfilePic } from "@/lib/student";
import { errorMessage, successMessage } from "@/lib/utils";
import withAuth from "@/components/withAuth";

function Student() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [subjects, setSubject] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfilePic = async () => {
    const res = await getProfilePic();
    const contentType = res.headers.get("Content-Type");
    if (contentType && contentType.startsWith("image")) {
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(blob);
    } else {
      const data = await res.json();
      if (!data.status || data.data === null) {
        setProfilePic("/profle.png");
      }
    }
  };

  useEffect(() => {
    fetchProfilePic();
  }, [router]);

  const handleLogout = () => {
    LogoutUser();
    router.push("/login");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const fileInput = document.getElementById("profile");

    const file = fileInput.files[0];

    if (!file) {
      errorMessage("Please select picture");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    formData.append("user_id", getUserId());

    try {
      const res = await uploadProfilePic(formData);

      if (res.status) {
        successMessage(res.message);
        fileInput.value = "";
        setIsLoading(false);
        fetchProfilePic();
      } else {
        errorMessage(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Profile Information</h2>

        <div className="flex gap-4">
          <Button
            onClick={() => handleLogout()}
            className="bg-red-600 hover:bg-red-500 text-white"
          >
            Logout
          </Button>
          <Button onClick={() => setOpen(true)} className=" text-white">
            + Add Subjects
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Student Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Profile Picture Upload */}
          <div className="flex items-center space-x-4 mb-4">
            {profilePic && (
              <Image
                alt="profile pic"
                width={300}
                height={300}
                src={profilePic}
              />
            )}

            <form className="d-inline" encType="multipart/form-data">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    accept="image/png, image/jpeg"
                    required
                    id="profile"
                    type="file"
                    name="profile_pc"
                    variant="outline"
                  />
                </div>
                <div>
                  <Button onClick={handleUpload} type="submit">
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <Separator className="my-4" />
          {/* profile form */}
          <StudentProfileForm setSubject={setSubject} />
        </CardContent>
      </Card>
      {/* add subject marks */}
      <StudentSubjectForm subjects={subjects} open={open} setOpen={setOpen} />
    </div>
  );
}
export default withAuth(Student, "student");
