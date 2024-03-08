import React, { Fragment } from "react";
import { useField } from "informed";
import Form from "react-bootstrap/Form";
import { useCountries } from "@/hooks/useCountries";

const CustomSelectCountries = (props) => {
  const { textLabel } = props;

  const { fieldState, fieldApi, ref, userProps } = useField({
    ...props,
  });

  const { allCountries } = useCountries();

  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const { onChange, onBlur, isCustomEvent, ...rest } = userProps;

  let orderArrayCountry = []

  if(allCountries) {
    allCountries.sort(function(a, b) {
      return a.countryName.localeCompare(b.countryName);
  });
  }

  return (
    <Fragment>
      <Form.Label htmlFor="inputPassword5">{textLabel}</Form.Label>
      <Form.Select
        {...rest}
        ref={ref}
        value={!value && value !== 0 ? "" : value}
        onChange={(e) => {
          setValue(e.target.value);
          if (onChange) {
            onChange(e);
          }
        }}
        onBlur={(e) => {
          setTouched(true);
          if (onBlur) {
            onBlur(e);
          }
        }}
      >
        {allCountries
          ? allCountries.map((country) => {
              return <option value={isCustomEvent ? country.countryName : country.countryCode}>{country.countryName}</option>;
            })
          : null}
      </Form.Select>
    </Fragment>
  );
};

export default CustomSelectCountries;
