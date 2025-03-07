import { createLazyFileRoute } from "@tanstack/react-router";
import Wrapper from "@/components/common/Wrapper";
import MainLayout from "@/components/client/layout";

export const Route = createLazyFileRoute("/about/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <MainLayout>
        <Wrapper>
          <img
            className="mx-auto my-6"
            src="/nike-brand.svg"
            alt="Nike Logo"
            width={200}
            height={200}
          ></img>
          <section className="mx-auto max-w-[700px] text-xl">
            <p className="mt-2 mb-6">
              <b>Nike, Inc.</b>
              là một tập đoàn đa quốc gia của Mỹ hoạt động trong lĩnh vực thiết
              kế, phát triển, sản xuất và tiếp thị, bán hàng toàn cầu các sản
              phẩm quần áo, giày dép, phụ kiện, thiết bị và dịch vụ.
            </p>
            <p className="mb-6">
              Trụ sở chính của công ty nằm gần Beaverton, Oregon, thuộc khu vực
              đô thị Portland (Mỹ). Nike là một trong những nhà sản xuất thiết
              bị thể thao lớn nhất thế giới và cũng là nhà cung cấp hàng đầu về
              giày và quần áo thể thao.
            </p>
            <p className="mb-6">
              Công ty có hơn 44.000 nhân viên trên toàn thế giới, và vào năm
              2014, giá trị thương hiệu của Nike được định giá 19 tỷ USD (tương
              đương 17,5 tỷ EUR), khiến Nike trở thành thương hiệu giá trị nhất
              trong ngành thể thao. Nike được Bill Bowerman và Phil Knight thành
              lập vào ngày 25 tháng 1 năm 1964 với tên gọi Blue Ribbon Sports,
              và chính thức đổi tên thành Nike, Inc. vào ngày 30 tháng 5 năm
              1971. Tên công ty được lấy theo tên Nike (Νίκη), nữ thần chiến
              thắng trong thần thoại Hy Lạp.
            </p>
            <p className="mb-6">
              Ngoài thương hiệu chính, Nike còn tiếp thị sản phẩm dưới các nhãn
              hiệu Nike Pro, Nike+, Nike Golf, Nike Blazers, Air Jordan, Air Max
              cùng với các công ty con như Jordan, Hurley International và
              Converse.
            </p>
            <p className="mb-6">
              Nike tài trợ cho nhiều vận động viên và đội tuyển thể thao nổi
              tiếng trên toàn thế giới, với hai biểu tượng dễ nhận biết nhất là
              khẩu hiệu “Just Do It” và logo Swoosh (đại diện cho đôi cánh của
              nữ thần Nike).
            </p>
            <h3 className="my-6 font-semibold underline">
              Các thương vụ mua lại
            </h3>
            <p className="mb-6">
              Nike đã mua lại nhiều công ty thời trang và giày dép trong suốt
              lịch sử của mình, tuy nhiên một số thương hiệu sau đó đã được bán
              lại để tập trung vào lĩnh vực kinh doanh cốt lõi. Kể từ năm 2013,
              Nike chỉ sở hữu hai công ty con chính là Hurley International và
              Converse, Inc.
            </p>
            <h3 className="my-6 font-semibold underline">
              Phòng thí nghiệm nghiên cứu thể thao Nike Explore Team
            </h3>
            <div className="mb-6">
              Trong hơn 30 năm, phòng thí nghiệm của Nike đã cung cấp các hiểu
              biết khoa học nhằm thúc đẩy sự đổi mới về hiệu suất trên toàn bộ
              thương hiệu Nike brand.
              <p className="my-6 pl-5 border-l-2 border-l-black">
                <q className="bg-black/[.05]">
                  Chức năng của chúng tôi là cung cấp tri thức và hiểu biết.
                  Chúng tôi là kho lưu trữ toàn cầu về khoa học hiệu suất và
                  tiềm năng của con người
                </q>
              </p>
              Đội ngũ tại phòng thí nghiệm bao gồm hơn 40 nhà nghiên cứu thuộc
              nhiều lĩnh vực khoa học khác nhau như cơ sinh học, sinh lý học,
              vật lý, toán học, khoa học vận động học, kỹ thuật y sinh và kỹ
              thuật cơ khí.
            </div>
            <h3 className="my-6 font-semibold underline">Sứ mệnh</h3>
            <p className="mb-6">
              Sứ mệnh của Nike, Inc. là thúc đẩy sự đổi mới sản phẩm dành cho
              các vận động viên trên toàn thế giới. Hàng ngàn ý tưởng được thử
              nghiệm nhằm hỗ trợ nâng cao hiệu suất, giảm thiểu nguy cơ chấn
              thương, cải thiện cảm giác và nhận thức, cũng như mang đến những
              sản phẩm tiên tiến nhất cho các vận động viên.
            </p>
          </section>
        </Wrapper>
      </MainLayout>
    </main>
  );
}
