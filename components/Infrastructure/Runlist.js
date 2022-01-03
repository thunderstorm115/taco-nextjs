import React, { useState } from "react";

export default function RunList({ item }) {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <div
      onClick={() => {
        setShowChildren(!showChildren);
      }}
    >
    </div>
  );
}

function Child({item}){
    return  <div className="RunListChildren">
    {item.children.map((child) => {
      return (
        <div>
          <h3>{child.name}</h3>
          <h4>{child.type}</h4>
          <h4>{child.version}</h4>
           {child.children&&<Child item={child}></Child>}
          <hr></hr>
        </div>
      );
    })}
  </div>
}