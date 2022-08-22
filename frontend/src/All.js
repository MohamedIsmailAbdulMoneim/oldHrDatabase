import './App.css';
import React from 'react'
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from './actions/AuthActions';
import { getEmps, getGid } from './actions/Actions'
import { countEmpsInGoverns,getNatIdExpired } from './actions/ReportActions'
import { withRouter } from 'react-router';
import App from './App';

let name;


class All extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuth: false };

  }

  authgiven = (isAuth) => {
    if(isAuth) this.setState({isAuth: true})
    if(!isAuth) this.setState({isAuth: false})
  }


  componentDidMount() {
console.log(this.state.isAuth);
    store.dispatch(loadUser())
    store.dispatch(getEmps())
    store.dispatch(getGid())
    store.dispatch(countEmpsInGoverns())
        var d = new Date();
        var n = d.getDate();
        if(!localStorage.getItem('day')){

            localStorage.setItem('day', n)
        }
        if(d.getDate() > localStorage.getItem('day')){
            store.dispatch(getNatIdExpired(1))
            localStorage.setItem('day', n)

        }else{
        }
        //  const getStore =  async () => {
        //   let response;
        //   if(store.getState().auth.isAuthenticated){
        //     response = true
        //     return response;
        //   }else if(!store.getState().auth.isAuthenticated){
        //     response = false
        //     return response;
        //   }
        // }

        // getStore().then(res => {
        //   if(res){
        //   this.setState({
        //     isAuth: true
        //   })
        // }else{
        //   this.setState({
        //     isAuth: false
        //   })
        // }
        // })
        // if(!store.getState().auth.token){
        //   this.props.history.push('login');
        // }
        

          
  }

  render() {

            return (
      <Provider store={store} >

          <App  authgiven={this.authgiven}/>
          
      </Provider>
    );
  }

}

export default withRouter(All);

