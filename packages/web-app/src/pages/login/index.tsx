import { useTestAxios } from '@resources/rest/test.rest';
import React, { useEffect } from 'react';

const LoginPage: React.FC = () => {
  const [tesAxios] = useTestAxios();

  useEffect(() => {
    tesAxios().then(() => {});
  }, []);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-green-700 text-center">POS</h1>
      <h6 className="mb-3">By: Tulungagung Developer</h6>
    </div>
  );
};

export default LoginPage;
