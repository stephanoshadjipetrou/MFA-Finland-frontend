import React from "react";
import get from "lodash/get";
import max from "lodash/max";
import find from "lodash/find";
import { PrimaryColor } from "app/theme";
import { useWindowSize } from "react-use";
import { useCMSData } from "app/hooks/useCMSData";
import { Line } from "app/components/Charts/bar/common/line";
import { BarChartProps } from "app/components/Charts/bar/data";
import { BarNode } from "app/components/Charts/bar/common/node";
import { ResponsiveBar, BarItemProps, BarExtendedDatum } from "@nivo/bar";
import {
  getRange,
  getMoneyValueWithMetricPrefix,
} from "app/components/Charts/bar/utils";
import { Hidden } from "@material-ui/core";

export function BarChart(props: BarChartProps) {
  const { width } = useWindowSize();
  const cmsData = useCMSData({ returnData: true });
  const range = getRange(props.data, ["exclusive", "other"]);
  const maxValue: number =
    max(props.data.map((item: any) => item.exclusive + item.other)) || 0;
  const [hoveredXIndex, setHoveredXIndex] = React.useState<number | null>(null);
  const [selected, setSelected] = React.useState<BarExtendedDatum | null>(
    !props.height && props.data.length > 0
      ? {
          id: "",
          value: 0,
          index: 0,
          indexValue: props.data[props.data.length - 1].year,
          data: props.data[props.data.length - 1],
        }
      : null
  );

  const onSelect = (b: BarExtendedDatum | null) => {
    setSelected(b);
    props.setSelectedVizItem(get(b, "indexValue", ""));
  };

  const Bars = (bprops: any) => {
    if (props.vizCompData.length !== bprops.bars.length) {
      props.setVizCompData(bprops.bars);
    }
    return bprops.bars.map((bar: BarItemProps) => (
      <BarNode
        {...bar}
        selected={selected}
        setSelected={onSelect}
        onZoomOut={props.onZoomOut}
        hoveredXIndex={hoveredXIndex}
        onNodeClick={props.onSelectChange}
        setHoveredXIndex={setHoveredXIndex}
      />
    ));
  };

  const showGni = find(props.data, (d: any) => d.gni > 0);

  React.useEffect(
    () =>
      props.setSelectedVizItem(
        get(props, "data[props.data.length - 1].year", null)
      ),
    []
  );

  React.useEffect(() => {
    if (props.selectedVizItemId) {
      const fItem = find(props.data, {
        year: parseInt(props.selectedVizItemId.toString(), 10),
      });
      if (fItem) {
        setSelected({
          id: "",
          value: 0,
          index: 0,
          indexValue: fItem.year,
          data: fItem,
        });
      }
    }
  }, [props.selectedVizItemId]);

  return (
    <div
      id="viz-scroller"
      css={`
        width: 100%;
        position: relative;
        color: ${PrimaryColor[0]};

        @media (max-width: 600px) {
          overflow-x: auto;
          overflow-y: hidden;

          margin-top: 8px;
          &::-webkit-scrollbar {
            height: 4px;
            border-radius: 4px;
            background: ${PrimaryColor[2]};
          }

          &::-webkit-scrollbar-track {
            border-radius: 4px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background: ${PrimaryColor[0]};
          }

          ::-webkit-scrollbar-button {
            width: 0;
            height: 0;
            display: none;
          }

          ::-webkit-scrollbar-corner {
            background-color: transparent;
          }
        }
      `}
    >
      <div
        css={`
          display: flex;
          flex-direction: row;
          width: calc(100% - 25px);
          justify-content: space-between;
        `}
      >
        <div>{range.abbr}</div>
        <Legend {...props} {...cmsData} />
        {showGni && <div>%</div>}
      </div>
      <Hidden smDown>
        <div css="width: 100%;height: 15px;" />
      </Hidden>
      {showGni && (
        <div
          css={`
            left: 0;
            top: 30px;
            position: absolute;
            padding-left: 17px;
            width: calc(100% - 17px);
            height: ${props.height || 450}px;

            @media (max-width: 600px) {
              width: 1000px;
            }

            circle {
              r: 6px;
            }
          `}
        >
          <Line
            data={[
              {
                id: "gni",
                data: props.data.map((d: any) => ({
                  x: d.year,
                  y: d.gni,
                })),
              },
            ]}
            selected={selected}
            hovered={hoveredXIndex}
          />
        </div>
      )}
      <div
        css={`
          width: 100%;
          height: ${props.height || 450}px;

          @media (max-width: 600px) {
            width: 1000px;
          }
        `}
      >
        <ResponsiveBar
          padding={0.3}
          indexBy="year"
          data={props.data}
          enableLabel={false}
          enableGridY={false}
          innerPadding={0}
          keys={["exclusive", "other"]}
          valueScale={{ type: "linear" }}
          layers={["grid", "axes", Bars]}
          colors={["#ACD1D1", "#233C71"]}
          maxValue={maxValue + maxValue * 0.1}
          margin={{ top: 15, right: 60, bottom: 60, left: 50 }}
          borderWidth={1}
          borderColor="black"
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: 14,
                  fill: PrimaryColor[0],
                  fontFamily: "Finlandica",
                },
              },
              domain: {
                line: {
                  strokeWidth: 1,
                  stroke: "rgba(224, 224, 224, 0.4)",
                },
              },
            },
            grid: {
              line: {
                strokeWidth: 1,
                stroke: "rgba(224, 224, 224, 0.4)",
              },
            },
          }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: width > 800 ? 45 : 75,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 5,
            tickPadding: 15,
            tickRotation: 0,
            format: (v: any) => getMoneyValueWithMetricPrefix(v, range.index),
          }}
        />
      </div>
    </div>
  );
}

const Legend = (props: any, cmsData: any) => {
  return (
    <div
      css={`
        display: flex;

        > div {
          padding: 0 10px 0 15px;
          &:before {
            left: 0;
            top: 2px;
            position: absolute;
            width: 8px;
            height: 8px;
            content: "";
            border-radius: 50%;
          }
        }

        @media (max-width: 600px) {
          //padding-top: 25px;
        }
      `}
    >
      <div
        css={`
          position: relative;
          &:before {
            border: 0.5px solid #343249;
            background: #acd1d1;
          }
        `}
      >
        {get(cmsData, "viz.exclusiveoda", "Exclusive ODA")}
      </div>
      <div
        css={`
          position: relative;
          &:before {
            border: 0.5px solid #343249;
            background: #233c71;
          }
        `}
      >
        {get(cmsData, "viz.otheroda", "Other ODA")}
      </div>
      {!props.hideODAGNI && (
        <div
          css={`
            position: relative;
            &:before {
              border: 0.5px solid #343249;
              background: #d495a7;
            }
          `}
        >
          ODA/GNI
        </div>
      )}
    </div>
  );
};
