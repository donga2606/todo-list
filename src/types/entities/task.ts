export type Task = {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    id: string;
  };
  
  export type TFilter = "all" | "pending" | "completed";
  