import CustomPing from "../CustomPing";
import { Badge } from "../ui/badge";

export default function PreviewBadge({ text }: { text?: string }) {
  return (
    <Badge variant="outline" className="bg-background">
      <span className="mr-1.5">
        <CustomPing />
      </span>
      <span className="text-nowrap">{text}</span>
    </Badge>
  );
}
