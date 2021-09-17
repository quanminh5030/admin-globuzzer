import React from "react";
import "./css/App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Admin from "./pages/Admin/SignIn/SignIn";
import { auth, createUserProfileDocument } from "./utils/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import SignUp from "./pages/Admin/SignUp/SignUp";
import AdminLanding from './pages/Admin/AdminLanding/AdminLanding';
import AdminSection from "./pages/Admin/AdminSection/AdminSection";
import AdminSectionCity from "./pages/Admin/AdminSection/AdminSectionCity";
import AdminTopic from "./pages/Admin/AdminTopic/admin area/AdminTopic";
import Accomodation from "./pages/Admin/AdminTopic/Accomodation";
import AdminTopicListCountries from "./pages/Admin/AdminTopic/admin area/AdminTopicListCountries";

class App extends React.Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    //storing user data
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.props.currentUser ? <Redirect to="/dashboard" /> : <Admin />
            }
          />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={SignUp} />
          <Route path="/landing" component={AdminLanding} />
          <Route exact path="/section" component={AdminSection} />
          <Route path="/section/:city/:cityId" component={AdminSectionCity} />
          <Route exact path='/topic' component={AdminTopic} />

          <Route exact path='/topic/:topic' render={props => (
            <AdminTopicListCountries
              props={props.location.state}
            />
          )} />
          <Route exact path='/topic/:topic/:city/:cityId' render={props => (
            <Accomodation 
              props={props.location.state}
            />
          )} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
