import { Link } from "@tanstack/react-router";

const NotFound = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto px-4 lg:px-6 py-8 lg:py-16 max-w-screen-xl">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 font-extrabold text-7xl text-primary-600 lg:text-9xl dark:text-primary-500 tracking-tight">
            404
          </h1>
          <p className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl dark:text-white tracking-tight">
            Something's missing.
          </p>
          <p className="mb-4 font-light text-gray-500 text-lg dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{"{"}" "{"}"}
          </p>
          <Link
            href="/"
            className="inline-flex bg-primary-600 hover:bg-primary-800 my-4 px-5 py-2.5 rounded-lg focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 font-medium text-center text-sm text-white focus:outline-none"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
