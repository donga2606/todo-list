import LoginHouseLight from "@/assets/images/login-house-light.svg";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: () => (
    <div className="relative h-[900px] sm:h-screen items-center grid grid-cols-1 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative h-full flex-col bg-muted p-10 text-white flex dark:border-r order-2 lg:order-1">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img
            src={LoginHouseLight}
            width={1280}
            height={843}
            alt="Authentication"
            className="block dark:hidden"
          />
        </div>
        <div className="z-20 mt-10">
          <blockquote className="space-y-2">
            <p className="text-md xl:text-lg">
              &ldquo;Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.&rdquo;
            </p>
            <footer className="text-sm">Mark Twain</footer>
          </blockquote>
        </div>
      </div>
      <div className="container lg:p-8 order-1 lg:order-2">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[450px] ">
          <Outlet />
        </div>
      </div>
    </div>
  ),
});
