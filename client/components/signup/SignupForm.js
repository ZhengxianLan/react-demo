import React from 'react';
import {
  map
} from 'lodash';
import timezones from '../../data/timezones';
import classnames from 'classnames';


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
  onSubmit(e) {
    this.setState({
      errors: {},
      isLoading: true
    });
    e.preventDefault();
    this.props.userSignupRequest(this.state).then(
      () => {},
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
  render() {
    const {
      errors
    } = this.state;
    const options = map(timezones, (k, v) => <option value={v} key={k}>{k}</option>);
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our Comunity!</h1>
        <div className={classnames('form-group',{'has-error':errors.username})}>
          <label className="control-label" htmlFor="username">UserName</label>
          <input type="text"
            onChange={this.onChange}
            value={this.state.username}
            name='username'
            className='form-control'
          />
          {errors.username&&<span className='help-block'>{errors.username}</span>}
        </div>
        <div className={classnames('form-group',{'has-error':errors.password})}>
          <label className="control-label" htmlFor="password">Password</label>
          <input type="password"
            onChange={this.onChange}
            value={this.state.password}
            name='password'
            className='form-control'
          /> {errors.password&&<span className='help-block'>{errors.password}</span>}
        </div>
        <div className={classnames('form-group',{'has-error':errors.passwordConfirmation})}>
          <label className="control-label" htmlFor="passwordConfirmation">Password Confirmation</label>
          <input type="password"
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            name='passwordConfirmation'
            className='form-control'
          /> {errors.passwordConfirmation&&<span className='help-block'>{errors.passwordConfirmation}</span>}
        </div>
        <div className={classnames('form-group',{'has-error':errors.email})}>
          <label className="control-label" htmlFor="email">Email</label>
          <input type="email"
            onChange={this.onChange}
            value={this.state.email}
            name='email'
            className='form-control'
          /> {errors.email&&<span className='help-block'>{errors.email}</span>}
        </div>
        <div className={classnames('form-group',{'has-error':errors.timezone})}>
          <label className="control-label" htmlFor="timezone">Timezone</label>
          <select
            onChange={this.onChange}
            value={this.state.timezone}
            name='timezone'
            className='form-control' >
<option value="" disabled></option>
{options}
          </select> {errors.timezone&&<span className='help-block'>{errors.timezone}</span>}
        </div>
        <div className="form-group"><button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
      Sign up</button></div>
      </form>
    );
  }


}
SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;