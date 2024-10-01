const { AxiosHttp, AxiosMapCording } = require("./../api/axios");
const { getDB } = require("./../helpers/guardarArchvio");
class Busqueda {
  _historial = [];

  constructor() {
    //TODO leer base de dato si existe
    this.getHistorial();
  }

  async buscarCiudad(name = "") {
    //TODO buscar peticion http
    console.log("Cargando...".yellow);
    try {
      const response = await AxiosHttp.get(`mapbox.places/${name}.json`);
      console.clear();
      const dataLugares = response.data.features.map((lugar) => {
        return {
          id: lugar.id,
          name: lugar.place_name,
          lat: lugar.center[1],
          lgn: lugar.center[0],
        };
      });

      return { lugares: dataLugares, nameCity: response.data.query[0] };
    } catch (error) {
      console.log("error", error.status);
      return {
        lugares: [],
        nameCity: "",
      };
    }
  }

  async detallesCity(lat = "", lng = "") {
    try {
      const { data } = await AxiosMapCording.get(
        `weather?lat=${lat}&lon=${lng}`
      );
      console.log(
        "-------------------------------------------------------".blue
      );
      console.log("Ciudad:".yellow, data.name);
      console.log("  Lat:", data.coord.lat);
      console.log("  Lng:", data.coord.lon);
      console.log("Temperatura:".yellow);
      console.log("  Minima:", data.main.feels_like, "°C");
      console.log("  Maxima:", data.main.temp_min, "°C");
      console.log("  El Clima se encuentra: ", data.weather[0].description);

      console.log(
        "-------------------------------------------------------".blue
      );
    } catch (error) {
      console.log("error", error.status);
    }
  }

  async getHistorial() {
    const responseHistorial = await getDB();
    if (responseHistorial) {
      this._historial = responseHistorial;
    }
  }

  async saveHistorial(search = "") {
    if (this._historial.includes(search)) return this._historial;
    if (this._historial.length <= 5) {
      this._historial.push(search);
    } else {
      this._historial.unshift(search);
      this._historial.pop();
    }

    return this._historial;
  }
}

module.exports = Busqueda;
