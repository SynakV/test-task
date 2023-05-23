import {
  useRef,
  useState,
  LegacyRef,
  useEffect,
  ChangeEvent,
  SetStateAction,
  Dispatch,
} from "react";
import { Form } from "./Form";
import { Picture } from "./Picture";
import type { PictureType } from "../utils/types";

interface Image {
  alt: string;
  updatePicture: (picture: PictureType) => void;
}

const RIBBON_OPTIONS = ["top-left", "top-right", "bottom-left", "bottom-right"];

export const Image = ({ updatePicture }: Image) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [picture, setPicture] = useState<PictureType>({
    position: RIBBON_OPTIONS[0],
  });

  useEffect(() => {
    updatePicture(picture);
  }, [picture]);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files && target.files[0]) {
      const image = URL.createObjectURL(target.files[0]);
      setPicture((prev) => ({ ...prev, image }));
    }
  };

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <Modal
        picture={picture}
        isOpen={isModalOpen}
        setPicture={setPicture}
        toggleModal={handleToggleModal}
      />
      <label>
        <input type="file" accept="image/*" onChange={handleInputChange} />
      </label>
      {picture.image && (
        <>
          <Picture image={picture.image} position={picture.position} />
          <button className="image__edit" onClick={handleToggleModal}>
            Edit
          </button>
        </>
      )}
    </>
  );
};

interface Modal {
  isOpen: boolean;
  picture: PictureType;
  toggleModal: () => void;
  setPicture: Dispatch<SetStateAction<PictureType>>;
}

export const Modal = ({
  isOpen,
  picture: { image, position },
  setPicture,
  toggleModal,
}: Modal) => {
  const ref: LegacyRef<HTMLDialogElement> = useRef(null);

  const { Radio } = Form;

  useEffect(() => {
    const modal = ref.current;

    if (!isOpen && modal?.open) {
      ref.current?.close();
    }

    if (isOpen && !modal?.open) {
      ref.current?.showModal();
    }
  }, [isOpen]);

  return (
    <dialog ref={ref} className="modal">
      <Picture image={image} position={position} />
      <Radio.Group
        name="ribbon"
        options={RIBBON_OPTIONS}
        setRadio={(position: string) =>
          setPicture((prev) => ({ ...prev, position }))
        }
        defaultChecked={position}
      />
      <button className="modal__close" onClick={toggleModal}>
        Close
      </button>
    </dialog>
  );
};

Image.Modal = Modal;
