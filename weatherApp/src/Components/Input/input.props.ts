import { ChangeEvent } from "react";

export interface InputTextProps {
  enabled?: boolean;
  required?: boolean;
  name: string;
  label: string;
  value: string;
  minLength?: number;
  maxLength?: number;
  errors?: string;
  showErrors?: boolean;
  validateFn?: (value: string) => string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onError?: (error: string) => void;
}
