import { Icon } from "@iconify/react";
import { Input, Popover, Whisper } from "rsuite";

export const Navbar = () => {
	return (
		<div className='w-full h-full flex flex-row justify-between items-center'>
			<div className='pl-10 text-2xl font-semibold'>All Products</div>
			<div className='py-4 w-[40%] relative'>
				<div className='absolute top-1/2 flex justify-center items-center py-1 px-2 gap-2 rounded-md bg-slate-200 right-1 transform -translate-y-1/2 '>
					<svg
						width='17'
						height='16'
						viewBox='0 0 17 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M11.1668 5.3335H5.8335V10.6668H11.1668V5.3335Z'
							stroke='#151924'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
						<path
							d='M3.8335 14.6665C4.9335 14.6665 5.8335 13.7665 5.8335 12.6665V10.6665H3.8335C2.7335 10.6665 1.8335 11.5665 1.8335 12.6665C1.8335 13.7665 2.7335 14.6665 3.8335 14.6665Z'
							stroke='#151924'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
						<path
							d='M3.8335 5.3335H5.8335V3.3335C5.8335 2.2335 4.9335 1.3335 3.8335 1.3335C2.7335 1.3335 1.8335 2.2335 1.8335 3.3335C1.8335 4.4335 2.7335 5.3335 3.8335 5.3335Z'
							stroke='#151924'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
						<path
							d='M11.1665 5.3335H13.1665C14.2665 5.3335 15.1665 4.4335 15.1665 3.3335C15.1665 2.2335 14.2665 1.3335 13.1665 1.3335C12.0665 1.3335 11.1665 2.2335 11.1665 3.3335V5.3335Z'
							stroke='#151924'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
						<path
							d='M13.1665 14.6665C14.2665 14.6665 15.1665 13.7665 15.1665 12.6665C15.1665 11.5665 14.2665 10.6665 13.1665 10.6665H11.1665V12.6665C11.1665 13.7665 12.0665 14.6665 13.1665 14.6665Z'
							stroke='#151924'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
					<div className='font-semibold'>F</div>
				</div>
				<div className='absolute top-1/2 flex justify-center items-center left-5 transform -translate-y-1/2 '>
					<svg
						width='21'
						height='20'
						viewBox='0 0 21 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M10.0834 17.4998C14.4557 17.4998 18.0001 13.9554 18.0001 9.58317C18.0001 5.21092 14.4557 1.6665 10.0834 1.6665C5.71116 1.6665 2.16675 5.21092 2.16675 9.58317C2.16675 13.9554 5.71116 17.4998 10.0834 17.4998Z'
							stroke='#444750'
							stroke-width='1.25'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
						<path
							d='M18.8334 18.3332L17.1667 16.6665'
							stroke='#444750'
							stroke-width='1.25'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
				</div>
				<Input
					placeholder='Search by name, sku or upc...'
					className='w-full pl-10 h-10 border-none focus:outline:none bg-slate-100 my-1 mx-2'
				/>
			</div>
			<div className='pr-6     flex flex-row gap-5'>
				<button className='bg-transparent hover:bg-transparent flex justify-center items-center'>
					<Icon icon='si:moon-line' width='20' height='20' />
				</button>
				<button className='bg-transparent hover:bg-transparent flex justify-center items-center'>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M10 5.36658V8.14158'
							stroke='#444750'
							stroke-width='1.25'
							stroke-miterlimit='10'
							stroke-linecap='round'
						/>
						<path
							d='M10.0166 1.66663C6.94992 1.66663 4.46658 4.14996 4.46658 7.21663V8.96663C4.46658 9.53329 4.23325 10.3833 3.94158 10.8666L2.88325 12.6333C2.23325 13.725 2.68325 14.9416 3.88325 15.3416C7.86658 16.6666 12.1749 16.6666 16.1582 15.3416C17.2832 14.9666 17.7666 13.65 17.1582 12.6333L16.0999 10.8666C15.8082 10.3833 15.5749 9.52496 15.5749 8.96663V7.21663C15.5666 4.16663 13.0666 1.66663 10.0166 1.66663Z'
							stroke='#444750'
							stroke-width='1.25'
							stroke-miterlimit='10'
							stroke-linecap='round'
						/>
						<path
							d='M12.7751 15.6833C12.7751 17.2083 11.5251 18.4583 10.0001 18.4583C9.24176 18.4583 8.54176 18.1417 8.04176 17.6417C7.54176 17.1417 7.2251 16.4417 7.2251 15.6833'
							stroke='#444750'
							stroke-width='1.25'
							stroke-miterlimit='10'
						/>
						<rect
							x='11.6668'
							y='0.833333'
							width='7.5'
							height='7.5'
							rx='3.75'
							fill='#AB73F2'
						/>
						<rect
							x='11.6668'
							y='0.833333'
							width='7.5'
							height='7.5'
							rx='3.75'
							stroke='white'
							stroke-width='1.66667'
						/>
					</svg>
				</button>
				<div>
					<Whisper
						trigger='click'
						placement='bottomStart'
						controlId={`control-id-bottom`}
						speaker={
							<Popover>
								content="Hover me to see the popover content"
								<i className='rs-icon-user'></i>
							</Popover>
						}>
						<div className='flex flex-row gap-2 flex justify-center items-center'>
							<div className='w-14 h-14 bg-slate-200 rounded-full'>
								<i className='rs-icon-bell'></i>
							</div>
							<div className='flex flex-col'>
								<div className='text-lg font-semibold'>Staff Satu</div>
								<div>Staffsatu@gmail.com</div>
							</div>
							<div className='flex justify-center items-center'>
								<Icon
									icon='iconamoon:arrow-down-2'
									width='35'
									height='35'></Icon>
							</div>
						</div>
					</Whisper>
				</div>
			</div>
		</div>
	);
};
