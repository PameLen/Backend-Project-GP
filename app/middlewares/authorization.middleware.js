//Vamos a recibir como parametro los roles que pueden acceder a un servicio
/*
const validateUserOrAdminA = (req, res, next) => {
  try {
    const userIdFromToken = req.user?.user_id; // ID del usuario del token
    const userIdFromParams = req.params.id; // ID del parámetro en la URL

    // Si el usuario no es el dueño de la cuenta y no es administrador, denegar acceso
    if (userIdFromToken !== userIdFromParams && !req.user.isAdmin) {
      return res.status(403).json({
        message:
          "Access denied: You can only edit your own profile or be an admin.",
      });
    }

    // Si es dueño o administrador, continuar
    next();
  } catch (error) {
    res.status(500).json({ message: "Error while validating access" });
  }
};

export default validateUserOrAdminA;
*/
