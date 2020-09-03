import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Modal from "../Modal";

const Trigger = styled.span`
  cursor: pointer;
`;

export default (ModalContent, modalProps) => (Component) =>
  ({ modalContentProps, ...componentProps }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onClick = useCallback(() => {
      setIsOpen(true);
    }, [setIsOpen]);

    const onClose = useCallback(() => {
      setIsOpen(false);
    }, [setIsOpen]);

    return <>
      <Trigger onClick={onClick}>
        <Component {...componentProps} />
      </Trigger>

      {isOpen && <Modal {...modalProps} isOpen
                        onClose={onClose}>
        <ModalContent {...modalContentProps}/>
      </Modal>}
    </>;
  };
