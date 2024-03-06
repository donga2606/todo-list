import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});
