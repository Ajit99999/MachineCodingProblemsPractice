import { useEffect, useRef, useState } from "react";
import "./App.css";
import SearchAutoComplete from "./components/SearchAutoComplete";

function App() {
  const [listData, setListData] = useState(null);
  const [selectedData, setSelectedData] = useState("");
  const timer = useRef(null);
  const cache = useRef(new Map());
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [isHighlightedIndex, setIsHighlightedIndex] = useState(-1);
  const isSelectionMadeByEnter = useRef(false);

  async function getDataFromApi(query) {
    try {
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/randomproducts?query=${query}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong. Could not fetch the data");
      }
      const data = await response.json();
      setListData(data.data.data);
      cache.current.set(query, data.data.data);
      setIsHighlightedIndex(data.data.data?.length > 0 ? 0 : -1);
      setIsShowDropDown(true);
    } catch (err) {
      console.log(err, "error");
      setListData([]);
      setIsHighlightedIndex(-1);
      setIsShowDropDown(false);
    }
  }
  useEffect(() => {
    if (!selectedData) {
      setIsHighlightedIndex(-1);
      setIsShowDropDown(false);
      return;
    }

    if (isSelectionMadeByEnter.current) {
      isSelectionMadeByEnter.current = false;
      return;
    }

    if (cache.current.has(selectedData)) {
      const cacheResult = cache.current.get(selectedData);
      setListData(cacheResult);
      setIsHighlightedIndex(cacheResult.length > 0 ? 0 : -1);
      setIsShowDropDown(true);
    } else {
      timer.current = setTimeout(() => {
        getDataFromApi(selectedData);
      }, 500);
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [selectedData]);

  function onChangeHandler(e) {
    setSelectedData(e.target.value);
  }
  function onBlurHandler() {
    setIsShowDropDown(false);
  }
  function onFocusHandler() {
    if (!selectedData) {
      setIsHighlightedIndex(-1);
      setIsShowDropDown(false);
    } else {
      setIsHighlightedIndex(0);
      setIsShowDropDown(true);
    }
  }
  function onClickhandlerListItem(data) {
    setSelectedData(data);
    setIsShowDropDown(false);
    isSelectionMadeByEnter.current = true;
  }
  function onKeyDownHandler(e) {
    if (!listData || listData?.length === 0 || !isShowDropDown) {
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (isHighlightedIndex === listData.length - 1) {
        setIsHighlightedIndex(0);
      } else {
        setIsHighlightedIndex((prev) => prev + 1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isHighlightedIndex === 0) {
        setIsHighlightedIndex(listData.length - 1);
      } else {
        setIsHighlightedIndex((prev) => prev - 1);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (isHighlightedIndex !== -1 && listData[isHighlightedIndex]) {
        const selectedValue = listData[isHighlightedIndex]?.title;
        setIsShowDropDown(false);
        setSelectedData(selectedValue);
        isSelectionMadeByEnter.current = true;
        return;
      }
    }
  }

  return (
    <>
      <SearchAutoComplete
        onKeyDownHandler={onKeyDownHandler}
        isHighlightedIndex={isHighlightedIndex}
        onClickhandlerListItem={onClickhandlerListItem}
        isShowDropDown={isShowDropDown}
        onChangeHandler={onChangeHandler}
        listData={listData}
        selectedData={selectedData}
        onBlurHandler={onBlurHandler}
        onFocusHandler={onFocusHandler}
      />
    </>
  );
}

export default App;
