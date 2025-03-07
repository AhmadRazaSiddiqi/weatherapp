import axios from "axios"
import { useState } from "react"
import { WiHumidity } from "react-icons/wi"
import { FaSearch } from "react-icons/fa"
import { FaWind } from "react-icons/fa"

const Interface = () => {
  const [City, setCity] = useState("")
  const [error, seterror] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [temperature, settemperature] = useState(null)
  const [humidity, sethumidity] = useState(null)
  const [wind, setwind] = useState(null)
  const [icon, seticon] = useState("")
  const [Name, setName] = useState("")
  const fetchWeather = async () => {
    if (!City) return
    setisLoading(true)
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${
          import.meta.env.VITE_Weather_Api
        }&units=metric`
      )
      sethumidity(data.main.humidity)
      setwind(data.wind.speed)
      settemperature(data.main.temp)
      seticon(data.weather[0].icon)
      setName(data.name)

      seterror(false)
    } catch (error) {
      seterror(true)
      sethumidity(null)
      setwind(null)
      settemperature(null)
      seticon(null)
      setisLoading(false)
    }
    setisLoading(false)
  }

  return (
    <div className=" max-w-80 min-h-[80vh] md:h-[90vh] rounded-lg  flex flex-col mx-auto items-center justify-center border text-zinc-300  bg-zinc-900">
      <div className="flex  justify-center items-center px-3 py-1 rounded-full border">
        <input
          type="text"
          className="outline-none flex-1"
          placeholder="Search City ..."
          value={City}
          onChange={(e) => setCity(e.target.value)}
        />
        <FaSearch className="cursor-pointer" onClick={fetchWeather} />
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${!icon ? "01d" : icon}@2x.png`}
        alt=""
        className="h-30"
      />
      <h1 className="mb-2.5 text-xl">
        {!temperature ? "--" : `${temperature}°C`}
      </h1>
      <div className="text-xl">
        {isLoading
          ? "Loading"
          : error
          ? "City Not Found"
          : Name || "Enter Your City Name"}
      </div>
      <div className="flex justify-around mt-8 w-full">
        <div className="flex flex-col items-center text-xl">
          <WiHumidity />
          {!humidity ? "--" : `${humidity}%`}
          <h1>Humidity</h1>
        </div>
        <div className="flex flex-col items-center text-xl">
          <FaWind />
          {!wind ? "--" : `${wind}kmh`}
          <h2>WindSpeed</h2>
        </div>
      </div>
    </div>
  )
}

export default Interface
