import { ContentForm } from "./content-form";
import StackedCardCarousel from "./corousel";
import data from "./content.json";

export const LoginForm = () => {
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
				<div className='col-span-6 w-full hidden lg:flex  h-full relative'>
					<StackedCardCarousel data={data} />
				</div>
			</div>
		</>
	);
};
