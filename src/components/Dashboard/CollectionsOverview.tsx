import React from "react";
import { Card } from "../ui/card";
import { Layout, MessageSquare } from "lucide-react";

interface CollectionsOverviewProps {
  collections: number;
  testimonials: number;
}
export default function CollectionsOverview({
  collections,
  testimonials,
}: CollectionsOverviewProps) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-4">Overview</h2>
      <div className="flex sm:flex-row flex-col gap-4 w-full">
        <Card className="sm:p-6 p-4 flex-1 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-bold">Total Collections</h4>
            <Layout className="size-4" />
          </div>
          <div className="text-lg">{collections}</div>
        </Card>
        <Card className="sm:p-6 p-4 flex-1 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-bold">Total Testimonials</h4>
            <MessageSquare className="size-4" />
          </div>
          <div className="text-lg">{testimonials}</div>
        </Card>
      </div>
    </div>
  );
}
