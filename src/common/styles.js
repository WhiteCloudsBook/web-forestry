import styled, { css } from "styled-components";
import { color } from "../theme";

export const pageWidthCss = css`

  width: 80%;
  max-width: 600px;
  min-width: 360px;
`;

export const pageBoxShadow = css`
  box-shadow: 1px 7px 6px 0px ${color("border.light", false)};
`;

export const MainSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;