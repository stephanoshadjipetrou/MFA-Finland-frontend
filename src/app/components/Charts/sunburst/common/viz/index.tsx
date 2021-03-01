import React from "react";
import { Sunburst, SunburstPoint } from "react-vis";
import { getTotal } from "app/components/Charts/sunburst/common/tooltip/utils";
import {
  SunburstTooltip,
  SunburstTooltipContent,
} from "app/components/Charts/sunburst/common/tooltip";
import { SmTooltipContainer } from "app/components/Charts/common/smTooltipContainer";

export function SunburstViz(props: any) {
  const [hoveredNode, setHoveredNode] = React.useState<SunburstPoint | null>(
    null
  );
  const showSmTooltip = "ontouchstart" in document.documentElement;

  return (
    <React.Fragment>
      <Sunburst
        hideRootNode
        colorType="literal"
        data={props.data}
        width={props.size}
        height={props.size}
        animation={{ damping: 20, stiffness: 300 }}
        style={{ stroke: "#ffffff", strokeWidth: 5 }}
        onValueClick={(
          node: SunburstPoint,
          event: React.MouseEvent<HTMLElement>
        ) => {
          if (node._children) {
            props.setSelected(node);
            props.setSelectedCount(node.size);
          } else {
            props.onSectorSelectChange(node.code);
          }
        }}
        onValueMouseOver={(
          node: SunburstPoint,
          event: React.MouseEvent<HTMLElement>
        ) => {
          setHoveredNode(node);
        }}
        onValueMouseOut={() => {
          if (!("ontouchstart" in document.documentElement)) {
            setHoveredNode(null);
          }
        }}
      >
        {!showSmTooltip && <SunburstTooltip hoveredNode={hoveredNode} />}
      </Sunburst>
      {hoveredNode && showSmTooltip && (
        <SmTooltipContainer
          showDrilldownBtn
          close={() => setHoveredNode(null)}
          drilldown={() => {
            props.setSelected(hoveredNode);
            props.setSelectedCount(getTotal(hoveredNode));
            setHoveredNode(null);
          }}
        >
          <SunburstTooltipContent hoveredNode={hoveredNode} />
        </SmTooltipContainer>
      )}
    </React.Fragment>
  );
}
