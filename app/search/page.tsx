"use client";
import React from "react";
import PreviewSearch from "./PreviewSearch";
import { WidgetsProvider } from "@sitecore-search/react";
import SearchResultsStyledWidget from "./SearchResultsComponent";
import PreviewSearchStyledWidget from "./PreviewSearch";
import SearchBase from "./SearchBase";

interface Props {
  searchParams: { q: string };
}

const MainSearch = (props: Props) => {
  return (
    <>
      <SearchBase query={props.searchParams.q} />
    </>
  );
};

export default MainSearch;
