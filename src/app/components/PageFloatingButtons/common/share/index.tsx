import React from "react";
import { css } from "styled-components/macro";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";

const containercss = css`
  padding: 8px;
  display: flex;
  color: #2e4982;
  font-size: 14px;
  background: #fff;
  flex-direction: column;
`;

const iconscontainercss = css`
  gap: 12px;
  display: flex;
  margin-top: 12px;
  flex-direction: row;
`;

export function ShareTooltip() {
  const url = window.location.href;
  //   const url = "https://data.mfa.fi";
  const title = "MFA IATI data portal";
  return (
    <div css={containercss}>
      <div>Share the link via</div>
      <div css={iconscontainercss}>
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={38} round />
        </FacebookShareButton>

        <LinkedinShareButton url={url} title={title}>
          <LinkedinIcon size={38} round />
        </LinkedinShareButton>

        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={38} round />
        </TwitterShareButton>
      </div>
    </div>
  );
}