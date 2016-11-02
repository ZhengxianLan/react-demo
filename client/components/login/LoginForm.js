import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/login';
import {connect} from 'react-redux';
import { login } from '../../actions/login';

class LoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid(){
    const {errors,isValid} = validateInput(this.state);
    if(!isValid){
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({
        errors: {},isLoading:true
      });
      this.props.login(this.state).then(
        (res) => {
          console.log(res)
          this.context.router.push('/')},
        (err) => {
          console.log(err)
          // this.setState({errors:err.data.errors,isLoading:false})
        }
      );
    }
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  render(){
    const { errors,identifier,password,isLoading } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          errors={errors.identifier}
          onChange={this.onChange}
          value={this.state.identifier}
        />
        <TextFieldGroup
          field="password"
          label="password"
          errors={errors.password}
          onChange={this.onChange}
          type="password"
          value={this.state.password}
        />
        <div className="form-group">
          <button className="btn btn-primary btn-lg"
            disabled={isLoading}>Login</button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}
LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default connect(null,{login})( LoginForm );
