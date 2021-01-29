import { css } from "styled-components/macro";

export const containercss = css`
  display: flex;
  color: #2e4982;
  font-size: 14px;
  font-weight: 900;
  user-select: none;
  text-align: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  span {
    color: #888;
    display: flex;
    cursor: pointer;
    font-family: auto;

    svg {
      path {
        fill: #fff;
      }
    }

    &:first-of-type {
      svg {
        transform: rotate(180deg);
      }
    }
  }
`;

export const disablearrowcss = css`
  opacity: 0.5;
  pointer-events: none;
`;