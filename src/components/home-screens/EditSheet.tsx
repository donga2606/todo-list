import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Task,
  TodoForm,
} from "..";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: Task | null;
};

const EditSheet = ({ open, setOpen, selectedTask }: TProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side={"bottom"}>
        <SheetHeader className="mb-8">
          <SheetTitle className="text-center">Edit your task</SheetTitle>
          <SheetDescription className="text-center">
            TaskId: {selectedTask?.id}
          </SheetDescription>
        </SheetHeader>
        <div className="max-w-96 mx-auto">
          <TodoForm selectedTask={selectedTask} mode="edit" setOpen={setOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { EditSheet };
