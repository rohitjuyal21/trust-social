import { features } from "@/config/features";
import React from "react";
import Reveal from "../Reveal";

export default function Features() {
  return (
    <Reveal>
      <div className="max-w-screen-xl mx-auto w-full flex flex-col flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 border rounded-lg shadow-md p-4 md:p-6 backdrop-blur-[2px]"
            >
              <feature.icon className="size-5 flex-shrink-0 mt-1" />

              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
