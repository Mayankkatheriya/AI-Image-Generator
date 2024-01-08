import React, { useState, useEffect } from "react";
import Inputs from "./Inputs";
import Button from "./Button";
import Image from "./Image";
import Loader from "./Loader";
import { nanoid } from "nanoid";

// ... (import statements remain unchanged)

function App() {
  const [inputText, setInputText] = useState("");
  const [imageData, setImageData] = useState(() => {
    const storedData = localStorage.getItem("imageData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [isLoading, setLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState(null);
  const [src, setSrc] = useState("https://img.freepik.com/free-photo/anthropomorphic-robot-indoors_23-2150405626.jpg");

  //TODO useEfeect for setting data to local storage
  useEffect(() => {
    localStorage.setItem("imageData", JSON.stringify(imageData));
  }, [imageData]);

  //todo fetching data from API
  async function query(data) {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          headers: {
            Authorization: "Bearer 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",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      return result;
    } catch (error) {
      setError(`Error! ${error}`);
      console.error(`Error! ${error}`);
    }
  }

  //todo click event for generating data from API
  const fetchData = () => {
    if (!inputText || inputText === "") {
      alert("Please enter some text");
      return;
    }
    setLoading(true);
    setIsClicked(true);
    setError(null);

    query({ inputs: `${inputText}` }).then((response) => {
      console.log(response);
      const imageUrl = URL.createObjectURL(response);
      setSrc(imageUrl);
      console.log(imageUrl);
      setImageData((prev) => [
        {
          id: nanoid(),
          src: imageUrl,
          alt: inputText,
        },
        ...prev,
      ]);
      setLoading(false);
    });
  };
  //todo func fot delete item from array
  const handleDelete = (id) => {
    setImageData((imageData) => imageData.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <h1>AI Image Generator</h1>
      <div className="inputs">
        <Inputs
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button title="Generate" onClick={fetchData} className="generate-btn" />
      </div>
      {isLoading && isClicked ? (
        <Loader />
      ) : (
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => window.open(src)}
          className="preview"
          download
        >
          <img src={src} />
        </a>
      )}

      <div className="image-container">
        {error && <p className="error-message">{error}</p>}
        {imageData && (
          imageData.map((item) => (
            <Image
              key={item.id}
              src={item.src}
              alt={item.alt}
              id={item.id}
              onClick={() => handleDelete(item.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
