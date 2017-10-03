import React, { Component } from 'react';

const HEADERS = {
  'X-Parse-Application-Id': 'carson',
  'X-Parse-REST-API-Key': 'naturarogue',
  'X-Parse-Revocable-Session': 1
}

const PARSE_URL = 'https://naturals-test-parse-server.herokuapp.com'

class LoginForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      singupUsername: '',
      signupPassword: '',
      errorMessage: '',
      user: null,
    };

  }

  // --- Below sets the session per localStorage so a user can stay
  // --- logged in as long as they like across requests
  componentWillMount(){
    var loggedInUser = localStorage.getItem('user');

    if(loggedInUser){
      this.setState({user: JSON.parse(loggedInUser)})
    }
  }

  handleSignupUsername = (e) => {
    e.preventDefault();
    this.setState({signupUsername: e.target.value});
    console.log(this.state.signupUsername);
  }

  handleSignupPassword = (e) => {
    e.preventDefault();
    this.setState({signupPassword: e.target.value})
    console.log(this.state.signupPassword);
  }

  handleUsername = (e) => {
    e.preventDefault();
    this.setState({username: e.target.value});
  }

  handlePassword = (e) => {
    e.preventDefault();
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    var username = this.state.username;
    var password = this.state.password;
    let qs = 'username=' + encodeURIComponent(username) + '&password=' + password;

    fetch(PARSE_URL + '/login?' + qs, {
      headers: HEADERS
    }).then((resp) => {
      console.log(resp);
      return resp.json();
    }).then((user) => {
      console.log('user: ', user);

      localStorage.setItem('user', JSON.stringify(user));

      // --- if trying to log in with wrong user/pass
      // --- don't set session or set state
      if (user.username) {
        // --- setting session token to header for new headers
        HEADERS['X-Parse-Session-Token'] = user.sessionToken;
        this.setState({user: user, username: '', password: '', signupUsername: '', signupPassword: ''});
        this.props.history.push('/home');
      } else {
        this.setState({errorMessage: user.error})
      }
    });
  }


  handleSignupSubmit = (e) => {
    e.preventDefault();

    let username = this.state.signupUsername;
    let password = this.state.signupPassword;

    fetch(PARSE_URL + '/users', {
      headers: HEADERS,
      body: JSON.stringify({'username': username, 'password': password}),
      method: 'POST'
    }).then((resp) => {
      return resp.json();
    }).then((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      HEADERS['X-Parse-Session-Token'] = user.sessionToken;
      this.setState({username: '', password: '', signupUsername: '', signupPassword: ''})
    });
  }


  render(){

    return(
      <div className='row'>
        <div className='recipe-header-area row'>
          <h1>CalcuBaker</h1>
        </div>

            <div className='col-md-5 col-md-offset-1'>
              <h1>Please Login:</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input onChange={this.handleUsername} type="text" className="form-control" id="username" placeholder="Username" value={this.state.username}/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input onChange={this.handlePassword} type="password" className="form-control" id="password" placeholder="Password" value={this.state.password}/>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
              </form>
            </div>

            <div className='col-md-5'>
              <h1>No Account? Please sign up:</h1>
              <form onSubmit={this.handleSignupSubmit}>
                <div className="form-group">
                  <label htmlFor="signupUsername">Username:</label>
                  <input onChange={this.handleSignupUsername} type="text" className="form-control" id="signupUsername" placeholder="Username" value={this.state.signupUsername}/>
                </div>
                <div className="form-group">
                  <label htmlFor="signupPassword">Password:</label>
                  <input onChange={this.handleSignupPassword} type="password" className="form-control" id="signupPassword" placeholder="Password" value={this.state.signupPassword}/>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
              </form>

            </div>

        </div>
    )
  }
}

export default LoginForm;
