const Input = require("./helpers/input");
const {
  pause,
  inquirerMenu,
  menuListarLugares,
  listarHistorial,
} = require("./helpers/inquirerMenu");
const Busqueda = require("./modules/busqueda");
const { guardarDB } = require("./helpers/guardarArchvio");
const main = async () => {
  const busqueda = new Busqueda();
  let key = "";
  do {
    // console.clear();

    key = await inquirerMenu();
    const realisarBusqueda = async (value = "") => {
      const { lugares, nameCity } = await busqueda.buscarCiudad(value);
      if (lugares.length > 0) {
        const historial = await busqueda.saveHistorial(value);
        await guardarDB(historial);
      }
      console.log("\nBuscaste a :".green, `${nameCity}`.blue);
      const id = await menuListarLugares(lugares);
      if (id !== "0") {
        const { lat, lgn } = lugares.find((lugar) => lugar.id === id);
        await busqueda.detallesCity(lat, lgn);
      }
    };
    switch (key) {
      case "1":
        console.log("Buscar");
        const value = await Input("Que ciudad Buscas? :".green);
        await realisarBusqueda(value);
        break;
      case "2":
        if (busqueda._historial.length > 0) {
          const idSearch = await listarHistorial(busqueda._historial);
          if (idSearch == "0") break;
          await realisarBusqueda(idSearch);
        } else {
          console.log(`\n Sin historial, Realiza una busqueda \n`.yellow);
        }

        break;
    }

    await pause();
  } while (key !== "0");
};

main();
