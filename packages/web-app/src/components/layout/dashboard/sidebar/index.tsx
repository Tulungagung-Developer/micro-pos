import { Icon } from "@iconify/react";
import React from "react";
import { Link, useLocation } from "react-router";

interface dataSidebarProps {
	link: string;
	name: string;
}

interface Menu {
	data: dataSidebarProps[];
	icon: React.ReactNode;
	name: string;
}

interface sidebarProps {
	title?: string;
	data: Menu[];
	isOpen?: boolean;
	onToggle?: () => void;
	className?: string;
}

export const Sidebar = ({
	data,
	className,
	onToggle,
	isOpen,
}: sidebarProps) => {
	const [indexMenu, setIndexMenu] = React.useState<string>("");
	const pathname = useLocation();
	// split the pathname
	const splitPath = pathname.pathname.split("/");
	const currentPath = splitPath[splitPath.length - 1];
	const handleClick = (index: string) => {
		if (index === indexMenu) {
			setIndexMenu("");
		} else {
			setIndexMenu(index);
		}
	};

	return (
		<section
			className={`flex flex-col w-full bg-black  justify-between items-center  gap-10 relative h-screen bg-white ${className}`}>
			<button
				onClick={onToggle}
				className='absolute py-1 rounded-lg -right-7 top-5 bg-purple-300 flex justify-center items-center'>
				<Icon
					style={{
						transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
					}}
					icon='iconamoon:arrow-left-2-light'
					width='30'
					height='30'
				/>
			</button>
			<div
				className={`flex px-4 justify-start gap-2 ${isOpen ? "items-start " : "items-center px-4"}  flex-col `}>
				<div className='py-3 gap-4 flex justify-center items-center'>
					<img
						className='w-14 h-14'
						src='/images/Quixotic.png'
						alt='Logo-MicroPos'
					/>
					{isOpen && (
						<div>
							<div>awd</div>
							<div>awodao</div>
						</div>
					)}
				</div>
				<div className='text-lg  uppercase'>MAIN</div>
				<div className='flex flex-col gap-2 justify-center w-full items-center'>
					{data &&
						data.map((menu, index: number) => {
							return (
								<div
									key={index}
									className={`flex flex-col justify-center w-full items-center `}>
									<div
										className={`${isOpen ? `justify-between ${index.toString() === indexMenu ? "bg-purple-500 px-2 py-4 rounded-xl text-white" : "py-4"}` : "justify-center"} flex flex-row gap-5 w-full  items-center`}>
										<button
											onClick={() => {
												handleClick(index.toString());
											}}
											className={` flex justify-center items-center rounded-xl  ${!isOpen ? ` ${index.toString() === indexMenu ? "hover:bg-purple-300 hover:text-white bg-purple-500 p-4 text-white " : " text-neutral-500 bg-transparent  hover:text-white hover:bg-purple-500 p-4"}` : "bg-transparent"}`}>
											{menu.icon}
										</button>
										{isOpen && (
											<div className='w-[150px] text-lg font-semibold'>
												{menu.name}
											</div>
										)}
									</div>
									{index.toString() === indexMenu && (
										<div
											className={`w-full h-auto flex flex-col justify-start items-center relative ${isOpen ? "relative right-16 " : ""}`}>
											<div
												className={`bg-[#D9DBE9] ${isOpen ? " left-20" : ``} h-[calc(100%-35px)] absolute  w-[3px]`}></div>
											<div
												className={`relative flex ${isOpen ? `left-[136px] ` : `left-[125px]`} pt-4 flex-col gap-5  h-full`}>
												<div
													className={`h-auto  ${isOpen ? "p-1" : "bg-white p-2"} flex flex-col gap-1 rounded-lg  w-full`}>
													{menu.data.map((data, index) => {
														return (
															<div
																key={index}
																className={`relative w-full  flex justify-center items-center ${isOpen ? "right-[30px]" : ""}`}>
																<div
																	className='rounded-bl-xl '
																	style={{
																		position: "absolute",
																		top: "5px",
																		left: "-45px",
																		width: "15px",
																		height: "15px",
																		borderLeft: "3px solid #D9DBE9", // Border di sisi kiri
																		borderBottom: "3px solid #D9DBE9", //
																	}}></div>

																<Link
																	className={` rounded-md justify-start
																		
																		text-lg font-semibold 
																		
																		py-[5px] items-start text-start w-full
																		no-underline hover:no-underline focus:no-underline

																		${isOpen ? `${data.name.toLowerCase() === currentPath ? `bg-purple-500 text-white hover:bg-purple-300 hover:text-white` : `text-[#D9DBE9] hover:text-[#D9DBE9]`} pl-3  relative right-7  pr-20` : `pl-3 pr-14 ${data.name.toLowerCase() === currentPath ? `bg-purple-500 hover:bg-purple-300 text-white hover:text-white` : `text-[#D9DBE9] hover:text-[#D9DBE9]`} `}
																	`}
																	to={data.link}>
																	{data.name}
																</Link>
															</div>
														);
													})}
												</div>
											</div>
										</div>
									)}
								</div>
							);
						})}
				</div>
			</div>
			<div className='py-2 '>
				<button className='p-2 hover:bg-purple-300 hover:text-white flex justify-center items-center rounded-xl bg-purple-500 text-white'>
					<Icon icon='si:add-line' width='30' height='30' />
				</button>
			</div>
		</section>
	);
};
