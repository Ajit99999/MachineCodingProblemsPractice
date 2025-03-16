import { useEffect, useRef, useState, useCallback } from "react";

const ImageSlider = () => {
  const [imageList, setImageList] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const timer = useRef(null);
  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   timer.current = setTimeout(() => {
  //     onClickNextHandler();
  //   }, 2000);

  //   return () => {
  //     console.log(timer.current, "timer value");
  //     if (timer.current) {
  //       clearTimeout(timer.current);
  //     }
  //   };
  // }, [activeIndex]);

  const onClickNextHandler = useCallback(() => {
    if (!imageList || imageList.length === 0) return;

    setActiveIndex((prevIndex) =>
      prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
    );
  }, [imageList]);

  const onClickPrevHandler = useCallback(() => {
    if (!imageList || imageList.length === 0) return;

    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
    );
  }, [imageList]);

  useEffect(() => {
    if (imageList && imageList.length > 0 && isPlaying) {
      timer.current = setInterval(() => {
        onClickNextHandler();
      }, 2000);

      return () => {
        clearInterval(timer.current);
      };
    }
  }, [imageList, onClickNextHandler, isPlaying]);

  async function getData() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      const transformData = data
        .map((data) => {
          return { id: data.id, image: data.image, title: data.title };
        })
        .slice(0, 5 + 1);
      setImageList(transformData);
    } catch (err) {
      console.log(err, "error");
      setImageList([]);
    }
  }

  function onMouseEnterHandler(e) {
    setIsPlaying(false);
  }

  function onMouseLeaveHandler(e) {
    setIsPlaying(true);
  }

  function onKeyDownHandler(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onClickNextHandler();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onClickNextHandler();
    }
  }

  return (
    <>
      {imageList && imageList.length > 0 && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <button
                aria-label="Previous slide"
                onClick={() => {
                  onClickPrevHandler(activeIndex);
                }}
              >
                Prev
              </button>
            </div>
            <div aria-label="image carousel" aria-roledescription="carousel">
              <img
                onMouseEnter={(e) => {
                  onMouseEnterHandler(e);
                }}
                onMouseLeave={(e) => {
                  onMouseLeaveHandler(e);
                }}
                tabIndex={0}
                onKeyDown={(e) => {
                  onKeyDownHandler(e);
                }}
                height={250}
                width={500}
                style={{
                  border: "1px solid black",
                  margin: "5px 5px",
                  cursor: "pointer",
                }}
                src={imageList?.[activeIndex].image}
                alt={imageList?.[activeIndex].title}
                aria-current="true"
              ></img>
            </div>

            <div>
              <button
                aria-label="next slide"
                onClick={() => {
                  onClickNextHandler(activeIndex);
                }}
              >
                Next
              </button>
            </div>
          </div>
          <div>
            {imageList &&
              imageList.map((elem, index) => {
                return (
                  <button
                    style={{
                      borderColor: `${
                        index === activeIndex ? "orange" : "black"
                      }`,
                    }}
                    key={elem?.id}
                    onClick={() => {
                      setActiveIndex(index);
                    }}
                  >
                    {" "}
                    {index + 1}{" "}
                  </button>
                );
              })}
          </div>
        </>
      )}
      {imageList && imageList.length === 0 && <p>No data found...</p>}
    </>
  );
};
export default ImageSlider;
