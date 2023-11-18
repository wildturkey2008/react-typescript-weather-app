import Title from "./components/Title";
import Form from "./components/Forms";
import Results from "./components/Results";
import { useState } from "react";
import "./App.css";

type ResultsStateType = {
  country: string;
  cityName: string;
  temperature: string;
  conditionText: string;
  icon: string;
};

function App() {
  const [city, setCity] = useState<string>("");
  const [results, setResults] = useState<ResultsStateType>({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: "",
  });
  const [error, setError] = useState<boolean>(false);

  const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=4c057edfe9874d1dafa44716231811&q=${city}&aqi=no`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setResults({
            country: data.location.country,
            cityName: data.location.name,
            temperature: data.current.temp_c,
            conditionText: data.current.condition.text,
            icon: data.current.condition.icon,
          });
          setError(false);
        }
      });
  };

  const resetResults = () => {
    setResults({
      country: "",
      cityName: "",
      temperature: "",
      conditionText: "",
      icon: "",
    });
    setError(false);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <Title />
        <Form setCity={setCity} getWeather={getWeather} />
        {error ? (
          <div>
            <p>存在しない都市名です。</p>
            <button onClick={resetResults}>初期画面に戻る</button>
          </div>
        ) : (
          <Results results={results} />
        )}
      </div>
    </div>
  );
}

export default App;
