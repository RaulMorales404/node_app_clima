
const inquirer =  require('inquirer')

const Input = async (message = 'Escribe:') => {
 const {value} = await inquirer.prompt([{
    type:'input',
    name:'value',
    message,
    validate(value){
      if(value.length ===0 ){
         return 'Por favor ingresa un valor';
      }
      return true;
    }
 }]);
 return value;
}



module.exports = Input;