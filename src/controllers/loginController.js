import Login from "../models/loginModel.js";

export function enter(req, res) {
    res.render("login");
}

export async function register(req, res) {
  try {
    const login = new Login(req.body);
    await login.newUser();
  
    if (login.errors.length > 0 ) {
      req.flash("errors", login.errors);
      req.session.save(() => res.redirect("back"));
      return;
    }
    
    req.flash("success", "Usuario Criado");
    req.session.save(() => {
      return res.redirect("back");
    });
  } catch(e) {
    console.log(e);
    return res.render("404");
  }
}
