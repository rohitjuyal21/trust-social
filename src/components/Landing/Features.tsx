import { features } from "@/config/features";
import React from "react";

export default function Features() {
  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col flex-1 px-4 md:px-6 my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex gap-4 border rounded-lg shadow-md p-4 md:p-6"
          >
            <feature.icon className="size-6 flex-shrink-0 mt-2" />

            <div>
              <h3 className="text-lg font-medium">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
