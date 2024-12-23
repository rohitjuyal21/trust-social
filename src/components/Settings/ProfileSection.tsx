import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import LoadingButton from "../LoadingButton";
import { toast } from "sonner";
import Loader from "../Loader";
export default function ProfileSection() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/me`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Account deleted successfully");

        await signOut({ callbackUrl: "/sign-in" });
      }
    } catch (error) {
      toast.error("Failed to delete account");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {status === "loading" ? (
        <div className="flex items-center justify-center h-full w-full">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-start justify-start h-full">
          <div className="flex items-center">
            <h4 className="font-semibold w-16">Name</h4>
            <p>{session?.user.name}</p>
          </div>
          <div className="flex items-center">
            <h4 className="font-semibold w-16">Email</h4>
            <p>{session?.user.email}</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Account Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <LoadingButton
                  onClick={handleDeleteAccount}
                  variant="destructive"
                  isLoading={isLoading}
                >
                  Delete Account
                </LoadingButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  );
}
