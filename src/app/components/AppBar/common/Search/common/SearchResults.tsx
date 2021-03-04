/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import get from "lodash/get";
import { css } from "styled-components/macro";
import {
  ResultModel,
  NavResultsModel,
} from "app/components/AppBar/common/Search/data";
import { linearprogresscss } from "app/components/AppBar/common/Search/style";
import { TriangleIcon } from "app/assets/TriangleIcon";
import LinearProgress from "@material-ui/core/LinearProgress";
import { SearchResultItem } from "app/components/AppBar/common/Search/common/SearchResultItem";
import { SearchResultNavigation } from "app/components/AppBar/common/Search/common/SearchResultNavigation";

interface SearchResultsProps {
  width: number;
  loading: boolean;
  resultType: string;
  hasMoreOfType: boolean;
  handleResultClick: any;
  handleLoadMore: Function;
  results: NavResultsModel;
  changeResultType: Function;
}

const containercss = css`
  top: 40px;
  width: 600px;
  z-index: 300;
  display: flex;
  position: absolute;
  border-radius: 16px;
  background-color: #fff;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: 0 1px 14px rgba(0, 0, 0, 0.12);
`;

const resultscss = css`
  width: 100%;
  overflow-y: auto;
  max-height: 338px;

  &::-webkit-scrollbar {
    width: 6px;
    background: #ededf6;
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
    background: #ededf6;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #2e4063;
  }
`;

const loadmorecss = css`
  width: 100%;
  display: flex;
  padding: 20px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 16px 16px;

  &:hover {
    cursor: pointer;
    background-color: #ededf6;
  }
`;

export const SearchResults = (props: SearchResultsProps) => {
  const renderedResults = get(props.results, `[${props.resultType}].data`, []);
  return (
    <div css={containercss} data-cy="search-result">
      <SearchResultNavigation
        results={props.results}
        activeTab={props.resultType}
        onChange={props.changeResultType}
      />
      <div css={linearprogresscss(600, props.loading)}>
        <LinearProgress />
      </div>
      <div css={resultscss}>
        {renderedResults.map((resultItem: ResultModel, index: number) => (
          <SearchResultItem
            index={index}
            text={resultItem.name}
            link={resultItem.link}
            key={`search-result-item-${index}`}
            handleResultClick={props.handleResultClick}
          />
        ))}
      </div>
      {props.hasMoreOfType && renderedResults.length > 0 && (
        <div css={loadmorecss} onClick={() => props.handleLoadMore()}>
          <TriangleIcon />
        </div>
      )}
    </div>
  );
};