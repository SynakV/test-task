import { Form } from "./Form";
import { ChangeEvent, ChangeEventHandler } from "react";

interface RadioGroup {
  name: string;
  options: string[];
  defaultChecked: string;
  setRadio: (value: string) => void;
}

export const RadioGroup = ({
  name,
  options,
  setRadio,
  defaultChecked,
}: RadioGroup) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadio(e.target.value);
  };

  return (
    <div className="radio__group">
      {options.map((radio, index) => (
        <Form.Radio
          key={index}
          name={name}
          index={index}
          value={radio}
          onChange={handleChange}
          defaultChecked={defaultChecked}
        />
      ))}
    </div>
  );
};

interface Radio {
  name: string;
  value: string;
  index: number;
  defaultChecked: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Radio = ({
  name,
  value,
  index,
  onChange,
  defaultChecked,
}: Radio) => {
  const id = name + index.toString();

  return (
    <div className="radio__item">
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked === value}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

Radio.Group = RadioGroup;
