"use client";

import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import { CustomTextField } from "./CustomTextField";

interface AutoSelectionOptionProps {
  id?: string;
  value: string | number;
  label: string;
  code?: string;
  capital?: string;
  phoneCode?: string;
}

interface AutoCompleteProps {
  name: string;
  options: AutoSelectionOptionProps[];
  placeholder: string;
  value?: string | number | null;
  onChange?: (value: string | number) => void;
  error?: boolean;
  helperText?: string;
}

const CustomAutoComplete = ({
  name,
  options,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  ...props
}: AutoCompleteProps) => {
  const currentOption = options.find((option) => option.value?.toString() === value?.toString());

  return (
    <Autocomplete
      {...props}
      id={`${name}-auto-select`}
      fullWidth
      options={options}
      value={currentOption ?? null}
      autoHighlight
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) =>
        option.value?.toString() === value?.value?.toString()
      }
      onChange={(_, newValue) => {
        onChange?.(newValue ? newValue.value : "");
      }}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ fontSize: 15, "& > span": { mr: "10px", fontSize: 18 } }}
            {...otherProps}
          >
            {option.label}
          </Box>
        );
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          name={name}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

export { CustomAutoComplete };
export type { AutoCompleteProps, AutoSelectionOptionProps };
