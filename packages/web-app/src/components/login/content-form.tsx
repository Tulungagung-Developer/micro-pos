import TextField from '@components/input';
import React, { useState } from 'react';
import { Form, FormInstance, Schema } from 'rsuite';

const { StringType } = Schema.Types;

// Define the schema model
const model = Schema.Model({
  email: StringType().isEmail("Please include '@' in the email address").isRequired('This field is required'),
  password: StringType().isRequired('This field is required'),
});

// Define props type for TextField

// TextField component

function getRelativeCoordinates(event: MouseEvent): { x: number; y: number } {
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

export const ContentForm: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);
  const [data, setData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    console.warn(data);
  };

  const [showSpotlight, setShowSpotlight] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMousePosition(getRelativeCoordinates(e.nativeEvent));
  };

  const handleHoverStart = () => {
    setShowSpotlight(true);
  };
  const handleHoverEnd = () => {
    setShowSpotlight(false);
  };

  return (
    <div className="flex flex-col gap-10 px-5 lg:px-0 w-full lg:w-1/2 text-base lg:text-lg">
      <div className="flex justify-center gap-5 items-center flex-col">
        <img width={100} height={100} alt="waodkaod" src="/images/Logomark.png" />
        <div className="text-4xl font-bold">Login</div>
        <p className="text-gray-500 ">Login to start billing and stock management</p>
      </div>
      <Form
        className="flex flex-col  gap-7 w-full"
        ref={formRef}
        model={model}
        formValue={data}
        onChange={(formValue) => setData(formValue as { email: string; password: string })}
        fluid
      >
        <TextField placeholder="Masukan Email" name="email" label="Email" />
        <TextField placeholder="Masukan Password" name="password" label="Password" type="password" />
        <Form.Group className="w-full gap-5 flex flex-col">
          <div className="flex  flex-row justify-between items-center">
            <div className="flex items-center justify-center gap-2">
              <input type="checkbox" />
              <span className="">Remember for 1 day</span>
            </div>
            <div>
              <a className="text-purple-500" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            style={
              {
                '--left-value': `${mousePosition.x}px`,
                '--top-value': `${mousePosition.y}px`,
                '--after-opacity': showSpotlight ? 0.8 : 0.2,
              } as React.CSSProperties
            }
            onMouseMove={(e) => {
              handleMouseMove(e);
            }}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            className="w-full button-spotlight rounded-[8px] py-3 text-white bg-[#AB73F2]  text-xl hover:text-white font-semibold"
            onClick={handleSubmit}
          >
            Login
          </button>
        </Form.Group>
      </Form>
    </div>
  );
};
