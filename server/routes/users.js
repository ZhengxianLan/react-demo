import express from 'express';
import validateInput from '../shared/validations/signup';
let router = express.Router();


router.post('/', (req, res) => {
  const {
    errors,
    isValid
  } = validateInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    res.end('{"success" : "Signup Successfully", "status" : 201}');
  }
})
export default router;