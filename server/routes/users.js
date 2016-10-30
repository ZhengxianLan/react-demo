import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt-nodejs';
import isEmpty from 'lodash/isEmpty';
import User from '../models/user';

let router = express.Router();

function validateInput(data,otherValidations){
  let { errors } = otherValidations(data);

	return User.query({
		where: {email: data.email},
		orWhere: { username: data.username }
	}).fetch().then(user => {
		if(user){
			if(user.get('email') === data.email) {
				errors.email = 'There is user with such email';
			}
			if(user.get('username') === data.username) {
				errors.username = 'There is user with such username';
			}
		}
		return {
			errors,
			isValid: isEmpty(errors)
		}
	});

}


router.get('/:identifier',(req,res) => {
  let identifier = req.params.identifier;
  User.query({
    select: [ 'username','email' ],
    where: { email: identifier },
    orWhere: { username: identifier }
  }).fetch().then(user => {
    res.json({ user });
  });
})

router.post('/', (req, res) => {
  validateInput(req.body,commonValidations).then(({errors,isValid}) => {
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const {
        username,
        password,
        timezone,
        email
      } = req.body;
      const password_digest = bcrypt.hashSync(password);

      User.forge({
        username,
        timezone,
        email,
        password_digest
      }, {
        hasTimestamps: true
      }).save()
        .then(user => res.json({
          success: true
        }))
        .catch(err => res.status(500).json({
          error: err
        }))
    }
  });
})
export default router;

/*
中间件函数可以执行以下任务：

执行任何代码。
对请求和响应对象进行更改。
结束请求/响应循环。 -- 现在属于这种情况
调用堆栈中的下一个中间件。
*/
