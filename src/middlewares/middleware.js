export function checkError (err, req, res, next) {
    if (err) {
        return res.render("404");
    }

    next();
}

export function errorMessage (req, res, next) {
    res.locals.errors = req.flash("errors");
    res.locals.success = req.flash("success");
    next();
}