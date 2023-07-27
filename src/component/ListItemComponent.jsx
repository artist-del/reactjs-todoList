import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ListItemComponent = ({ item, getId, itemUpdate }) => {
  useEffect(() => {}, [item]);

  const handleRemove = (_itemId) => {
    getId(_itemId);
  };

  const handleUpdate = (id, name, isCheck) => {
    itemUpdate(id, name, isCheck);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <ul className="list-group w-25">
          {item.map((data) => (
            <li
              key={data.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {data.name}
              <div className="badge">
                <button
                  className="bg-danger btn btn-sm"
                  onClick={() => handleRemove(data.id)}
                  style={{marginRight: "5px"}}
                >
                  Delete
                </button>
                <button
                  className="bg-success btn btn-sm"
                  onClick={() => {
                    handleUpdate(data.id, data.name, true);
                  }}
                >
                  update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ListItemComponent;
