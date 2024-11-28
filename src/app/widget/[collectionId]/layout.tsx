export default function WidgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>; // Just return the content for the widget, no root layout
}
