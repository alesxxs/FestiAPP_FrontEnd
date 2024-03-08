import React, { Fragment } from "react";
import { useField } from "informed";
import Form from "react-bootstrap/Form";

const CustomInput = (props) => {
  const { textLabel } = props;

  const { fieldState, fieldApi, ref, userProps } = useField({
    ...props,
  });

  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const { onChange, onBlur, getFile, ...rest } = userProps;

  return (
    <Fragment>
      <Form.Label htmlFor="inputPassword5">{textLabel}</Form.Label>
      <Form.Control
        {...rest}
        ref={ref}
        value={!value && value !== 0 ? "" : value}
        onChange={(e) => {
          setValue(e.target.value);
          if (onChange) {
            onChange(e);
          }
          getFile ? getFile(e) : null
        }}
        onBlur={(e) => {
          setTouched(true);
          if (onBlur) {
            onBlur(e);
          }
        }}
      />
    </Fragment>
  );
};

export default CustomInput;
