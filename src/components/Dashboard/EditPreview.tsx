import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import BasicSettings from "./BasicSettings";

export default function EditPreview() {
  return (
    <Tabs defaultValue="basic" className="md:w-[55%]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="basic">Basic</TabsTrigger>
        <TabsTrigger value="thank-you">Thank you page</TabsTrigger>
      </TabsList>
      <TabsContent value="basic">
        <BasicSettings />
      </TabsContent>
      <TabsContent value="thank-you">{/* <BasicSettings /> */}</TabsContent>
    </Tabs>
  );
}
