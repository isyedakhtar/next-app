import type {
  PreviewSearchInitialState,
  PreviewSearchWidgetQuery,
  SearchResponseSuggestion,
} from "@sitecore-search/react";
import {
  WidgetDataType,
  usePreviewSearch,
  widget,
} from "@sitecore-search/react";
import Link from "next/link";
import { useCallback, useState } from "react";
type ArticleModel = {
  id: string;
  name: string;
  image_url: string;
  url: string;
  source_id?: string;
};
previewArticles: Array<ArticleModel>;
type InitialState = PreviewSearchInitialState<
  "itemsPerPage" | "suggestionsList"
>;

interface Props {
  params: { defaultItemsPerPage: number };
  searchParams: { q: string };
}

export const PreviewSearchComponent = ({
  params: { defaultItemsPerPage },
  searchParams: { q },
}: Props) => {
  const [isMouseOverResults, setIsMouseOverResults] = useState(false);
  const [queryInput, setQueryInput] = useState(q);

  const {
    widgetRef,
    actions: { onItemClick, onKeyphraseChange },
    queryResult: {
      isFetching,
      isLoading,
      data: { content: previewArticles = [] } = {},
    },
  } = usePreviewSearch<ArticleModel, InitialState>({
    query: (query: PreviewSearchWidgetQuery) => query,
    state: {
      itemsPerPage: defaultItemsPerPage,
    },
  });
  const loading = isLoading || isFetching;
  const keyphraseHandler = useCallback(
    (event: any) => {
      const target = event.target;
      setQueryInput(target.value);
      onKeyphraseChange({
        keyphrase: target.value,
      });
    },
    [onKeyphraseChange]
  );

  return (
    <div
      ref={widgetRef}
      onMouseLeave={() => setIsMouseOverResults(false)}
      onMouseEnter={() => setIsMouseOverResults(true)}
    >
      <div className="inline-flex flex-col justify-center relative text-gray-500">
        <div className="relative">
          <input
            type="text"
            value={queryInput}
            className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
            placeholder="search..."
            onChange={keyphraseHandler}
          />
          <svg
            className="w-4 h-4 absolute left-2.5 top-3.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {!loading && isMouseOverResults && (
          <ul className="bg-white border border-gray-100 w-full mt-2 ">
            {previewArticles.map((article, index) => (
              <li
                key={article.id}
                className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
              >
                <a
                  href={article.url}
                  onClick={(e) => {
                    e.preventDefault();
                    onItemClick({
                      id: article.id,
                      index,
                      sourceId: article.source_id,
                    });
                  }}
                >
                  {article.name}
                </a>
              </li>
            ))}
            <li>
              <Link href={"/search?q=" + queryInput}>View All Results</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
const PreviewSearchLeftStyledWidget = widget(
  PreviewSearchComponent,
  WidgetDataType.PREVIEW_SEARCH,
  "content"
);
export default PreviewSearchLeftStyledWidget;
