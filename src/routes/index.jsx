import React from 'react';
import { IndexRedirect, IndexRoute, Route } from 'react-router';
import { checkAuth } from './actions/auth';
import App from '../App/index.jsx';
import Map from '../Map/MapContainer.jsx';
import PlacesMap from '../Map/containers/PlacesMap/index.jsx';
import DirectionsMap from '../Map/containers/DirectionsMap/index.jsx';
import Registration from '../Auth/containers/Registration/index.jsx';
import Login from '../Auth/containers/Login/index.jsx';
import Home from '../Home/HomeContainer.jsx';
import Place from '../Place/PlaceContainer.jsx';
import Profile from '../Profile/ProfileContainer.jsx';
import EditProfile from '../Profile/components/EditProfile/index.jsx'
import ProfileStatistics from '../Profile/components/Statistics/index.jsx';
import Rating from '../Rating/RatingContainer.jsx';
import Admin from '../Admin/AdminContainer.jsx';
import AdminPlaces from '../Admin/components/Places/index.jsx';
import AdminUsers from '../Admin/components/Users/index.jsx';
import AdminRating from '../Admin/components/Rating/index.jsx';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="map" />
    <Route onEnter={checkAuth}>
      <Route path="map" component={Map}>
        <IndexRedirect to="places" />
        <Route path="places" component={PlacesMap} />
        <Route path="directions" component={DirectionsMap} />
      </Route>
      <Route path="home" component={Home} />
      <Route path="place/:placeId" component={Place} />
      <Route path="profile">
        <IndexRoute component={Profile} />
        <Route path="edit" component={EditProfile} />
        <Route path="statistics" component={ProfileStatistics} />
      </Route>
      <Route path="rating" component={Rating} />
      <Route path="admin" component={Admin}>
        <IndexRedirect to="places" />
        <Route path="places" component={AdminPlaces} />
        <Route path="users" component={AdminUsers} />
        <Route path="rating" component={AdminRating} />
      </Route>
    </Route>
    <Route path="registration" component={Registration} />
    <Route path="login" component={Login} />
  </Route>
);

export default routes;