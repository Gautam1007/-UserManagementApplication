import React, { forwardRef, useId } from "react";

function Input({ label, type='text', className = "", ...props },ref) {
    const id = useId();
  return (
    <div>
      <div className="form-control">
        {label && (
          <label htmlFor={id} className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <input ref={ref} id={id} type={type} className={`input input-bordered ${className}`} {...props}  />
      </div>
    </div>
  );
}

export default forwardRef(Input);
