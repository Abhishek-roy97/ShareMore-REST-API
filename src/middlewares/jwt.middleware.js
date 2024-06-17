import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).send('Unauthorized');
    }
    try{
        const payload = jwt.verify(token,'EN5kquLDuKMTtyURxipAnHgGJCQ7Hl6d');
        req.userId = payload.userId;
        console.log(payload);
    }catch(err){
        return res.status('Unauthorized');
    }
    next();
}

export default jwtAuth;