import React, { Component } from "react";
import anime from "animejs";

class Vrijeme extends Component {
  state = {
    city: "Cerna, HR",
    weatherData: null,
    hourlyForecast: [],
    error: null,
    showInputAndTitle: true,
    animated: false, // This will track if the list has been animated
  };

  handleChange = (e) => {
    this.setState({ city: e.target.value });
  };

  toggleInputAndTitle = () => {
    this.setState((prevState) => ({
      showInputAndTitle: !prevState.showInputAndTitle,
    }));
  };

  fetchWeatherData = () => {
    const { city } = this.state;
    const apiKey = "d0df035f183da18c44e84e512b971bac";
    const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    // First, fetch the geocoding data
    fetch(geoApiUrl)
      .then((response) => response.json())
      .then((geoData) => {
        if (geoData.length > 0) {
          const { lat, lon } = geoData[0]; // Get latitude and longitude
          const weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${apiKey}&units=metric`;

          // Fetch hourly forecast data for the next 8 hours
          fetch(weatherApiUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data.hourly) {
                // Extract the next 8 hours of hourly forecast data
                const next8HoursForecast = data.hourly.slice(0, 8);

                // Update the state with weather data and hourly forecast
                this.setState({
                  weatherData: data,
                  hourlyForecast: next8HoursForecast,
                  error: null,
                  showInputAndTitle: false, // Hide input and title after successful fetch
                });
              } else {
                this.setState({
                  weatherData: null,
                  hourlyForecast: [],
                  error: "No hourly forecast data available",
                });
              }
            })
            .catch((error) => {
              console.error("Pogreška pri dohvačanju podataka:", error);
              this.setState({
                weatherData: null,
                hourlyForecast: [],
                error: "Error fetching weather data",
              });
            });
        } else {
          this.setState({
            weatherData: null,
            hourlyForecast: [],
            error: "City not found",
          });
        }
      })
      .catch((error) => {
        console.error("Pogreška pri dohvačanju podataka:", error);
        this.setState({
          weatherData: null,
          hourlyForecast: [],
          error: "Error fetching geocoding data",
        });
      });
  };

  componentDidMount() {
    if (!this.state.animated && this.state.hourlyForecast.length > 0) {
      anime({
        targets: ".list-group-item",
        opacity: [0, 1],
        translateY: [-30, 0],
        delay: anime.stagger(100),
        complete: () => {
          this.setState({ animated: true });
        },
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.hourlyForecast !== this.state.hourlyForecast &&
      !this.state.animated
    ) {
      anime({
        targets: ".list-group-item",
        opacity: [0, 1],
        translateY: [-30, 0],
        delay: anime.stagger(100),
        complete: () => {
          this.setState({ animated: true });
        },
      });
    }
  }

  render() {
    const { city, weatherData, hourlyForecast, error, showInputAndTitle } =
      this.state;

    return (
      <div className="container mt-4">
        {showInputAndTitle ? (
          <>
            <h2>Informacije o vremenu</h2>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Unesite grad"
                value={city}
                onChange={this.handleChange}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={this.fetchWeatherData}>
                  Dohvati
                </button>
              </div>
            </div>
          </>
        ) : (
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.toggleInputAndTitle}>
            Promjeni Grad
          </button>
        )}

        {error && <p className="text-danger">{error}</p>}
        {weatherData && (
          <div>
            <h4>Prognoza za sljedećih 8 sati:</h4>
            <ul className="list-group">
              {hourlyForecast.map((hour, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                  {new Date(hour.dt * 1000).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                  : {Math.round(hour.temp)}°C, {hour.weather[0].description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Vrijeme;
