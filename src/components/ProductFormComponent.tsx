import { Form } from "./Form/Form";
import { Picture } from "./Form/Picture";
import { postRequest } from "./utils/api";
import React, { useState, useEffect } from "react";
import type { ErrorType, PictureType } from "./utils/types";
import {
  RADIO_OPTIONS,
  DEFAULT_STATUS,
  DROPDOWN_OPTIONS,
} from "./utils/constants";

type FormType = {
  radio: string;
  dropdown: string;
  telephone: string;
  picture: PictureType | null;
};

export const ProductFormComponent = () => {
  const { Field, Radio, Dropdown, Telephone, Image } = Form;

  const [status, setStatus] = useState<Partial<ErrorType>>(DEFAULT_STATUS);

  const [form, setForm] = useState<FormType>({
    telephone: "",
    picture: null,
    radio: RADIO_OPTIONS[0],
    dropdown: DROPDOWN_OPTIONS[0],
  });

  const handleSetForm = (
    field: keyof FormType,
    value: string | PictureType
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSendRequest = async (form: FormType) => {
    const response = await postRequest<FormType>(form);

    if (response.error) {
      setStatus(response);
    } else {
      setStatus({ message: "Success!" });
    }
  };

  useEffect(() => {
    const postRequest = setTimeout(() => {
      setStatus(DEFAULT_STATUS);
      handleSendRequest(form);
    }, 500);

    return () => clearTimeout(postRequest);
  }, [form]);

  const { radio, dropdown, telephone, picture } = form;

  const statusClassName =
    status.message !== DEFAULT_STATUS.message
      ? status.error
        ? "status__error"
        : "status__success"
      : "";

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

      <span className={`status ${statusClassName}`}>{status.message}</span>
    </div>
  );
};
