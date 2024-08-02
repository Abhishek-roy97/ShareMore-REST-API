import { body, validationResult } from "express-validator";

const postValidation = async (req, res, next) => {
    const rules = [
        body("caption").notEmpty().withMessage("Caption must be Entered"),
        body("imageUrl").custom((value, { req }) => {
            if(!req.file){
                throw new Error("Image is Required to Upload a Post");
            }
            return true;
        }),
    ];
    await Promise.all(rules.map((rule)=> rule.run(req)));

    const validationError = validationResult(req);

    if(!validationError.isEmpty()){
        return res.status(400).send({ errorMessage: validationError.array()[0].msg});
    }
    next();
};

const uservalidation = async (req, res, next) => {
    const rules = [
        body("name").notEmpty().withMessage("Name is required "),
        body("email").notEmpty().isEmail().withMessage("Invalid Email Format"),
        body("password").notEmpty().isLength({ min: 8, max: 16 }).withMessage("Password must be 8-16 characters long"),
    ];
    await Promise.all(rules.map((rule)=> rule.run(req)));

    const validationError = validationResult(req);

    if(!validationError.isEmpty()){
        return res.status(400).send({ errorMessage: validationError.array()[0].msg});
    }
    next();
};

const loginValidation = async (req, res, next) => {
    const rules = [
        body("email").notEmpty().isEmail().withMessage("Invalid email format"),
        body("password").notEmpty().isLength({ min: 8, max: 16}).withMessage("Password must be 8-16 characters long"),
    ];
    await Promise.all(rules.map((rule)=> rule.run(req)));

    const validationError = validationResult(req);

    if(!validationError.isEmpty()){
        return res.status(400).send({ errorMessage: validationError.array()[0].msg});
    }
    next();
}

export { postValidation, uservalidation, loginValidation};