import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function LoginModal() {
  const handleGithubLogin = async () => {
    await signIn("github", {
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Getting start</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to QuickChat</DialogTitle>
          <DialogDescription>
            Welcome to MergMetrics
          </DialogDescription>
        </DialogHeader>
        <Button variant="outline" onClick={handleGithubLogin}>
          <Image
            src="/images/google.png"
            className=" mr-4"
            width={25}
            height={25}
            alt="google"
          />
          Continue with Github
        </Button>
      </DialogContent>
    </Dialog>
  );
}
