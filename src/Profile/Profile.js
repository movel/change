import React, { Component } from 'react';

class Profile extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">  
        {
          isAuthenticated() && (
            <div class="container">
              <h4>
                You are logged in!
              </h4>
              
              <div class="row">
                  <div class="col-sm-2 col-md-2">
                      <img src="http://thetransformedmale.files.wordpress.com/2011/06/bruce-wayne-armani.jpg"
                      alt="" class="img-rounded img-responsive" />
                  </div>
                  <div class="col-sm-4 col-md-4">
                      <blockquote>
                          <p>Bruce Wayne</p> <small><cite title="Source Title">Gotham, United Kingdom  <i class="glyphicon glyphicon-map-marker"></i></cite></small>
                      </blockquote>
                      <p> <i class="glyphicon glyphicon-envelope"></i> masterwayne@batman.com
                          <br
                          /> <i class="glyphicon glyphicon-globe"></i> www.bootsnipp.com
                          <br /> <i class="glyphicon glyphicon-gift"></i> January 30, 1974</p>
                  </div>
                  
              </div>
            </div>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Profile;
