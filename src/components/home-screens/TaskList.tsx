import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components";
import { useStore } from "@/store";
import { useState } from "react";
import { EditSheet } from "./EditSheet";
import { TFilter, Task } from "@/types/entities";

type Props = {
  tasks: Task[];
  filter: TFilter;
};

const TaskList = ({ tasks, filter }: Props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const updateTask = useStore((state) => state.updateTask);
  const deleteTask = useStore((state) => state.deleteTask);
  return (
    <div>
      <EditSheet
        open={openEdit}
        setOpen={setOpenEdit}
        selectedTask={selectedTask}
      />
      {tasks.length === 0 && (
        <p className="mt-10 ml-4 text-muted-foreground">No tasks yet..</p>
      )}
      {tasks.length > 0 && (
        <div className="rounded-sm mb-10 mt-6">
          <ul className="space-y-4">
            {tasks
              .filter((task) => {
                return (
                  task.completed === (filter === "completed") ||
                  filter === "all"
                );
              })
              .map((task) => {
                return (
                  <div key={task.id}>
                    <Card>
                      <CardHeader>
                        <CardTitle
                          className={`${
                            task.completed &&
                            "line-through text-muted-foreground"
                          }`}
                        >
                          {task.title}
                        </CardTitle>
                        <CardDescription className="flex space-x-2">
                          {task.completed && (
                            <Badge variant="default">Completed</Badge>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="break-words">
                          {task.description}
                        </CardDescription>
                        <p className="mt-4 text-xs text-muted-foreground">
                          <Badge variant={"destructive"}>
                            {task.dueDate.toDateString()}
                          </Badge>
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant={"outline"}
                          onClick={() => {
                            setSelectedTask(task);
                            setOpenEdit(true);
                          }}
                          className="mr-2"
                        >
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" className="mr-2">
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your task and remove it
                                forerver.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  deleteTask(task.id);
                                }}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button
                          onClick={() => {
                            updateTask(task.id, {
                              ...task,
                              completed: !task.completed,
                            });
                          }}
                          variant={task.completed ? "outline" : "default"}
                        >
                          {task.completed ? "Pending" : "Complete"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export { TaskList };

