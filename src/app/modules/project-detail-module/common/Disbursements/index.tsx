import { formatLocale } from "app/utils/formatLocale";
import React from "react";
import { css } from "styled-components/macro";

interface TotalDisbursementsProps {
  totalDisbursements: number;
  totalCommitments: number;
}

const style = {
  barContainer: css`
    display: flex;
    width: 100%;
    height: 12px;
    position: relative;
    background-color: #dde3eb;
    border-radius: 10px;
    border-color: rgba(52, 50, 73, 0.5);
    border-width: 0.5px;
    margin-bottom: 15px;
    border-style: solid;
    margin-top: 50px;
  `,
  barFill: css`
    display: flex;
    width: ${percentage(7000, 10000)}%;
    height: 8px;
    background-color: #2e4982;
    border-radius: 10px;
    justify-content: flex-end;
  `,
  barIndicator: css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: #2e4982;
    border-radius: 50%;
    transform: translateX(20px) translateY(-45px);
  `,
  indicatorText: css`
    color: white;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.5px;
  `,
  textContainer: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    text-align: center;
  `,
  divider: css`
    width: 1px;
    height: 30px;
    background-color: #2e4982;
    margin-left: 15px;
    margin-right: 15px;
    transform: rotate(15deg);
  `,
};

function percentage(num: number, nam: number) {
  if (num > nam) return 100;
  if (nam === 0) return 0;
  return (num / nam) * 100;
}

export const TotalDisbursements = (props: TotalDisbursementsProps) => {
  const totalProgress = percentage(
    props.totalDisbursements,
    props.totalCommitments
  );

  return (
    <React.Fragment>
      {/* bar container */}
      <div css={style.barContainer}>
        {/* bar fill */}
        <div
          css={`
            margin: 1px;
            height: 8px;
            display: flex;
            border-radius: 10px;
            justify-content: flex-end;
            background-color: ${totalProgress > 0 ? "#2e4982" : ""};
            width: ${totalProgress > 0 ? `${totalProgress}%` : "40px"};
          `}
        >
          {/* bar indicator */}
          <div css={style.barIndicator}>
            {/* indicator text */}
            <span css={style.indicatorText}>{totalProgress.toFixed(0)}%</span>
            {/* <div
              css={`
                width: 20px;
                height: 20px;
                background-color: red;

                transform: rotate(45deg) translateX(20px) translateY(-45px);
              `}
            /> */}
          </div>
        </div>
      </div>

      {/* text container */}
      <div css={style.textContainer}>
        <div>
          <div>Total Disbursements</div>
          <div
            css={`
              font-weight: bold;
            `}
          >
            {formatLocale(props.totalDisbursements)}
          </div>
        </div>

        {/* divider */}
        <div css={style.divider} />

        <div>
          <div>Total Commitments</div>
          <div
            css={`
              font-weight: bold;
            `}
          >
            {formatLocale(props.totalCommitments)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};