import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const DELAY_AUTOPLAY_SLIDE = 3000;
const images = ["/slide-1.png", "/slide-2.png", "/slide-3.png"];
const Hero = () => {
  return (
    <section className="relative w-full text-[20px] text-white">
      <Carousel
        plugins={[
          Autoplay({
            delay: DELAY_AUTOPLAY_SLIDE,
          }),
        ]}
      >
        <CarouselContent className="ml-0 w-full">
          {images.map((image, index) => {
            return (
              <CarouselItem key={index} className="relative ml-0 pl-0 w-full">
                <img
                  src={image}
                  alt={`carousel-image-${index + 1}`}
                  className="w-full"
                />
                <div className="bottom-[25px] md:bottom-[75px] left-0 absolute bg-white hover:opacity-90 px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-medium font-oswald text-[15px] text-black/[.9] md:text-[30px] uppercase cursor-pointer">
                  Mua ngay
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Hero;
