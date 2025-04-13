import React from 'react';
import { Form } from 'rsuite';

interface TextFieldProps {
  email: string;
  label: string;
  accepter?: React.ElementType; // For custom input types
  type?: string; // To handle input types like 'password'
  [key: string]: any; // To allow additional props
  name: string; //
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, label, accepter, type, ...rest }, ref) => {
    return (
      <Form.Group className="w-full flex-col gap-2 flex" controlId={name}>
        <Form.ControlLabel>{label}</Form.ControlLabel>
        <Form.Control
          className="w-full rounded-lg py-3 pl-3"
          name={name}
          accepter={accepter}
          type={type}
          ref={ref}
          {...rest}
        />
      </Form.Group>
    );
  },
);

// Atur displayName setelah deklarasi TextField
TextField.displayName = 'TextField';

export default TextField;
