import React, { useContext, useState, useCallback, useEffect } from "react";
import { ThemeContext } from "grommet";
import styled from "styled-components";
import Modal from "react-modal";
import { getColor } from "../theme";
import { FormClose } from "grommet-icons";

Modal.setAppElement("#___gatsby");

const CloseButton = styled(FormClose)`
  z-index: 1;
	cursor: pointer;
  position: absolute;
  right: 0;
  top: 5px;
`;

export default ({ children, isOpen, onClose }) => {
  const theme = useContext(ThemeContext);
  const [overlayRef, setOverlayRef] = useState();

  const closeModal = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const onOverlayClick = (e) => {
      if (e.target.classList.contains("ReactModal__Overlay")) {
        closeModal();
      }
    };

    if (overlayRef) {
      overlayRef.addEventListener("click", onOverlayClick);
    }
    return () => {
      if (overlayRef) {
        overlayRef.removeEventListener("click", onOverlayClick);
      }
    };
  }, [overlayRef, closeModal]);

  return <Modal isOpen={isOpen}
                overlayRef={setOverlayRef}
                style={{
                  content: {
                    top: "50%",
                    left: "50%",
                    width: "100%",
                    maxWidth: "700px",
                    height: "90%",
                    transform: "translate(-50%, -50%)",
                    padding: 0,
                    backgroundColor: getColor(theme, "page-bg"),
                    display: "flex",
                    justifyContent: "center",
                  },
                  overlay: { backgroundColor: getColor(theme, "overlay-bg-transparent") },
                }}>
    <CloseButton size="large" onClick={closeModal}/>
    {children}
  </Modal>;
};