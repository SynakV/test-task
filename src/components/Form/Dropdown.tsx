import { Form } from "./Form";
import { ChangeEventHandler } from "react";

interface Dropdown {
  options: string[];
  defaultValue?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export const Dropdown = ({ defaultValue, options, onChange }: Dropdown) => {
  return (
    <select
      name="select"
      onChange={onChange}
      className="dropdown"
      defaultValue={defaultValue || options[0]}
    >
      {options.map((option, index) => (
        <Form.Dropdown.Option key={index} value={option} />
      ))}
    </select>
  );
};

interface DropdownOption {
  value: string;
}

export const DropdownOption = ({ value }: DropdownOption) => {
  return <option value={value}>{value}</option>;
};

Dropdown.Option = DropdownOption;
