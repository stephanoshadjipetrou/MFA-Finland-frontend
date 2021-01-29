import { css } from "styled-components/macro";
import { PrimaryColor, SecondaryColor } from "../../../theme";
import { Typography } from "@material-ui/core";
import { PillButton } from "../../Buttons/PillButton";
import { ArrowForwardIos } from "@material-ui/icons";
import React from "react";

export interface FilterCategoryOptionProps {
  path: string;
  heading: string;
  label: string;
  selection: string[];
}

const createStyles = (props: FilterCategoryOptionProps) => {
  return {
    container: css`
      margin-bottom: 32px;
    `,
    buttonHeading: css`
      margin-bottom: 12px;
      color: white;
    `,
    button: css`
      text-transform: unset;
      padding: 13px 16px;
      height: 48px;
      border-radius: 33px;
      background-color: ${props.selection.length === 0
        ? PrimaryColor[3]
        : SecondaryColor[1]};
      justify-content: start;
      color: ${props.selection.length === 0 ? "#fff" : PrimaryColor[0]};

      font-family: Finlandica;
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;

      :hover {
        background: ${SecondaryColor[0]};
        color: ${PrimaryColor[0]};
      }

      .MuiButton-label {
        justify-content: space-between;
      }
    `,
  };
};

export const FilterCategoryOption = (props: FilterCategoryOptionProps) => {
  const styles = createStyles(props);

  function setLabel() {
    if (props.selection.length === 0) {
      return props.label;
    } else {
      let formattedLabel = "";

      for (let i = 0; i < props.selection.length; i++) {
        const addComma = () => {
          return i != props.selection.length - 1 ? ", " : "";
        };
        formattedLabel += props.selection[i];
        formattedLabel += addComma();
      }

      return formattedLabel;
    }
  }

  return (
    <div css={styles.container}>
      <Typography variant="h6" css={styles.buttonHeading}>
        {props.heading}
      </Typography>
      <PillButton
        css={styles.button}
        fullWidth
        endIcon={<ArrowForwardIos style={{ fontSize: 24 }} />}
      >
        {setLabel()}
      </PillButton>
    </div>
  );
};