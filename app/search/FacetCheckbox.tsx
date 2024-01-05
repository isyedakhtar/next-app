import type { SearchResponseFacetItem } from "@sitecore-search/react";
import { useState } from "react";
import Checkbox from "../components/Checkbox";

interface Props {
  facet: SearchResponseFacetItem;
  changeHandler: any;
}
export const FacetCheckbox = ({ facet, changeHandler }: Props) => {
  const facetClickHandler = () => {
    changeHandler(facet);
  };

  const checkboxProps: CheckboxProps = {
    params: {
      id: facet.id,
      changeHandler: facetClickHandler,
      label: facet.text,
      isChecked: false,
    },
  };

  return (
    <Checkbox params={checkboxProps.params} />
    // <div key={facet.id} className="form-control">
    //   <label className="label cursor-pointer">
    //     <span className="label-text">{facet.text}</span>
    //     <input
    //       id={facet.id}
    //       type="checkbox"
    //       onChange={() => changeHandler(facet)}
    //       className="checkbox checkbox-xs"
    //     />
    //   </label>
    // </div>
  );
};
export default FacetCheckbox;
