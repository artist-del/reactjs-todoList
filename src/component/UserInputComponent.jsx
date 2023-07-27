import { useEffect, useState } from "react";

const UserInputComponent = ({
  onSaveItem,
  initialValue,
  initialId,
  initialIsUpdate,
  onSaveUpdateItem,
}) => {
  const [userInput, setUserInput] = useState(initialValue);
  const [inputId, setInputId] = useState();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setUserInput(initialValue);
    setInputId(initialId);
    setIsUpdate(initialIsUpdate);
  }, [initialValue]);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleOnclickUserInput = () => {
    if (userInput.trim() !== "") {
      setUserInput("");
      onSaveItem(userInput);
    }
  };

  const handleUpdate=()=>{
    onSaveUpdateItem(inputId, userInput);
    setUserInput("");
    setIsUpdate(false);
  }

  return (
    <>
      <div className="d-flex justify-content-center">
       
        <input
          type="text"
          placeholder="Enter your text here"
          className="form-control w-25 col-sm-12"
          value={userInput}
          onChange={handleUserInput}
          style={{marginRight: "20px"}}
        />
        
        {isUpdate ? (
          <button className="btn btn-info" onClick={handleUpdate}>Update</button>
        ) : (
          <button className="btn btn-info" onClick={handleOnclickUserInput}>
            Save
          </button>
        )}
      </div>
    </>
  );
};

export default UserInputComponent;
