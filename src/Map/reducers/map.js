import { setMarkersData, setClosestMarkers, setCurrentPosition } from '../actions/map';

const map = (
  state = {
    allMarkers: [],
    markers: [],
    selectedMarker: '',
    routes: {},
    mapCenter: {
      lat: 50.001786, lng: 36.306093
    },
    directionsActive: false,
    directionsStep: 0,
    directionsCoords: [],
    firstStepSnackbar: false,
    secondStepSnackbar: false,
    directions: '',
    onlyClosestPlaces: false,
    circles: [],
    userPosition: {},
    checkIn: false,
    checkInSuccess: false,
    checkInSuccessMessage: ''
  },
  action
) => {
  let markers,
    selectedMarker,
    coords = {};
  switch(action.type) {
    case 'MAP_CREATE_PLACE':
      return Object.assign({}, state, {
        allMarkers: [
          ...state.markers,
          Object.assign({}, action.data, { showInfo: false })
        ],
        markers: [
          ...state.markers,
          Object.assign({}, action.data, { showInfo: false })
        ],
        mapCenter: {
          lat: action.data.coords.lat,
          lng: action.data.coords.lng
        }
      });
    case 'MAP_SET_MARKERS':
      markers = setMarkersData(action.map, action.data.markers);
      return Object.assign({}, state, {
        markers,
        allMarkers: markers
      });
    case 'MAP_SET_MARKER_DISTANCE_TO_USER':
      markers = state.markers.map(item => {
        if (item.id === action.marker.id) {
          return Object.assign({}, item , {
            distanceToUser: action.data
          });
        }
        return item;
      });
      return Object.assign({}, state, {
        markers
      });
    case 'MAP_HANDLE_MARKER_CLICK':
      selectedMarker = '';
      markers = state.markers.map(item => {
        if (item.id === action.marker.id) {
          selectedMarker = item.id;
          return Object.assign({}, item, {
            showInfo: true
          });
        }
        return Object.assign({}, item, { showInfo: false });
      });
      return Object.assign({}, state, {
        markers,
        selectedMarker
      });
    case 'MAP_HANDLE_MARKER_CLOSE':
      return Object.assign({}, state, {
        markers: state.markers.map(item => {
          if (item.id === action.marker.id) {
            return Object.assign({}, item, { showInfo: false });
          }
          return item;
        }),
        selectedMarker: '',
        checkIn: false
      });
    case 'MAP_START_MAKING_DIRECTION':
      return Object.assign({}, state, {
        directionsActive: true,
        directionsStep: 1,
        firstStepSnackbar: true,
        directions: '',
        onlyClosestPlaces: false,
        markers: state.allMarkers
      });
    case 'MAP_RESET_MAKING_DIRECTION':
      return Object.assign({}, state, {
        directionsActive: false,
        directionsStep: 0,
        firstStepSnackbar: false
      });
    case 'MAP_DIRECTION_FIRST_STEP':
      return Object.assign({}, state, {
        directionsCoords: [ action.coords ],
        directionsStep: 2,
        firstStepSnackbar: false,
        secondStepSnackbar: true
      });
    case 'MAP_DIRECTION_SECOND_STEP':
      return Object.assign({}, state, {
        directions: action.direction,
        directionsCoords: [
          ...state.directionsCoords,
          action.coords
        ],
        directionsStep: 0,
        directionsActive: false,
        secondStepSnackbar: false
      });
    case 'MAP_MAKE_DIRECTION':
      return Object.assign({}, state, {
        directions: action.direction,
        directionsStep: 0,
        directionsActive: false,
        secondStepSnackbar: false,
        firstStepSnackbar: false
      });
    case 'MAP_CLOSE_FIRST_STEP_SNACKBAR':
      return Object.assign({}, state, {
        firstStepSnackbar: false
      });
    case 'MAP_CLOSE_SECOND_STEP_SNACKBAR':
      return Object.assign({}, state, {
        secondStepSnackbar: false
      });
    case 'MAP_SHOW_CLOSEST_PLACES':
      //let circles = setCircles(state.allMarkers);
      markers = setClosestMarkers(state.directions.routes[0].overview_path, state.allMarkers);
      return Object.assign({}, state, {
        markers,
        //circles,
        onlyClosestPlaces: true
      });
    case 'MAP_RESET_CLOSEST_PLACES':
      return Object.assign({}, state, {
        markers: state.allMarkers,
        onlyClosestPlaces: false
      });
    case 'MAP_SET_CURRENT_POSITION':
      let circle = setCurrentPosition(action.position);
      return Object.assign({}, state, {
        userPosition: {
          lat: action.position.coords.latitude,
          lng: action.position.coords.longitude
        },
        circles: [ circle ]
      });
    case 'MAP_ENABLE_CHECK_IN':
      return Object.assign({}, state, {
        checkIn: true
      });
    case 'MAP_DISABLE_CHECK_IN':
      return Object.assign({}, state, {
        checkIn: false
      });
    case 'MAP_CHECK_IN_SUCCESS':
      return Object.assign({}, state, {
        checkInSuccess: true,
        checkInSuccessMessage: action.data
      });
    case 'MAP_CLOSE_CHECK_IN_SNACKBAR':
      return Object.assign({}, state, {
        checkInSuccess: false,
        checkInSuccessMessage: ''
      });
    case 'MAP_HANDLE_UNMOUNT':
      return Object.assign({}, state, {
        selectedMarker: '',
        checkIn: false
      });
    case 'MAP_SEARCH_HANDLE_REQUEST':
      markers = state.allMarkers.filter((marker, i) => {
        if (i === action.index) {
          coords = marker.coords;
          return true;
        }
        return false;
      });
      return Object.assign({}, state, {
        markers,
        mapCenter: coords
      });
    case 'MAP_SEARCH_HANDLE_INPUT':
      if (action.value === '') {
        return Object.assign({}, state, {
          markers: state.allMarkers
        });
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default map;