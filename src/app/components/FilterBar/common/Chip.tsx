import { Chip as MUIChip, ChipProps } from "@material-ui/core";
import { css } from "styled-components/macro";
import { ProjectPalette } from "app/theme";
import React from "react";

interface ChipModel extends ChipProps {}

const chip = css`
  background-color: #fff;
  font-weight: bold;
  color: ${ProjectPalette.primary.main};
  margin-right: 8px;
  margin-bottom: 12px;

  .MuiChip-deleteIcon {
    color: #bcc6d6;
  }

  @media (max-width: 600px) {
    //margin: initial;
  }
`;

export const Chip = (props: ChipModel) => {
  return <MUIChip css={chip} {...props} />;
};
