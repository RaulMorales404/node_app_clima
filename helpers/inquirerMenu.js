const inquirer = require("inquirer");
require("colors");

const optionQuestions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer? \n",
    choices: [
      {
        value: "1",
        name: `${"1".green}  Buscar`,
      },
      {
        value: "2",
        name: `${"2".green}  Historail`,
      },
     {
        value: "0",
        name: `${"0".green}  Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("\n============================".cyan);
  console.log("   Seleccione una Opción".cyan);
  console.log("============================\n".cyan);

  const { opcion } = await inquirer.prompt(optionQuestions); // Desestructurar la respuesta

  return opcion; // Devuelve solo la opción seleccionada
};

const pause = async (value) => {
  console.log("\n");
  await inquirer.prompt([
    {
      type: "input",
      name: ` Presiona ${"ENTER".yellow} para continuar`,
    },
  ]);
};

const menuListarLugares = async (lugares = []) => {
  const choices = lugares.map(({id,name}, index) => {    
    return {
      value: id,
      name: `${(index + 1).toString().green}. ${name} `,
    };
  });
  choices.unshift({
    value:'0',
    name: `${(0).toString().green}. Salir`,
  })

  const configMenuBorrar = [
    {
      type: "list",
      name: "id",
      message: "\nSelecciona un lugar".yellow,
      choices,
    },
  ];
  const { id } = await inquirer.prompt(configMenuBorrar);
  return id;
};


const listarHistorial = async (tareas = []) => {
  const choices = tareas.map((lugar, index) => {
    return {
      value: lugar,
      name: `${(index + 1).toString().green}. ${lugar}`
    };
  });

  choices.unshift({
    value:'0',
    name: `${(0).toString().green}. Salir`,
  })
  

  const configListHistorial = [
    {
      type: "list",
      name: "idSearch",
      message: "\nPuedes seleccine para buscar de nuevo".yellow   ,
      choices,
    },
  ];
  const { idSearch } = await inquirer.prompt(configListHistorial);
  return idSearch;
};

module.exports = {
  inquirerMenu,
  menuListarLugares,
  listarHistorial, 
  pause,
};
