"use client";
import { FormControl, FormHelperText, Select } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledSelect = styled(Select)(() => ({}));

const CustomSelect = (props: any) => {
  const { error, helperText, ...rest } = props;

  return (
    <FormControl fullWidth error={error}>
      <StyledSelect {...rest} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export { CustomSelect };
