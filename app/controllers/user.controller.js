// implementar la funcion getAllUsers, getUserById, updateUser, deleteUser
//Buenas practicas a tomar en cuenta
//1. Siempre usar try y catch para manejar errores
//2. Cuando hay un error, retornar codigo 500 internal server error
//3. Siempre retornar el codigo de estado correspondiente:
//200 - OK cuando todo va bien
//201 - Created cuando se crea un nuevo recurso
//404 - Not Found cuando no se encuentra el recurso
//500 - Internal Server Error cuando ocurre un error en el servidor
//400 - Bad Request cuando hay un error en el request
// Siempre registrar un evento de error cada vez que ingresen al catch (loggers)
