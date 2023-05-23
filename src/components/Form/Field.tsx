import { ReactNode } from "react";

interface Field {
  label: string;
  children: ReactNode;
}

export const Field = ({ label, children }: Field) => (
  <div className="form__field">
    <span className="form__label">{label}:</span>
    {children}
  </div>
);
