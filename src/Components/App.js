import React, {useState} from 'react'
import Inputs from './Inputs';
import Button from './Button'
import Image from './Image';
import Loader from './Loader'

function App() {

  const [inputText, setInputText] = useState("");
  const [src, setSrc]  = useState("");
  const [isLoading, setLoading] = useState(true)

  async function query(data) {
    console.log(data);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          headers: { Authorization: "Bearer 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"},
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      return result;
    }
    catch(error) {
      console.log(`Error! ${error}`);
    }
  }

  const fetchData = () => {
    setLoading(true)
    query({"inputs": `${inputText}`}).then((response) => {
      console.log(response);
      const imageUrl = URL.createObjectURL(response);
      console.log(imageUrl);
      setSrc(imageUrl)
      setLoading((prev) => !prev)
    });
  }


  return (
    <>
      <Inputs value = {inputText} onChange = {(e) => setInputText(e.target.value)}/>
      <Button title = "Generate" onClick = {fetchData}/>
      {isLoading ? <Loader/> : <Image src={src} alt={inputText}/>}
    </>
  );
}

export default App;
