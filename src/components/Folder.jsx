import React, { useState } from "react";
import { FcFolder } from "react-icons/fc";
import { HiDocumentPlus, HiFolderPlus } from "react-icons/hi2";
import { BsFileEarmarkCode } from "react-icons/bs";

function Folder({ handleInsertNode, explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };
  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <div className="mt-3 max-w-[400px] bg-slate-100 py-1 px-4 ">
        <div
          className="folder flex items-center space-x-2 cursor-pointer justify-between "
          onClick={() => setExpand(!expand)}
        >
          <div className="flex justify-between space-x-3">
            <FcFolder className="text-2xl" />{" "}
            <span className="text-gray-800 font-semibold">{explorer.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={(e) => handleNewFolder(e, true)}>
              <HiFolderPlus className="text-xl text-gray-700 hover:text-gray-600" />
            </button>{" "}
            <button onClick={(e) => handleNewFolder(e, false)}>
              <HiDocumentPlus className="text-xl text-gray-700 hover:text-gray-600" />
            </button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none" }}>
          {showInput.visible && (
            <div className="flex space-x-2 ml-6 mt-1">
              <span>
                {showInput.isFolder ? (
                  <HiFolderPlus className="text-xl text-gray-700 hover:text-gray-600" />
                ) : (
                  <HiDocumentPlus className="text-xl text-gray-700 hover:text-gray-600" />
                )}
              </span>
              <input
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
                type="text"
                name=""
                className="px-2 focus:outline outline-none border "
                id=""
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return <Folder handleInsertNode={handleInsertNode} key={exp.id} explorer={exp} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-3 max-w-[400px]">
        <div className="flex items-center space-x-2">
          <BsFileEarmarkCode /> <span>{explorer.name}</span>
        </div>
      </div>
    );
  }
}

export default Folder;
