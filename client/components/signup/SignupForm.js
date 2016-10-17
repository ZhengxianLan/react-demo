import React from 'react';
import {
  map
} from 'lodash';
import timezones from '../../data/timezones';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      timezone: '',
      errors: {},
      isLoading: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  onChange(e) {
    this.setState({
      /*
       * react 更新 state 的时候只看新部分的 key 对应的value变化，
       * 对于新对象中不存在的 key ，默认维持原样
       * */
      [e.target.name]: e.target.value
    });
  }

  isValid() {
    const {
      errors,
      isValid
    } = validateInput(this.state);

    if (!isValid) {
      this.setState({
        errors
      })
    }
    return isValid;
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({
        errors: {},
        isLoading: true
      });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage(
            {
              type:'success',
              text:'You signed up successful.Welcome'
          }
        )
          this.context.router.push('/');
        },
        ({
          response: {
            data
          }
        }) => this.setState({
          errors: data,
          isLoading: false
        })
      );
    }
  }
  render() {
    const {
      errors
    } = this.state;
    const options = map(timezones, (k, v) => <option value={v} key={k}>{k}</option>);
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our Comunity!</h1>

        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          value={this.state.username}
          field="username"
        />

        <TextFieldGroup
          error={errors.password}
          type='password'
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
        />

        <TextFieldGroup
          type='password'
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
        />

        <TextFieldGroup
          error={errors.email}
          type='email'
          label="Email"
          onChange={this.onChange}
          value={this.state.email}
          field="email"
        />

        <div className={classnames('form-group',{'has-error':errors.timezone})}>
          <label className="control-label" htmlFor="timezone">Timezone</label>
          <select
            onChange={this.onChange}
            value={this.state.timezone}
            name='timezone'
            className='form-control' >
              <option value="" disabled></option>
              {options}
            </select>
            {errors.timezone&&<span className='help-block'>{errors.timezone}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>

      </form>
    );
  }


}
SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}
SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm;
