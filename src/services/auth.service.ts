import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const generator = require("password-generator");
const cryptoJS = require("crypto-js");


@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(/* Add @inject to inject parameters */) {}

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

}
