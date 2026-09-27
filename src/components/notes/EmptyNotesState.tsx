import { Empty } from "@/components/ui/empty";

export default function EmptyNotesState() {
  return (
    <div className="w-full py-16">
      <Empty
        className="mx-auto max-w-md"
        title="No notes posts yet"
        description="New posts will appear here soon."
      />
    </div>
  );
}
