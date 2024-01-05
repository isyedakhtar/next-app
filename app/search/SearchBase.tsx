"use client";
import {
  PageController,
  SEOWidget,
  WidgetsProvider,
} from "@sitecore-search/react";
import React from "react";
import SearchResultsStyledWidget from "./SearchResultsComponent";
import PreviewSearchStyledWidget from "./PreviewSearch";

interface Props {
  query: string;
}

const SearchBase = ({ query }: Props) => {
  // PageController.getContext().setLocaleLanguage("en");
  // PageController.getContext().setLocaleCountry("gb");
  const params = {
    params: { defaultItemsPerPage: 10 },
    searchParams: { q: query },
  };
  return (
    <>
      <WidgetsProvider
        env="prod"
        customerKey="85289628-120111945"
        apiKey="01-8b9a10ed-61e391e67cfa758930c7efdf480afe5752fc7f18"
        publicSuffix={true}
      >
        <div className="pb-5">
          <PreviewSearchStyledWidget
            rfkId="rfkid_6"
            params={params.params}
            searchParams={params.searchParams}
          />
        </div>
        <div>
          <SearchResultsStyledWidget
            key={`${query}-search`}
            rfkId="rfkid_7"
            defaultKeyphrase={query}
          />
        </div>
      </WidgetsProvider>
    </>
  );
};

export default SearchBase;
