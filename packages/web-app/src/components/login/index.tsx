import { useState } from "react";
import { ContentForm } from "./content-form";
import data from "./content.json";
import { Button, Carousel } from "rsuite";

export const LoginForm = () => {
	const [activeIndex, setActiveIndex] = useState(0); // State untuk mengelola indeks aktif

	// Fungsi untuk slide ke item berikutnya
	const handleNext = () => {
		setActiveIndex((prevIndex: number) => (prevIndex + 1) % data.length);
	};

	// Fungsi untuk slide ke item sebelumnya
	const handlePrev = () => {
		setActiveIndex((prevIndex: number) =>
			prevIndex === 0 ? data.length - 1 : prevIndex - 1
		);
	};
	return (
		<>
			<div className='grid grid-cols-12 w-full h-full'>
				<div className='col-span-12 relative lg:col-span-6 w-full h-full flex justify-center items-center'>
					<ContentForm />
					<img
						src='/images/Geometric shapes.png'
						className='top-0 absolute left-0'
					/>
				</div>
				<div className='col-span-6 w-full hidden lg:flex  h-full relative pt-10  flex justify-center items-center'>
					<Carousel
						autoplay={false} // Optional: Disable autoplay for better control
						activeIndex={activeIndex}
						onSelect={setActiveIndex}
						className='custom-slider h-full  h-min-screen  pl-10 bg-transparent'>
						{data &&
							data.map((card, index) => {
								return (
									<div
										className='text-white bg-purple-500 rounded-tl-[80px] rounded-bl-[80px]'
										key={index}>
										<div className='flex justify-center items-center flex-col py-10'>
											<img src={card.image} alt={card.content} />
											<div className='-mt-16 px-30 text-center flex flex-col  gap-10'>
												<div className='text-4xl font-bold'>{card.title}</div>
												<p className='text-lg font-normal'>{card.content}</p>
											</div>
										</div>
									</div>
								);
							})}
					</Carousel>
					<div className='absolute  bottom-14 flex justify-center gap-7 w-1/2 px-4'>
						<button
							onClick={handlePrev}
							className='bg-transparent hover:bg-none w-20 h-auto  group'>
							<svg
								className='text-white  group-hover:hidden'
								width='56'
								height='56'
								viewBox='0 0 56 56'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M0.5 28C0.5 12.8122 12.8122 0.5 28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28Z'
									stroke='white'
									stroke-opacity='0.5'
								/>
								<path
									d='M35 28H21M21 28L28 35M21 28L28 21'
									stroke='white'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</svg>

							<svg
								width='60'
								className='text-white hidden group-hover:inline rotate-180'
								height='56'
								viewBox='0 0 56 56'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z'
									fill='white'
								/>
								<path
									d='M0.5 28C0.5 12.8122 12.8122 0.5 28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28Z'
									stroke='white'
									stroke-opacity='0.5'
								/>
								<path
									d='M21 28H35M35 28L28 21M35 28L28 35'
									stroke='#AB73F2'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</svg>
						</button>
						<button
							onClick={handleNext}
							className='bg-transparent hover:bg-none w-20 h-auto group'>
							<svg
								className='text-white  group-hover:hidden rotate-180'
								width='56'
								height='56'
								viewBox='0 0 56 56'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M0.5 28C0.5 12.8122 12.8122 0.5 28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28Z'
									stroke='white'
									stroke-opacity='0.5'
								/>
								<path
									d='M35 28H21M21 28L28 35M21 28L28 21'
									stroke='white'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</svg>

							<svg
								width='60'
								className='text-white hidden group-hover:inline '
								height='56'
								viewBox='0 0 56 56'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z'
									fill='white'
								/>
								<path
									d='M0.5 28C0.5 12.8122 12.8122 0.5 28 0.5C43.1878 0.5 55.5 12.8122 55.5 28C55.5 43.1878 43.1878 55.5 28 55.5C12.8122 55.5 0.5 43.1878 0.5 28Z'
									stroke='white'
									stroke-opacity='0.5'
								/>
								<path
									d='M21 28H35M35 28L28 21M35 28L28 35'
									stroke='#AB73F2'
									stroke-width='2'
									stroke-linecap='round'
									stroke-linejoin='round'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
