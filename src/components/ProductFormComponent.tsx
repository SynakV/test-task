import { Form } from "./Form/Form";
import { Picture } from "./Form/Picture";
import { postRequest } from "./utils/api";
import type { PictureType } from "./utils/types";
import React, { useState, useEffect } from "react";
import {
  DEFAULT_STATUS,
  DROPDOWN_OPTIONS,
  RADIO_OPTIONS,
} from "./utils/constants";

type FormType = {
  radio: string;
  dropdown: string;
  telephone: string;
  picture: PictureType | null;
};

export const ProductFormComponent = () => {
  const { Field, Radio, Dropdown, Telephone, Image } = Form;

  const [status, setStatus] = useState(DEFAULT_STATUS);

  const [form, setForm] = useState<FormType>({
    telephone: "",
    picture: null,
    radio: RADIO_OPTIONS[0],
    dropdown: DROPDOWN_OPTIONS[0],
  });

  const handleSetForm = (field: keyof FormType, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSendRequest = async (form: FormType) => {
    const response = await postRequest(form);

    if (response.error) {
      setStatus(response.message);
    } else {
      setStatus("Success!");
    }
  };

  useEffect(() => {
    setStatus(DEFAULT_STATUS);

    const postRequest = setTimeout(() => {
      handleSendRequest(form);
    }, 2000);

    return () => clearTimeout(postRequest);
  }, [form]);

  const { radio, dropdown, telephone, picture } = form;

  return (
    <div className="main">
      <main className="form">
        <span className="title">Form</span>
        <Field label="Radio">
          <Radio.Group
            name="radios"
            defaultChecked={radio}
            options={RADIO_OPTIONS}
            setRadio={(value) => handleSetForm("radio", value)}
          />
        </Field>
        <Field label="Dropdown">
          <Dropdown
            defaultValue={dropdown}
            options={DROPDOWN_OPTIONS}
            onChange={(e) => handleSetForm("dropdown", e.target.value)}
          />
        </Field>
        <Field label="Telephone">
          <Telephone
            value={telephone}
            onChange={(e) => handleSetForm("telephone", e.target.value)}
          />
        </Field>
        <Field label="Image">
          <Image
            alt="image"
            updatePicture={(picture) => handleSetForm("picture", picture)}
          />
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

      <span className="status">{status}</span>
    </div>
  );
};
