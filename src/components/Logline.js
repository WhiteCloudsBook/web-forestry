import React from "react";
import styled from "styled-components";
import { pageWidthCss } from "../common/styles";
import { HTMLContent } from "./Content";

const LoglineText = styled(HTMLContent)`
   font-size: 1.4rem;
   line-height: 1.5rem;
   font-family: 'Turret Road', cursive;
   padding: 6px;
   
   ${pageWidthCss}
`;

const Logline = ({ text }) => {
  return <LoglineText content={text}/>;
};

export default Logline;
