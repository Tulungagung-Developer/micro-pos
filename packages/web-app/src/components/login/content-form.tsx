import React, { useState } from "react";
import { Form, Schema, Button, FormInstance } from "rsuite";

const { StringType } = Schema.Types;

// Define the schema model
const model = Schema.Model({
	email: StringType()
		.isEmail("Please include '@' in the email address")
		.isRequired("This field is required"),
	password: StringType().isRequired("This field is required"),
});

// Define props type for TextField
interface TextFieldProps {
	email: string;
	label: string;
	accepter?: React.ElementType; // For custom input types
	type?: string; // To handle input types like 'password'
	[key: string]: any; // To allow additional props
}

// TextField component
const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
	({ name, label, accepter, type, ...rest }, ref) => {
		return (
			<Form.Group className='w-full flex-col gap-2 flex ' controlId={name}>
				<Form.ControlLabel>{label}</Form.ControlLabel>
				<Form.Control
					className='w-full rounded-lg p-1'
					name={name}
					accepter={accepter}
					type={type}
					ref={ref}
					{...rest}
				/>
			</Form.Group>
		);
	}
);
TextField.displayName = "TextField";

export const ContentForm: React.FC = () => {
	const formRef = React.useRef<FormInstance>(null);
	const [data, setData] = useState<{ email: string; password: string }>({
		email: "",
		password: "",
	});

	const handleSubmit = () => {
		console.log(data);
	};

	return (
		<div className='flex flex-col gap-10 px-5 lg:px-0 w-full lg:w-1/2 text-base lg:text-lg'>
			<div className='flex justify-center gap-5 items-center flex-col'>
				<img
					width={100}
					height={100}
					alt='waodkaod'
					src='/images/Logomark.png'
				/>
				<div className='text-4xl font-bold'>Login</div>
				<p className='text-gray-500 '>
					Login to start billing and stock management
				</p>
			</div>
			<Form
				className='flex flex-col  gap-7 w-full'
				ref={formRef}
				model={model}
				formValue={data}
				onChange={(formValue) =>
					setData(formValue as { email: string; password: string })
				}
				fluid>
				<TextField placeholder='Masukan Email' name='email' label='Username' />
				<TextField name='password' label='Password' type='password' />
				<Form.Group className='w-full gap-5 flex flex-col'>
					<div className='flex  flex-row justify-between items-center'>
						<div className='flex items-center justify-center gap-2'>
							<input type='checkbox' />
							<span className=''>Remember for 1 day</span>
						</div>
						<div>
							<a href='#'>Forgot Password?</a>
						</div>
					</div>
					<Button
						className='w-full py-3 text-white bg-purple-500 hover:text-white hover:bg-purple:400 font-semibold'
						onClick={handleSubmit}>
						Login
					</Button>
				</Form.Group>
			</Form>
		</div>
	);
};
