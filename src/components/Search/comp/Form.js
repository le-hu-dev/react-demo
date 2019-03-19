import React, { useState } from "react";

const useInputValue = ([value, setValue]) => {
  // const [value, setValue] = useState(initialValue);
// console.log(value+initialValue)
  return {
    value,
    onChange: e => setValue(e.target.value),
    resetValue: () => setValue("")
  };
};

export default ({ onSubmit, children, value, ref }) => {
  const { resetValue, ...text } = useInputValue(value);
  if(ref)ref.text=text.value
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(text.value);
        // resetValue();
      }}
    >
      <input {...text} />{children}
    </form>
  );
};
