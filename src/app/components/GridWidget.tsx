/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FunctionComponent } from "react";
import get from "lodash/get";
import { PrimaryColor, ProjectPalette } from "app/theme";
import { Tooltip } from "@material-ui/core";
import { css } from "styled-components/macro";
import { useCMSData } from "app/hooks/useCMSData";
import { useHistory, Link } from "react-router-dom";
import { useStoreState } from "app/state/store/hooks";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { formatMoneyWithPrefix } from "app/utils/formatMoneyWithPrefix";
import { formatLocale, formatLocaleN } from "app/utils/formatLocale";

const style = {
  widgetHeader: (odaWidget: boolean) => css`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    ${odaWidget
      ? `
      @media (max-width: 992px) {
        display: block;
      }
    `
      : ""}
  `,
  odaHeaderStats: css`
    display: flex;
    flex-direction: row;
    width: calc(100% - 350px);
    justify-content: space-between;
    @media (max-width: 992px) {
      width: 100%;
      margin: 10px 0;
    }
  `,
  headerStat: css`
    display: flex;
    flex-direction: column;

    > div {
      margin-bottom: 6px;

      &:nth-child(1) {
        font-size: 14px;
      }
      &:nth-child(2) {
        font-size: 24px;
        font-weight: bold;
      }
      &:nth-child(3) {
        > a {
          font-size: 10px;
          text-decoration: underline;

          :hover {
            color: ${PrimaryColor[3]};
          }
        }
      }
    }
  `,
  widgetLabel: (linkable?: boolean) => css`
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    color: ${ProjectPalette.primary.main};
    line-height: 1;
    cursor: ${linkable ? "pointer" : ""};
    text-decoration: ${linkable ? "underline" : "none"};

    &:focus {
      text-decoration: underline;
    }
  `,
  widgetContainer: (
    height: string | undefined,
    isHovered: boolean,
    label: string | undefined
  ) => css`
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 32px;
    flex-direction: column;
    background-color: #ffffff;
    padding: 24px 32px 32px 32px;
    height: ${height || "100%"};
    // height: ${height || "375px"};
    min-height: 375px;
    //overflow: hidden;
    box-shadow: ${isHovered
      ? "0 3px 6px rgba(46, 73, 130, 0.16), 0 3px 6px rgba(46, 73, 130, 0.23);"
      : ""};
    transition: box-shadow 0.3s ease-in-out;

    @media (max-width: 960px) {
      border-radius: 16px;
      padding: 16px 16px 16px 16px;
      width: initial;
      height: 100%;
    }
  `,
  widgeTooltip: css`
    margin-left: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  widgetTooltipIcon: css`
    fill: ${PrimaryColor[0]};
    :hover {
      fill: ${PrimaryColor[3]};
    }
  `,
  link: css`
    font-size: 10px;
    line-height: 12px;
    color: ${PrimaryColor[0]};
  `,
  childrencontainer: (
    itemLinkable?: boolean,
    childrencontainerStyle?: {
      paddingTop?: number;
      width?: number;
      height?: number;
      scale?: number;
      placeContent?: string;
    }
  ) => css`
    display: flex;
    flex-direction: column;
    cursor: ${itemLinkable ? "pointer" : "default"};
    padding-top: ${childrencontainerStyle?.paddingTop
      ? `${childrencontainerStyle.paddingTop}px`
      : "initial"};
    width: ${childrencontainerStyle?.width
      ? `${childrencontainerStyle.width}%`
      : "initial"};
    height: ${childrencontainerStyle?.height
      ? `${childrencontainerStyle.height}%`
      : "initial"};
    transform: ${childrencontainerStyle?.scale
      ? `scale(${childrencontainerStyle.scale})`
      : "initial"};
    place-content: ${childrencontainerStyle?.placeContent
      ? childrencontainerStyle.placeContent
      : "ïnitial"};
    * {
      pointer-events: ${itemLinkable ? "none" : "all"};
    }
    #viz-scroller {
      pointer-events: auto;
    }
  `,
};

interface GridWidgetProps {
  label?: string;
  link?: string;
  height?: string;
  tooltip?: string;
  interactive?: boolean;
  // childrencontainerStyle?: React.CSSProperties;
  childrencontainerStyle?: {
    paddingTop?: number;
    width?: number;
    height?: number;
    scale?: number;
    placeContent?: string;
  };
  disbursementsStatComponent?: FunctionComponent;
  // responsiveOrder?: number;
  detailPageFilter?: {
    key: string;
    value: string | string[];
  };
}

export const GridWidget: FunctionComponent<GridWidgetProps> = (props) => {
  const history = useHistory();
  const cmsData = useCMSData({ returnData: true });
  const [isHovered, setIsHovered] = React.useState(false);
  const odaWidget = props.label === "Overview Disbursements";
  const totalDisbursement = useStoreState((state) =>
    get(state.geoMap, "data.totalDisbursement", 0)
  );
  const orgCount = useStoreState((state) => {
    let count = 0;
    const orgData = get(state.organisationsTreemap, "data.vizData", {
      name: "",
      color: "",
      children: [],
    });
    orgData.children.forEach((child: any) => {
      if (child.orgs) {
        count += child.orgs.length;
      }
    });
    return count;
  });
  const projCount = useStoreState((state) =>
    get(state.geoMap, "data.projectCount", 0)
  );

  let searchFilterString = `${
    props.detailPageFilter
      ? `${props.detailPageFilter.key}=${
          typeof props.detailPageFilter.value === "string"
            ? props.detailPageFilter.value
            : props.detailPageFilter.value.join(",")
        }`
      : ""
  }${history.location.search.replace("?", "")}`;
  if (searchFilterString !== "") {
    searchFilterString = `?${searchFilterString}`;
  }

  function handleClick() {
    if (props.link) {
      history.push(`${props.link}${searchFilterString}`);
    }
  }

  const itemLinkable =
    props.link === "/viz/oda" || props.link === "/viz/budget-lines";

  return (
    <div
      css={style.widgetContainer(
        props.height,
        isHovered && !props.interactive && props.link !== undefined,
        props.label
      )}
    >
      <header css={style.widgetHeader(odaWidget)}>
        <div css="display: flex;align-items: center;">
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleClick()}
            aria-label={`Go to ${props.label} detail page`}
            onKeyPress={(e) => {
              if (e.code === "Enter") {
                handleClick();
              }
            }}
            css={style.widgetLabel(props.link !== undefined)}
            onMouseEnter={() => !itemLinkable && setIsHovered(true)}
            onMouseLeave={() => !itemLinkable && setIsHovered(false)}
          >
            {!odaWidget
              ? props.label
              : get(cmsData, "general.overview", "Overview Disbursements")}
          </div>
          {props.tooltip && !odaWidget && (
            <div css={style.widgeTooltip}>
              <Tooltip title={props.tooltip} interactive tabIndex={0}>
                <InfoOutlinedIcon css={style.widgetTooltipIcon} />
              </Tooltip>
            </div>
          )}
        </div>
        {odaWidget && (
          <div css={style.odaHeaderStats}>
            <div css={style.headerStat}>
              <div>
                {get(
                  cmsData,
                  "viz.disbursementsamount",
                  "Disbursements amount"
                )}
              </div>
              <div>{formatMoneyWithPrefix(totalDisbursement)}</div>
            </div>
            <div css={style.headerStat}>
              <div>
                {get(cmsData, "general.organisations", "Organisations")}
              </div>
              <div>{orgCount}</div>
              <div>
                <Link
                  css={style.link}
                  to={`/viz/organisations${searchFilterString}`}
                >
                  {get(cmsData, "viz.viewmore", "View more")}
                </Link>
              </div>
            </div>
            <div css={style.headerStat}>
              <div>{get(cmsData, "viz.projects", "Projects")}</div>
              <div>{formatLocaleN(projCount)}</div>
              <div>
                <Link
                  css={style.link}
                  to={`/viz/projects${searchFilterString}`}
                >
                  {get(cmsData, "viz.viewmore", "View more")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      {odaWidget && (
        <div css="display: flex;align-items: center;">
          <div css={style.widgetLabel(false)}>ODA</div>
          {props.tooltip && (
            <div css={style.widgeTooltip}>
              <Tooltip title={props.tooltip}>
                <InfoOutlinedIcon css={style.widgetTooltipIcon} />
              </Tooltip>
            </div>
          )}
        </div>
      )}
      <div
        key={props.label}
        css={style.childrencontainer(
          itemLinkable,
          props.childrencontainerStyle
        )}
        onClick={() => itemLinkable && handleClick()}
        onMouseEnter={() => itemLinkable && setIsHovered(true)}
        onMouseLeave={() => itemLinkable && setIsHovered(false)}
      >
        {props.children}
      </div>
    </div>
  );
};
