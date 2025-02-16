import { ChangeEvent, useState } from "react";
import { InputTextProps } from "./input.props";
import styles from "./Input.module.css";

const InputText = ({
  label,
  value,
  onChange,
  enabled = true,
  required = false,
  name,
  showErrors = true,
  minLength = 1,
  maxLength = 10,
  errors: externalError,
  onError,
}: InputTextProps) => {
  const [internalErrors, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const currentError = externalError || internalErrors;

  const validateInput = (value: string) => {
    if (!touched) return;

    let newError = "";

    if (required && !value) {
      newError = `${label} es requerido`;
    } else if (value.length < minLength) {
      newError = `${label} minimo ${minLength} caracteres`;
    } else if (value.length > maxLength) {
      newError = `${label} maximo ${maxLength} caracteres`;
    }

    setError(newError);
    onError?.(newError);
  };

  const handleBlur = () => {
    setTouched(true);
    validateInput(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    validateInput(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        name={name}
        className={`${styles.input} ${currentError ? styles.error : ""}`}
        type="text"
        value={value}
        onChange={handleChange}
        disabled={!enabled}
        onBlur={handleBlur}
      />
      {showErrors && currentError && (
        <span className={styles.errorMessage}>{currentError}</span>
      )}
    </div>
  );
};

export default InputText;
