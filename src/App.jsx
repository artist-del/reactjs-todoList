import { useState } from "react";
import { useEffect } from "react";
import UserInputComponent from "./component/UserInputComponent";
import ListItemComponent from "./component/ListItemComponent";

let _itemId = 0;
function App() {

  // Retrieve itemId from localStorage or initialize it to 0 if not available
  useEffect(() => {
    const savedItemId = localStorage.getItem("_itemId");
    if (savedItemId) {
      _itemId = parseInt(savedItemId, 10);
    } else {
      localStorage.setItem("_itemId", _itemId.toString());
    }
  }, []);


  const [listItems, setListItems] = useState(() => {
    // Retrieve listItems from localStorage on initial render
    const savedListItems = localStorage.getItem("listItems");
    return savedListItems ? JSON.parse(savedListItems) : [];
  });

  useEffect(() => {
    // Save listItems to localStorage whenever the listItems state changes
    localStorage.setItem("listItems", JSON.stringify(listItems));
  }, [listItems]);

  const [onValue, setOnValue] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleSaveItem = (data, id) => {

      setListItems([...listItems, { id: _itemId++, name: data }]);
  };

  const handleUpdateItem = (index, updatedName) => {
    setListItems((prevListItems) =>
      prevListItems.map((item) =>
        item.id === index ? { ...item, name: updatedName } : item
      )
    );
  };

  const handleRemove = (id) => {
    const newItems = listItems.filter((data) => data.id !== id);
    setListItems(newItems);
  };

  const handleUpdate = (_id, _item, _isChecked) => {
    setOnValue(_item);
    setUpdateId(_id);
    setIsUpdate(_isChecked);
  };

  // Save the value of _itemId to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("_itemId", _itemId.toString());
  }, [_itemId]);
 

  return (
    <>
      <div className="container">
        <h1 className="d-flex justify-content-center">TodoList</h1>
        <br />
        <br />
        <UserInputComponent
          onSaveItem={handleSaveItem}
          initialValue={onValue}
          initialId={updateId}
          initialIsUpdate = {isUpdate}
          onSaveUpdateItem={handleUpdateItem}
        />

        <br />
        <br />

        <ListItemComponent
          item={listItems}
          getId={handleRemove}
          itemUpdate={handleUpdate}
        />
      </div>
    </>
  );
}

export default App;
