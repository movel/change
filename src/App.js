import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from './Components/Header';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			idToken: '',
			profile: {}
		}
	}

	static defaultProps = {
		clientId: 'Q9Kc7WpojpAGHhduk2qhJe8yMQvI6K0l',
		domain: 'movel.eu.auth0.com'
	}

	componentWillMount() {
		this.lock = new Auth0Lock(this.props.clientId, this.props.domain);

		// On authentication
		this.lock.on('authenticated', (authResult) => {
			this.lock.getProfile(authResult.idToken, (error, profile) => {
				if(error) {
					console.log(error);
					return;
				}

				this.setData(authResult.idToken, profile);
			});
		});

		this.getData();
	}

	// Set token & profile data
	setData(idToken, profile) {
		localStore.setItem('idToken', idToken);
		localStore.setItem('profile', JSON.stringify(profile));	
		this.setState({
			idToken: localStorage.getItem('idToken'),
			profile: JSON.parse(localStorage.getItem('profile'))
		});
	}
	
	// Check for token and get profile data
	getData() {
		if(localStorage.getItem('idToken') != null) {
			this.setState({
				idToken: localStorage.getItem('idToken'),
				profile: JSON.parse(localStorage.getItem('profile'))
			}, () => {
				console.log(this.state);
			});
		}
	}

	showLock() {
		this.lock.show();
	}

	logout() {
		this.setState({
			idToken: '',
			profile: ''
		}, () => {
			localStorage.removeItem('idToken');
			localStorage.removeItem('profile');
		});
	}

	render() {
		let page;
		if(this.state.idToken) {
			page = <Dashboard 
								lock={this.lock}
								idToken={this.state.idToken}
								profile={this.state.profile} 
							/>
		} else {
			page = <Home />
		}
		return ( 
			<div className="App">
				<Header 
					lock={this.lock}
					idToken={this.state.idToken}
					profile={this.state.profile}
					onLoginClick={this.showLock.bind(this)} 
					onLogoutClick={this.logout.bind(this)} 
				/>
				<Grid>
					<Row>
						<Col xs={12} md={12}>
							{page}
						</Col>
					</Row>
				</Grid>   
			</div> 
		);
	}
}

export default App;