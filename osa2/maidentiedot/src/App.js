import React, {useState, useEffect} from 'react';
import axios from 'axios'


const Filter = ({filterName, handleFilterNameChange}) => {
  return (
    <>
    Find countries: <input value = {filterName} onChange ={handleFilterNameChange}/>
    </>
  )
}

/*
https://api.apixu.com/v1/current.json?key=7bce975af8c14bc39a2222831190308&q=Helsinki
*/

const WeatherInfo = ({city}) => {
  const [weather, setWeather] = useState([])

  useEffect(()=>{
    console.log(`Getting weather for ${city}`)
    axios
      .get(`https://api.apixu.com/v1/current.json?key=7bce975af8c14bc39a2222831190308&q=${city}`)
      .then(response => {
        console.log('Promise fulfilled')
        setWeather(response.data)
      })
  }, [city])

  console.log(weather)
  if(weather.length !==0){
  return (
    <>
    <h2>Weather in {city}</h2>
    <p>{weather.current.temp_c}</p>
    </>
  )
  }else{
    return(
      <>
      <h2>Weather in {city}</h2>
      <p>No data found</p>
      </>
    )
  }
}

const OnlyCountry = ({country}) => {
  return (
    <>
          <h1>{country.name}</h1>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h2>Languages:</h2>
          {country.languages.map((language, index)=><li key={index}>{language.name}</li>)}
          <img src={country.flag} alt={`${country.name} flag`} width="200" height="140"/>
          <WeatherInfo city={country.capital}/>
        </>
  )
}

const Country = ({country}) => {
  
  const [hidden, toggleHidden] = useState(true)
  

  if(hidden){
    return <button onClick = {() => toggleHidden(!hidden)}>Show</button>
  }
  return (
    <>
    <button onClick={() => toggleHidden(!hidden)}>Hide</button>
          <h1>{country.name}</h1>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h2>Languages:</h2>
          {country.languages.map((language, index)=><li key={index}>{language.name}</li>)}
          <img src={country.flag} alt={`${country.name} flag`} width="200" height="140"/>
          <WeatherInfo city={country.capital}/>
        </>
  )
}

const CountryList = ({countries}) => {
  return (
    <>
    {countries.map((country, index) => <div key={index}>{country.name} <Country country={country}/></div>)}
    </>
    )
}

const Countries = ({countries}) => {
  const n = countries.length
  if(n > 10){
    return (
      <>
      <p>Too many matches, please specify filter</p>
      </>
    )
  }
  if(n === 1){
      const country = countries[0]
      return (
        <OnlyCountry country={country}/>
      )
  }
  return (
        <>
        {<CountryList countries={countries}/>}
        </>
      )
}
  


const App = () => {


const [countries, setCountries] = useState([])
const [filterName, setFilterName] = useState('')

const handleFilterNameChange = (event) => {
  console.log(event.target.value)
  setFilterName(event.target.value)
}


useEffect(()=>{
  console.log('Getting Countries')
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('Promise fulfilled')
      setCountries(response.data)
    })
}, [])

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
        <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange}/>
        <Countries countries={countriesToShow}/>
    </div>
  );
}

export default App;
