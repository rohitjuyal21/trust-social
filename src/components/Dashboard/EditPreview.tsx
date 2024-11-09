// import React from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import BasicSettings from "./BasicSettings";

// interface EditPreviewProps {
//   header: string;
//   setHeader: React.Dispatch<React.SetStateAction<string>>;
//   customMessage: string;
//   setCustomMessage: React.Dispatch<React.SetStateAction<string>>;
// }

// export default function EditPreview({
//   header,
//   setHeader,
//   customMessage,
//   setCustomMessage,
// }: EditPreviewProps) {
//   return (
//     <Tabs defaultValue="basic" className="md:w-[55%]">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="basic">Basic</TabsTrigger>
//         <TabsTrigger value="thank-you">Thank you page</TabsTrigger>
//       </TabsList>
//       <TabsContent value="basic">
//         <BasicSettings
//           header={header}
//           setHeader={setHeader}
//           customMessage={customMessage}
//           setCustomMessage={setCustomMessage}
//         />
//       </TabsContent>
//       <TabsContent value="thank-you">{/* <BasicSettings /> */}</TabsContent>
//     </Tabs>
//   );
// }
