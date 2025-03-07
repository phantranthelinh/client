import LoginForm from "@/components/auth/LoginForm";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login/")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col justify-center items-center mx-auto px-6 py-8 lg:py-0 md:h-screen">
        <a
          href="#"
          className="flex items-center mb-6 font-semibold text-2xl text-gray-900 dark:text-white"
        >
          <img className="mr-2 w-8 h-8" src="nike-brand.svg" alt="logo" />
          Nike
        </a>
        <LoginForm />
      </div>
    </section>
  );
}
