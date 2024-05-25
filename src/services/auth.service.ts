import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {config} from '../config/config';
import {Usuarios} from '../models';
const jwt = require('jsonwebtoken');
import {UsuariosRepository} from '../repositories';
import {repository} from '@loopback/repository';

const generator = require("password-generator");
const cryptoJS = require("crypto-js");


@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(@repository(UsuariosRepository)
  public usuariosRepository: UsuariosRepository) {}

  /*
   * Add service methods here
   */
 //Generacion de claves
generarClave() {
  const clave = generator(8, false);
  return clave;
}

cifrarClave(clave: String) {
  const claveCifrada = cryptoJS.MD5(clave).toString();
  return claveCifrada;
}


//JWT
generarTokenJWT(usuarios: Usuarios) {
  let token = jwt.sign({
    data: {
      id: usuarios.id,
      correo: usuarios.correo,
      nombre: usuarios.nombre + " " + usuarios.apellidos
    }
  }, config.claveJWT)

  return token
}

validarTokenJWT(token: string) {
  try {
    let datos = jwt.verify(token, config.claveJWT);
    return datos;
  } catch (error) {
    return false;
  }
}
//Autenticacion
identificarPersona(correo: string, password: string) {
  try {
    let p = this.usuariosRepository.findOne({where: {correo: correo, password: password}})
    if (p) {
      return p;
    }
    return false;
  } catch {
    return false;
  }
}




}
