import { LoginForm } from "@components/login";
import { useTestAxios } from "@resources/rest/test.rest";
import React, { useEffect } from "react";

const LoginPage: React.FC = () => {
	const [tesAxios] = useTestAxios();

	useEffect(() => {
		tesAxios().then(() => {});
	}, []);

	return (
		<div className='h-screen w-min-screen overflow-hidden'>
			<LoginForm />
		</div>
	);
};

export default LoginPage;
