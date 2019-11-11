import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Auth';
import { Login, Cadastro } from "../components/login/index";

const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{pathname: "/login", state: { from: props.location } }} />
            )
        }
    />
);

//stateless component
const Routes = () => (
    <BrowserRouter>
		<Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/login" component={ Login } />
            <Route path="/registro" component={ Cadastro } />
            <PrivateRoute path="/app" component={ () => {
                localStorage.removeItem('auth-token');
                return 'Bem vindo ao sistema';
            } } />
        </Switch>
    </BrowserRouter>
);


export default Routes;