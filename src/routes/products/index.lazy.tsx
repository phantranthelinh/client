import Layout from "@/components/layouts";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <h1>Products</h1>
      {/* <div className="py-4 max-w-screen-xl">
        <h2 className="text-3xl text-left py-4">All Products</h2>
        <div className="grid grid-cols-4 gap-6">
          {Array.from({ length: 10 }).map((_, index) => {
            return <ProductCard id={index} key={index} />;
          })}
        </div>
      </div> */}
    </Layout>
  );
}
