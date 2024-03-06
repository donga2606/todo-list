import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "..";
import { Task } from "@/types/entities";

const formSchema = z
  .object({
    title: z
      .string()
      .max(50, "Title must be less than 50 characters.")
      .min(1, "Title cannot be empty."),
    description: z
      .string()
      .max(200, "description must be less than 200 characters.")
      .min(1, "Description cannot be empty."),
    dueDate: z.date().optional(),
  })
  .required();
type Props = {
  selectedTask?: Task | null;
  mode?: "edit";
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValues = {
  title: "New task",
  description: "Decsription",
  dueDate: new Date(),
};

const TodoForm: React.FC<Props> = ({ mode, selectedTask, setOpen }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "edit" && selectedTask ? selectedTask : defaultValues,
  });

  const addTask = useStore((state) => state.addTask);
  const updateTask = useStore((state) => state.updateTask);
  const onCreate = (data: z.infer<typeof formSchema>) => {
    if (setOpen) {
      setOpen(false);
    }
    const uuid = uuidv4();
    addTask({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      completed: false,
      id: uuid,
    });
    form.reset();
  };
  const onEdit = (data: z.infer<typeof formSchema>) => {
    if (setOpen) {
      setOpen(false);
    }
    if (!selectedTask) return;
    updateTask(selectedTask.id, { ...selectedTask, ...data });
  };
  const onSubmit = mode === "edit" ? onEdit : onCreate;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Task title here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Description here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due-date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="float-end">
          Submit
        </Button>
        <div className="clear-both"></div>
      </form>
    </Form>
  );
};

export { TodoForm };
