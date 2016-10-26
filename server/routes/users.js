import express from 'express';
import validateInput from '../shared/validations/signup';
import bcrypt from 'bcrypt-nodejs';
import User from '../models/user';

let router = express.Router();

router.post('/', (req, res) => {
  const {
    errors,
    isValid
  } = validateInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    const { username,password,timezone,email } = req.body;
    const password_digest = bcrypt.hashSync(password);

    User.forge({
      username,timezone,email,password_digest
    },{hasTimestamps:true}).save()
      .then(user => res.json({success:true}))
      .catch(err => res.status(500).json({error:err}))
  }
})
export default router;

/*
中间件函数可以执行以下任务：

执行任何代码。
对请求和响应对象进行更改。
结束请求/响应循环。 -- 现在属于这种情况
调用堆栈中的下一个中间件。
*/
