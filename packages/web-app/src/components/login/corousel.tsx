"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "rsuite";

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
	const [direction, setDirection] = useState<"next" | "prev" | null>(null);

	const moveCard = (dir: "next" | "prev") => {
		if (isAnimating) return;
		setIsAnimating(true);
		setDirection(dir);
		setTimeout(() => {
			setCards((prevCards) => {
				const newCards = [...prevCards];
				if (dir === "next") {
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

	const nextCard = () => moveCard("next");
	const prevCard = () => moveCard("prev");

	return (
		<div className='relative w-full h-full'>
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
								scale: index === 0 && direction === "next" ? 1 : 1,
								y:
									(index === 0 && direction === "next") ||
									(index === cards.length - 1 && direction === "prev")
										? index * 10
										: index * 10,
								x:
									index === 0 && direction === "next"
										? 1500
										: index === cards.length - 1 && direction === "prev"
											? 1500
											: index * -15,
								zIndex:
									direction === "prev"
										? cards.length - index
										: cards.length - index,
								borderRadius:
									index === 2 && direction === "prev"
										? "150px 150px 0 0px"
										: "150px 0px 0px 0px",

								backgroundColor:
									index === 1 ? "#c084fc" : index === 2 ? "#d8b4fe" : "#a855f7",
								// opacity: index * 0.2,
							}}
							exit={{
								scale: 0,
								x: direction === "next" ? 0 : 0,
								y: direction === "next" ? -105 : -105,
								borderRadius: "60px 0px 0px 0px",
							}}
							transition={{
								duration: 2,
								type: "spring",
								// stiffness: 300,
								// damping: 20,
								// mass: 1,
								ease: "easeInOut",
							}}>
							<div className='flex justify-center items-center flex-col py-10'>
								<img src={card.image} alt={card.content} />
								<div className='-mt-16 px-30 text-center flex flex-col gap-10'>
									<div className='text-4xl'>{card.title}</div>
									<p className='text-lg font-normal'>{card.content}</p>
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
				className='absolute flex w-full gap-10  justify-center bottom-[50px] left-[calc(50%+50px)] group transform -translate-x-1/2 flex space-x-4'>
				<Button
					onClick={prevCard}
					className='bg-transparent   border border-2 border-white w-14 h-14 text-white  rounded-full'
					disabled={isAnimating}>
					Prev
				</Button>
				<Button
					onClick={nextCard}
					className='bg-transparent border border-2 border-white group border-white w-14 h-14 text-white  rounded-full'
					disabled={isAnimating}>
					Next
				</Button>
			</div>
		</div>
	);
};

export default StackedCardCarousel;
