import { Form } from "./Form/Form";
import { Picture } from "./Form/Picture";
import { PictureType } from "./Form/Image";
import React, { useState, ChangeEvent, useEffect } from "react";

const RADIO_OPTIONS = ["123", "456", "789"];
const DROPDOWN_OPTIONS = ["qwe", "rty", "uio", "asd", "fgh"];

export const ProductFormComponent = () => {
  const { Field, Radio, Dropdown, Telephone, Image } = Form;

  const [telephone, setTelephone] = useState<string>("");
  const [radio, setRadio] = useState<string>(RADIO_OPTIONS[0]);
  const [picture, setPicture] = useState<PictureType | null>(null);
  const [dropdown, setDropdown] = useState<string>(DROPDOWN_OPTIONS[0]);

  const result = {
    radio,
    dropdown,
    telephone,
    picture,
  };

  console.log(result);

  const handleSetRadio = (value: string) => {
    setRadio(value);
  };

  const handleSetDropdown = (e: ChangeEvent<HTMLSelectElement>) => {
    setDropdown(e.target.value);
  };

  const handleSetTelephone = (e: ChangeEvent<HTMLInputElement>) => {
    setTelephone(e.target.value);
  };

  const handleSetPicture = (picture: PictureType) => {
    setPicture(picture);
  };

  useEffect(() => {
    // fetch("https://eog44nwdg9l8mhw.m.pipedream.net", {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    //   body: JSON.stringify({
    //     test: "event",
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }, []);

  return (
    <div className="main">
      <main className="form">
        <span className="title">Form</span>
        <Field label="Radio">
          <Radio.Group
            name="my-radios"
            defaultChecked={radio}
            options={RADIO_OPTIONS}
            setRadio={handleSetRadio}
          />
        </Field>
        <Field label="Dropdown">
          <Dropdown
            defaultValue={dropdown}
            options={DROPDOWN_OPTIONS}
            onChange={handleSetDropdown}
          />
        </Field>
        <Field label="Telephone">
          <Telephone value={telephone} onChange={handleSetTelephone} />
        </Field>
        <Field label="Image">
          <Image alt="image" updatePicture={handleSetPicture} />
        </Field>
      </main>
      <div className="result">
        <span className="title">Result</span>
        <Field label="Radio">{radio}</Field>
        <Field label="Dropdown">{dropdown}</Field>
        <Field label="Telephone">{telephone}</Field>
        <Field label="Image">
          {picture?.image && (
            <Picture image={picture.image} position={picture.position} />
          )}
        </Field>
      </div>
    </div>
  );
};
