import React from "react";
import styled from "styled-components";
import { pageWidthCss } from "../common/styles";
import { color } from "../theme";

const Line = styled.hr`
  ${pageWidthCss}
  box-shadow: 0px 2px 2px ${color("border.light", false)};
`;

export default () => <Line />;