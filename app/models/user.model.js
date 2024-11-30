import mongoose from "mongoose";
import bcrypt from "bcrypt";

//Definir el schema de la db para la coleccion de usuarios

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Date,
  },
  favouritesFlats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flat",
    },
  ],
});

//El proyecto dice que hagan un borrado fisico, es recomedable hacer un borrado logico

//El primer parametro de nuestro pre hook, es la operacion a la cual vamos a aplicar el hook
userSchema.pre("save", async function (next) {
  const users = this; //this -> es el objeto que estamos guardando en BDD

  //Solo si se esta modificando el atributo password vamos a proceder a hashear la contraseña
  if (users.isModified("password")) {
    try {
      //Primer paso para hashear la contraseña, es generar un salt (va ha ser generado de manera randomica)
      const salt = await bcrypt.genSalt(10);

      //Segundo paso, es hashear la contraseña

      const hash = await bcrypt.hash(users.password, salt);

      //Tercer paso, es asignar la contraseña hasheada al atributo password
      users.password = hash;

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

//Vamos a crear un hook que se encargue de eliminar la contraseña del objeto que se va a devolver al cliente
userSchema.post("find", function (docs, next) {
  docs.forEach((doc) => {
    doc.password = undefined;
  });
  next();
});

//Vamos a extender la funcionalidad de nuestro schema, de manera que tenga un metodo que nos permita
//comparar la contraseña que el usuario esta enviando con la contraseña que esta almacenada en BDD
//recibe como parametro el password que envia el cliente para autenticarse
userSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//vamos agregar unmetodo a nuestro shema que nos permita generar un token de reseteo de psww
userSchema.methods.generatePasswordToken = function () {
  //generamos la cadena
  const resetToken = crypto.randomBytes(20).toString("hex");
  //vamos a guardar el token hasheado
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //vamos a definir el tiempo de duracion del token
  this.resetPasswordExpires = Date.now() + 3600000;
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
