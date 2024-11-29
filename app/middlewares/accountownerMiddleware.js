const validateUserOrAdmin = (req, res, next) => {
  try {
    const userIdFromToken = req.user?.user_id; // ID del usuario del token
    const userIdFromParams = req.params.id; // ID del parámetro en la URL

    // Si el usuario no es el dueño de la cuenta y no es administrador, denegar acceso
    if (userIdFromToken !== userIdFromParams && !req.user.isAdmin) {
      return res.status(403).json({
        message:
          "Accesso denegado. Solo puedes editar/eliminar tu propio perfil o si eres administrador ",
      });
    }

    // Si es dueño o administrador, continuar
    next();
  } catch (error) {
    res.status(500).json({ message: "Error al validar el acceso" });
  }
};

export default validateUserOrAdmin;
