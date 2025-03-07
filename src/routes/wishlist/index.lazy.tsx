import MainLayout from "@/components/client/layout";
import WishlistItem from "@/components/client/WishlistItem";
import Wrapper from "@/components/common/Wrapper";
import { useWishlist } from "@/store/wishlist.store";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/wishlist/")({
  component: WishListPage,
});

function WishListPage() {
  const { wishlistItems } = useWishlist();

  return (
    <MainLayout>
      <Wrapper>
        {wishlistItems.length > 0 ? (
          <>
            <div className="mx-auto max-w-[800px] text-center">
              <div className="mb-5 font-semibold text-[28px] md:text-[32px] leading-tight">
                Sản phẩm yêu thích
              </div>
            </div>
            <section className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1000px]">
              {wishlistItems.map((item) => (
                <WishlistItem key={item.id} data={item} />
              ))}
            </section>
          </>
        ) : (
          <>
            <div className="flex flex-col flex-[2] items-center md:-mt-14 pb-[50px]">
              <img
                src="/empty-cart.jpg"
                alt="Empty Cart"
                width={300}
                height={300}
                className="w-[300px] md:w-[400px]"
              />

              <span className="mt-4 text-center">
                Dường như bạn chưa thêm bất kỳ sản phẩm nào vào danh sách yêu
                thích của mình.
                <br />
                Hãy khám phá các danh mục hàng đầu.
              </span>

              <Link
                className="bg-black hover:opacity-75 mt-8 mb-3 px-8 py-4 rounded-full font-medium text-lg text-white transition-transform active:scale-95"
                href="/"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </>
        )}
      </Wrapper>
    </MainLayout>
  );
}
