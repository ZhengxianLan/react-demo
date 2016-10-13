import React from 'react';
import {map} from 'lodash';
import timezones from '../../data/timezones';

class SignupForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      email:'',
      timezone:'',
    }
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({
      /*
       * react 更新 state 的时候只看新部分的 key 对应的value变化，
       * 对于新对象中不存在的 key ，默认维持原样
      * */
      [e.target.name]:e.target.value
    });
  }
  onSubmit(e){
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }
  render(){
	const options =map( timezones,(k,v) => <option value={v} key={k}>{k}</option>);
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our Comunity!</h1>
        <div className="form-group">
          <label className="control-label" htmlFor="username">UserName</label>
          <input type="text"
            onChange={this.onChange}
            value={this.state.username}
            name='username'
            className='form-control'
          />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="password">Password</label>
          <input type="password"
            onChange={this.onChange}
            value={this.state.password}
            name='password'
            className='form-control'
          />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="passswordConfirmation">Password Confirmation</label>
          <input type="password"
            onChange={this.onChange}
            value={this.state.passswordConfirmation}
            name='password'
            className='form-control'
          />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="email">Email</label>
          <input type="email"
            onChange={this.onChange}
            value={this.state.email}
            name='email'
            className='form-control'
          />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="timezone">Timezone</label>
          <select
            onChange={this.onChange}
            value={this.state.timezone}
            name='timezone'
            className='form-control' >
<option value="" disabled></option>
{options}
          </select>
        </div>
        <div className="form-group"><button className="btn btn-primary btn-lg">
      Sign up</button></div>
      </form>
  );
  }


}
  SignupForm.propTypes={
    userSignupRequest: React.PropTypes.func.isRequired
  }

export default SignupForm;
