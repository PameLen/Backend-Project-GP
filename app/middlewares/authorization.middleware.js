//Vamos a recibir como parametro los roles que pueden acceder a un servicio
/*const authorizationMiddleware = (isAdmin) => {
  return (req, res, next) => {
    //Debemos obtener el rol del usuario que esta haciendo el request
    //const userRole = req.user.role;

    //verificar si el rol del usuario que esta haciendo el request, tiene permitido acceder al servicio
    if (!isAdmin.includes()) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};*/

const authorizationMiddleware = () => {
  return (req, res, next) => {
    // Verificamos si el usuario tiene la propiedad isAdmin y si es false
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Si isAdmin es true, permitimos continuar
    next();
  };
};

export default authorizationMiddleware;
