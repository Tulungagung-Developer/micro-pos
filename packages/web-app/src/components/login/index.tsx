import { useState } from 'react';
import { ContentForm } from './content.form';
import { Carousel } from 'rsuite';
import data from './content.json';
import { PrevIcon } from '@components/svgs/prev';
import { NextIcon } from '@components/svgs/next';

export const LoginForm = () => {
  const [activeIndex, setActiveIndex] = useState(0); // State untuk mengelola indeks aktif

  // Fungsi untuk slide ke item berikutnya
  const handleNext = () => {
    setActiveIndex((prevIndex: number) => (prevIndex + 1) % data.length);
  };

  // Fungsi untuk slide ke item sebelumnya
  const handlePrev = () => {
    setActiveIndex((prevIndex: number) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };
  return (
    <>
      <div className="grid grid-cols-12 w-full h-full">
        <div className="col-span-12 relative lg:col-span-6 w-full h-full flex justify-center items-center">
          <ContentForm />
          <img src="/images/geometric_shapes.png" className="top-0 absolute left-0" />
        </div>
        <div className="col-span-6 w-full hidden lg:flex  h-full relative pt-10  flex justify-center items-center">
          <Carousel
            autoplay={false} // Optional: Disable autoplay for better control
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            className="custom-slider h-full  h-min-screen  pl-10 bg-transparent"
          >
            {data &&
              data.map((card, index) => {
                return (
                  <div className="text-white bg-purple-500 rounded-tl-[80px] rounded-bl-[80px]" key={index}>
                    <div className="flex justify-center items-center flex-col py-10">
                      <img src={card.image} alt={card.content} />
                      <div className="-mt-16 px-30 text-center flex flex-col  gap-10">
                        <div className="text-4xl font-bold">{card.title}</div>
                        <p className="text-lg font-normal">{card.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Carousel>
          <div className="absolute  bottom-14 flex justify-center gap-7 w-1/2 px-4">
            <button onClick={handlePrev} className="bg-transparent hover:bg-none w-20 h-auto  group">
              <PrevIcon />
            </button>
            <button onClick={handleNext} className="bg-transparent hover:bg-none w-20 h-auto group">
              <NextIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
