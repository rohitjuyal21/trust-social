import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchems = z.object({
  username: z.string(),
  image: z.string(),
});

export default function ProfileSection() {
  const { data: session } = useSession();
  console.log(session);

  const form = useForm<z.infer<typeof profileSchems>>({
    resolver: zodResolver(profileSchems),
    defaultValues: {
      username: session?.user.name,
      image: session?.user.image,
    },
  });
  return (
    <div className="flex flex-col gap-4 items-start justify-start h-full">
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold">Name</h4>
        <p>{session?.user.name}</p>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold w-16">Profile Picture</h4>
      </div>
      <Button variant="secondary">Delete Account</Button>
    </div>
  );
}
