import React, { useContext, useState, useCallback, useEffect } from "react";
import { ThemeContext } from "grommet";
import styled, { createGlobalStyle } from "styled-components";
import Modal from "react-modal";
import { getColor } from "../theme";
import { FormClose } from "grommet-icons";

Modal.setAppElement("#___gatsby");

export const ModalGlobalStyles = createGlobalStyle`

  .ReactModal__Body--open {
    padding-right: 15px; /* Avoid width reflow */  
  }
  
  .ReactModal__Overlay {
      opacity: 0;
      transition: opacity 1000ms ease-in-out;
  }
  
  .ReactModal__Overlay--after-open{
      opacity: 1;
  }
  
  .ReactModal__Overlay--before-close{
      opacity: 0;
  }

`;

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

  const onModalOpen = useCallback(()=>{
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = "fixed";
  }, []);

  const onModalClose = useCallback(()=>{
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }, []);

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
                onAfterOpen={onModalOpen}
                onAfterClose={onModalClose}
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
                  overlay: {
                    zIndex: "100",
                    backgroundColor: getColor(theme, "overlay-bg-transparent")
                  },
                }}>
    <CloseButton size="large" onClick={closeModal}/>
    {children}
  </Modal>;
};