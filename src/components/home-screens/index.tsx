import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  TodoForm,
} from "@/components";
import { useStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { TaskList } from "./TaskList";
import { TFilter } from "@/types/entities";


function HomeScreen() {
  const tasks = useStore((state) => state.tasks);
  const [filter, setFilter] = useState<TFilter>("all");
  const [openCreate, setOpenCreate] = useState(false);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    if (tasks.length === 0) {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);
  useEffect(() => {
    useStore.getState().retrieveTasks();
  }, []);
  return (
    <div className="max-w-96 mx-auto p-2 mt-10 ">
      <h1 className="text-3xl font-semibold text-center mb-10 text-muted-foreground">
        Todo App
      </h1>
      <div className="grid grid-cols-4 space-x-4">
        <Sheet open={openCreate} onOpenChange={setOpenCreate}>
          <Button onClick={() => setOpenCreate(true)}>Add Task!</Button>
          <SheetContent side={"right"}>
            <SheetHeader className="mb-8">
              <SheetTitle>Add your task details here!</SheetTitle>
            </SheetHeader>
            <TodoForm setOpen={setOpenCreate} />
          </SheetContent>
        </Sheet>
        <Select
          defaultValue="all"
          onValueChange={(value: TFilter) => {
            setFilter(value);
          }}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <TaskList tasks={tasks} filter={filter} />
    </div>
  );
}

export { HomeScreen };
