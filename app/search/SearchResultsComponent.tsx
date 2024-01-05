import type {
  SearchResponse,
  SearchResponseFacetItem,
  SearchResponseFacet,
  SearchResultsInitialState,
  SearchResultsStoreState,
  SearchResultsWidgetQuery,
} from "@sitecore-search/react";
import {
  WidgetDataType,
  useSearchResults,
  useSearchResultsSelectedFacets,
  widget,
} from "@sitecore-search/react";
import Image from "next/image";
import config from "../../tailwind.config";
import { FacetCheckbox } from "./FacetCheckbox";

type ArticleModel = {
  id: string;
  type?: string;
  title?: string;
  name?: string;
  subtitle?: string;
  url?: string;
  description?: string;
  content_text?: string;
  image_url?: string;
  source_id?: string;
};

type ArticleSearchResultsProps = {
  defaultSortType?: SearchResultsStoreState["sortType"];
  defaultPage?: SearchResultsStoreState["page"];
  defaultItemsPerPage?: SearchResultsStoreState["itemsPerPage"];
  defaultKeyphrase?: SearchResultsStoreState["keyphrase"];
};

type InitialState = SearchResultsInitialState<
  "itemsPerPage" | "keyphrase" | "page" | "sortType"
>;

export const SearchResultsComponent = ({
  defaultSortType = "featured_asc",
  defaultPage = 1,
  defaultKeyphrase = "",
  defaultItemsPerPage = 24,
}: ArticleSearchResultsProps) => {
  const {
    widgetRef,
    actions: {
      onResultsPerPageChange,
      onPageNumberChange,
      onItemClick,
      onFilterClick,
      onSortChange,
      onFacetClick,
      onClearFilters,
    },
    state: { sortType, page, itemsPerPage },
    queryResult: {
      isLoading,
      isFetching,
      data: {
        total_item: totalItems = 0,
        sort: { choices: sortChoices = [] } = {},
        facet: facets = [],
        content: articles = [],
      } = {},
    },
  } = useSearchResults<ArticleModel, InitialState>({
    query: (query: SearchResultsWidgetQuery) => query,
    state: {
      sortType: defaultSortType,
      page: defaultPage,
      itemsPerPage: defaultItemsPerPage,
      keyphrase: defaultKeyphrase,
    },
  });
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const selectedSortIndex = sortChoices.findIndex(
    (s: any) => s.name === sortType
  );
  const selectedFacetsFromApi = useSearchResultsSelectedFacets();
  if (isLoading) {
    return <div>{totalPages}</div>;
  }

  const onFacetSelection = (facet: SearchResponseFacetItem) => {
    onFacetClick({
      facetId: facet.id,
      type: "range",
      facetIndex: 1,
    });
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-1/4 lg:pr-4">
        {facets.map((f) => (
          <span key={f.name}>
            {f.label}
            <div>
              {f.value.map((v) => (
                <FacetCheckbox
                  key={v.id}
                  facet={v}
                  changeHandler={onFacetSelection}
                />
              ))}
            </div>
          </span>
        ))}
      </div>
      <div className="w-full lg:w-3/4 lg:pr-4">
        <div ref={widgetRef} className="columns-3 grid grid-cols-3 gap-3">
          {articles.map((s) => (
            <div key={s.id} className="card card-side bg-base-100 shadow-xl">
              <figure>
                <Image
                  src={s.image_url || ""}
                  alt="Shoes"
                  width="500"
                  height="300"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{s.name}</h2>
                <p>{s.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SearchResultsStyledWidget = widget(
  SearchResultsComponent,
  WidgetDataType.SEARCH_RESULTS,
  "content"
);

export default SearchResultsStyledWidget;
