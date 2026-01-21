# @devxhub/form-elements

A comprehensive form elements library built with Material-UI for React
applications. This library provides a collection of customizable form
components, validation utilities, and hooks for building robust forms.

## Features

- 🎨 **Material-UI Integration**: Built on top of Material-UI with consistent
  theming
- 🔧 **Customizable Components**: Highly customizable form elements with
  consistent API
- ✅ **Built-in Validation**: Comprehensive validation utilities and hooks
- 🎯 **TypeScript Support**: Full TypeScript support with proper type
  definitions
- 🪝 **Custom Hooks**: Powerful hooks for form state management and validation
- 📱 **Responsive Design**: Mobile-friendly components with responsive behavior

## Installation

This library is part of the Nx workspace and can be imported using the
configured path mapping:

```typescript
import { CustomTextField, useForm, commonValidationRules } from "@devxhub/form-elements";
```

## Components

### Input Components

- **CustomTextField**: Enhanced text input with custom styling
- **CustomOutlinedInput**: Outlined input variant
- **CustomSelect**: Custom select dropdown
- **CustomAutoComplete**: Autocomplete component with search functionality

### Form Controls

- **CustomCheckbox**: Styled checkbox component
- **CustomRadio**: Custom radio button component
- **CustomSwitch**: Toggle switch component
- **CustomSlider**: Range slider component
- **CustomRangeSlider**: Dual-handle range slider

### Buttons

- **CustomOutlinedButton**: Outlined button variant
- **CustomSocialButton**: Social media login buttons
- **CustomDisabledButton**: Disabled state button

### Labels

- **CustomFormLabel**: Consistent form labels

## Usage Examples

### Basic Form with Validation

```typescript
import React from "react";
import {
  CustomTextField,
  CustomCheckbox,
  CustomOutlinedButton,
  useForm,
  commonValidationRules,
} from "@devxhub/form-elements";

const MyForm = () => {
  const form = useForm({
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const validationRules = {
    email: [commonValidationRules.required(), commonValidationRules.email()],
    password: [commonValidationRules.required(), commonValidationRules.strongPassword()],
    agreeToTerms: [commonValidationRules.required()],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.validateForm(validationRules)) {
      try {
        form.setSubmitting(true);
        // Submit form data
        console.log("Form data:", form.values);
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        form.setSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomTextField
        label="Email"
        type="email"
        value={form.values.email}
        onChange={(e) => form.setValue("email", e.target.value)}
        onBlur={() => form.setTouched("email")}
        error={form.touched.email && !!form.errors.email}
        helperText={form.touched.email && form.errors.email}
        fullWidth
        margin="normal"
      />

      <CustomTextField
        label="Password"
        type="password"
        value={form.values.password}
        onChange={(e) => form.setValue("password", e.target.value)}
        onBlur={() => form.setTouched("password")}
        error={form.touched.password && !!form.errors.password}
        helperText={form.touched.password && form.errors.password}
        fullWidth
        margin="normal"
      />

      <CustomCheckbox
        checked={form.values.agreeToTerms}
        onChange={(e) => form.setValue("agreeToTerms", e.target.checked)}
      />

      <CustomOutlinedButton type="submit" disabled={form.isSubmitting || !form.isValid} fullWidth>
        {form.isSubmitting ? "Submitting..." : "Submit"}
      </CustomOutlinedButton>
    </form>
  );
};
```

## API Reference

### Hooks

#### `useForm(initialValues)`

Main hook for form state management.

#### `useFieldValidation(value, rules, touched)`

Hook for individual field validation.

#### `useFormSubmission(onSubmit, validationRules)`

Hook for handling form submission with validation.

### Validation Rules

- `commonValidationRules.required()`: Required field validation
- `commonValidationRules.email()`: Email format validation
- `commonValidationRules.phone()`: Phone number validation
- `commonValidationRules.strongPassword()`: Strong password validation
- `commonValidationRules.minLength(length)`: Minimum length validation
- `commonValidationRules.maxLength(length)`: Maximum length validation

## Dependencies

This library depends on:

- React 19+
- Material-UI v6+
- TypeScript 5+

Make sure these are installed in your project.
