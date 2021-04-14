import React from "react";
import { Treemap } from "app/components/Charts/treemap";
import { TreemapProps } from "app/components/Charts/treemap/data";
import { LocationsFragmentTable } from "app/components/Charts/table/modules/locations";
import {
  SectorsDataTableOptions,
  OrganisationTypesDataTableColumns,
} from "app/components/Charts/table/data";
import { useCMSData } from "app/hooks/useCMSData";
import { useRouteMatch } from "react-router-dom";
import { MoreButton } from "app/components/Charts/bar/data";
import { getTranslatedCols } from "../../table/utils/getTranslatedCols";

interface OrganisationsModuleModel extends TreemapProps {
  activeTab: string;
  scrollableHeight: number;
  getActiveTabData: () => any;
}

export function OrganisationsModule(props: OrganisationsModuleModel) {
  const cmsData = useCMSData({ returnData: true });
  const { params } = useRouteMatch();

  if (props.activeTab === "chart") {
    return (
      <Treemap
        data={props.data}
        label="organisations"
        selectedVizItemId={props.selectedVizItemId}
        setSelectedVizItem={props.setSelectedVizItem}
      />
    );
  }
  return (
    <div
      css={`
        overflow-y: overlay;
        padding: 24px 24px 24px 0;
        max-height: ${props.scrollableHeight}px;

        @media (max-width: 600px) {
          max-height: 100%;
        }
      `}
    >
      <LocationsFragmentTable
        type="org"
        data={props.data.children}
        options={{
          ...SectorsDataTableOptions,
          customToolbar: () => (
            <MoreButton data={props.getActiveTabData()} params={params} />
          ),
        }}
        title={`${props.data.children.length} organisation types`}
        columns={getTranslatedCols(OrganisationTypesDataTableColumns, cmsData)}
      />
    </div>
  );
}
