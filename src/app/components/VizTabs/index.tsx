import React from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import { RouteTab } from "app/components/VizTabs/common/Tab";
import { vizTabs, TabProps } from "app/components/VizTabs/data";
import { Breadcrumbs } from "app/components/Breadcrumb";
import { BreadcrumbLinkModel } from "app/components/Breadcrumb/data";
import { Path } from "app/const/Path";
import { css } from "styled-components/macro";
import { Tooltip } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { PrimaryColor } from "app/theme";

export function VizTabs() {
  const crumbs: BreadcrumbLinkModel[] = [
    { label: "Homepage", path: Path.home },
    { label: "Disbursements" },
  ];
  const styles = {
    tooltip: css`
      fill: ${PrimaryColor[0]};
      :hover {
        fill: ${PrimaryColor[3]};
      }
    `,
    titleContainer: css`
      display: flex;
      margin-bottom: 16px;
      margin-top: 3px;
    `,
    title: css`
      margin-right: 12px;
    `,
  };
  return (
    <Grid
      container
      css={`
        // padding: 0 50px;
        @media (max-width: 992px) {
          padding: 0 12px;
        }
      `}
    >
      <div
        css={`
          left: 0;
          top: 124px;
          width: 100vw;
          position: absolute;
          background: #dde4ef;
          height: 87px;
        `}
      />
      <Grid
        item
        sm={12}
        md={12}
        lg={4}
        xl={4}
        css={`
          z-index: 1;
        `}
      >
        {/* <Hidden smDown> */}
        {/*  <div css="width: 100%;height: 35px;" /> */}
        {/* </Hidden> */}
        <div css="width: 100%; height: 8px;" />
        <Breadcrumbs route={crumbs} />
        <div css={styles.titleContainer}>
          <Typography variant="h5" css={styles.title}>
            Disbursements
          </Typography>
          <Tooltip title="lorem ipsum">
            <InfoOutlinedIcon css={styles.tooltip} />
          </Tooltip>
        </div>
        {/* <Hidden mdUp> */}
        {/*  <div css="width: 100%;height: 35px;" /> */}
        {/* </Hidden> */}
      </Grid>
      <Grid
        item
        sm={12}
        md={12}
        lg={8}
        xl={8}
        css={`
          position: relative;
        `}
      >
        <div
          css={`
            right: 0;
            bottom: 11px;
            position: absolute;

            > a {
              border-right: 1px solid #dde4ef;
            }

            > a:first-of-type {
              border-radius: 15px 0px 0px 0px;
            }

            > a:last-of-type {
              border-right-style: none;
              border-radius: 0px 15px 0px 0px;
            }
          `}
        >
          {vizTabs.map((tab: TabProps) => (
            <RouteTab key={tab.name} name={tab.name} url={tab.url} />
          ))}
        </div>
      </Grid>
    </Grid>
  );
}
