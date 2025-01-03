'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Card {
  id: number;
  content: string;
  image: string;
  title: string;
}

interface FlipCardCarousel {
  data: Card[];
}

const StackedCardCarousel: React.FC<FlipCardCarousel> = ({ data }) => {
  const [cards, setCards] = useState<Card[]>(data);

  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

  const moveCard = (dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        if (dir === 'next') {
          const firstCard = newCards.shift();
          if (firstCard) newCards.push(firstCard);
        } else {
          const lastCard = newCards.pop();
          if (lastCard) newCards.unshift(lastCard);
        }
        return newCards;
      });
      setIsAnimating(false);
      setDirection(null);
    }, 300); // Sesuaikan dengan durasi animasi
  };

  const nextCard = () => moveCard('next');
  const prevCard = () => moveCard('prev');

  return (
    <div className="relative w-full h-full">
      <AnimatePresence>
        {cards.map((card, index) => {
          return (
            <motion.div
              key={card.id}
              className={`absolute w-[90%] bottom-0 -right-10 h-[95%] shadow-lg flex items-center justify-start flex-col text-white text-2xl font-bold`}
              initial={{
                scale: 1,
                y: 0,
                x: 800,
              }}
              animate={{
                scale: index === 0 && direction === 'next' ? 1 : 1,
                y:
                  (index === 0 && direction === 'next') || (index === cards.length - 1 && direction === 'prev')
                    ? index * 10
                    : index * 10,
                x:
                  index === 0 && direction === 'next'
                    ? 1500
                    : index === cards.length - 1 && direction === 'prev'
                      ? 1500
                      : index * -15,
                zIndex: direction === 'prev' ? cards.length - index : cards.length - index,
                borderRadius: index === 2 && direction === 'prev' ? '150px 150px 0 0px' : '150px 0px 0px 0px',

                backgroundColor: index === 1 ? '#c084fc' : index === 2 ? '#d8b4fe' : '#a855f7',
                // opacity: index * 0.2,
              }}
              exit={{
                scale: 0,
                x: direction === 'next' ? 0 : 0,
                y: direction === 'next' ? -105 : -105,
                borderRadius: '60px 0px 0px 0px',
              }}
              transition={{
                duration: 2,
                type: 'spring',
                stiffness: 210,
                damping: 20,
                mass: 1,
                ease: 'easeInOut',
              }}
            >
              <div className="flex justify-center items-center flex-col py-10">
                <img src={card.image} alt={card.content} />
                <div className="-mt-16 px-30 text-center flex flex-col gap-10">
                  <div className="text-4xl">{card.title}</div>
                  <p className="text-lg font-normal">{card.content}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div
        style={{
          zIndex: 100,
        }}
        className="absolute flex w-full gap-4  justify-center bottom-[10px] left-[calc(50%+70px)] transform -translate-x-1/2 flex space-x-4"
      >
        <button onClick={prevCard} className="bg-transparent hover:bg-none w-20 h-auto  group" disabled={isAnimating}>
          {/* <Icon
						icon='material-symbols-light:arrow-circle-left-outline-rounded'
						width='70'
						height='70'
					/> */}
          <svg
            className="text-white  group-hover:hidden"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 28C0.5 12.8122 12.8122 0.5 28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28Z"
              stroke="white"
              strokeOpacity="0.5"
            />
            <path
              d="M35 28H21M21 28L28 35M21 28L28 21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            width="60"
            className="text-white hidden group-hover:inline rotate-180"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z"
              fill="white"
            />
            <path
              d="M0.5 28C0.5 12.8122 12.8122 0.5 28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28Z"
              stroke="white"
              strokeOpacity="0.5"
            />
            <path
              d="M21 28H35M35 28L28 21M35 28L28 35"
              stroke="#AB73F2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button onClick={nextCard} className="bg-transparent hover:bg-none w-20 h-auto group" disabled={isAnimating}>
          <svg
            className="text-white  group-hover:hidden rotate-180"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 28C0.5 12.8122 12.8122 0.5 28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28Z"
              stroke="white"
              strokeOpacity="0.5"
            />
            <path
              d="M35 28H21M21 28L28 35M21 28L28 21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <svg
            width="60"
            className="text-white hidden group-hover:inline "
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z"
              fill="white"
            />
            <path
              d="M0.5 28C0.5 12.8122 12.8122 0.5 28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28Z"
              stroke="white"
              strokeOpacity="0.5"
            />
            <path
              d="M21 28H35M35 28L28 21M35 28L28 35"
              stroke="#AB73F2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StackedCardCarousel;
