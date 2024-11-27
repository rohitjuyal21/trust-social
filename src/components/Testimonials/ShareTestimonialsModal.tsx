import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "../ui/button";
import { Rocket } from "lucide-react";
import Grid from "../svg/Grid";
import Carousel from "../svg/Carousel";

export default function ShareTestimonialsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Rocket className="size-4" /> Share
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg max-w-screen-md">
        <VisuallyHidden.Root>
          <DialogTitle>Import Tweet</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <DialogDescription></DialogDescription>
        </VisuallyHidden.Root>
        <div className="my-4 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-center">
              Embed a Wall of Love
            </h1>
            <p className="text-muted-foreground text-center">
              Select the type of embed would you like to add to your site
            </p>
          </div>
          <div className="flex justify-center gap-8">
            <div className="rounded-md border bg-accent/30 p-4 cursor-pointer">
              <div className="h-24">
                <Grid />
              </div>
              <p className="text-sm font-semibold pt-2 text-center text-muted-foreground">
                Grid
              </p>
            </div>
            <div className="rounded-md border bg-accent/30 p-4 cursor-pointer">
              <div className="h-24 flex items-center justify-center">
                <Carousel />
              </div>
              <p className="text-sm font-semibold pt-2 text-center text-muted-foreground">
                Carousel
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
