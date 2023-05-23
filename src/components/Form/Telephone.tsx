import { ChangeEvent, ChangeEventHandler, useState } from "react";

interface Telephone {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Telephone = ({ value, onChange }: Telephone) => {
  const [touched, setTouched] = useState(false);
  const [validity, setValidity] = useState<Partial<ValidityState>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValidity(e.target.validity);
    onChange(e);
  };

  const isValid = (validity.valid && value) || !touched;

  return (
    <div className="telephone">
      <input
        type="tel"
        id="number"
        value={value}
        name="number"
        placeholder="123-456-7890"
        onChange={handleInputChange}
        className="telephone__input"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        onBeforeInputCapture={() => setTouched(true)}
      />
      {!isValid && (
        <span className="telephone__error">
          Input is invalid. Number should look like this: 123-456-7890
        </span>
      )}
    </div>
  );
};
