import React, { useContext, useCallback } from "react";
import styled from "styled-components";
import { Box } from "grommet";
import { FormClose } from "grommet-icons";
import { NotificationContext } from "./NotificationProvider";

const Container = styled(Box)`
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	min-width: 300px;
	min-height: 40px;
	z-index: 9999;
	flex-direction: row;
`;

const CloseButton = styled(FormClose)`
	cursor: pointer;
`;

const Notification = ({ isError, text }) => {
  const notificationContext = useContext(NotificationContext);

	const clearNotification = useCallback(()=>{
    notificationContext.setNotification(null);
  }, [notificationContext]);

	return <Container
		background={isError ? "status-error" : "brand-bg-overlay"}
    color={isError ? "white" : "black"}
		pad="small"
		elevation="large"
		animation="fadeIn"
		round="xsmall"
		justify="between"
		align="center"
		border={{ color: (isError ? "neutral-4" : "brand-dark") }}>
		{text}
		<CloseButton color="white" onClick={clearNotification}/>
	</Container>;
};

export default Notification;