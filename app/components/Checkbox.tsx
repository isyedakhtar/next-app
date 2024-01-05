import React from "react";

export const Checkbox = ({ params }: CheckboxProps) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">{params.label}</span>
        <input
          id={params.id}
          type="checkbox"
          onChange={() => {
            params.changeHandler();
          }}
          className="checkbox checkbox-xs"
        />
      </label>
    </div>
  );
};

export default Checkbox;
