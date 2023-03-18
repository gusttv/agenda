import { Schema, model } from 'mongoose';

const LoginSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true}
});

const LoginModel = model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async newUser() {
    this.validate();
    if (this.errors.length > 0) return;
    
    try {
      this.user = await LoginModel.create(this.body);
    } 
    catch(e) {
      console.log(e);
    }
  }

  validate() {
    this.cleanUp();

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRegex.test(this.body.email)) this.errors.push("Email inválido");
    if (this.body.email !== this.body.emailRepeat) this.errors.push("Emails não coincidem");
    if (this.body.password.length < 3 || this.body.password.length > 30) this.errors.push("A senha deverá ser entre 3 e 30 caracteres");
  }

  cleanUp() {
    for(let key in this.body) {
      if (typeof this.body[key] !== "string") this.body[key] = "";
    }

    this.body = {
      email: this.body.createEmail,
      emailRepeat: this.body.createEmailRepeat,
      password: this.body.createPassword
    };
  }
}

export default Login;
