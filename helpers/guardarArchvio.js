const fs = require('fs');
const path = './db/data.json';


const guardarDB = async (historial) => {
    fs.writeFileSync(path,JSON.stringify(historial));
    return 'Guardado correctamente';
}

 const getDB = async  () => {  
    if(!fs.existsSync(path))return null;
    const dataHistorial = fs.readFileSync(path,{encoding:'utf-8'});
    const response = JSON.parse(dataHistorial)
    return response;
}


module.exports = {guardarDB,getDB};