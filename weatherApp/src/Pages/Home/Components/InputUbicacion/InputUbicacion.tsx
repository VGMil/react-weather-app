import { ChangeEvent, useState } from "react";
import { InputTextProps } from "../../../../Components/Input/input.props";
import InputText from "../../../../Components/Input/InputText";

const InputUbicacion = ({
  label,
  name,
  value,
  onChange,
  onError,
}: InputTextProps) => {
  const [currentError, setError] = useState("");

  const handleValidation = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let error = "";

    if (/[!@#$%^&*()_+={};:"\\|,.<>/?]+/.test(value)) {
      error = "Sin caracteres especiales";
    }
    onError?.(currentError);
    setError(error);
    onChange(e);
  };

  return (
    <InputText
      name={name}
      label={label}
      value={value}
      errors={currentError}
      required
      enabled
      maxLength={15}
      onChange={handleValidation}
      onError={(error) => {
        if (error) setError(error);
      }}
    />
  );
};

export default InputUbicacion;
