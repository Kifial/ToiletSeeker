const createPlaceModal = (
  state = {
    addressInput: '',
    latInput: '',
    lngInput: '',
    nameInput: '',
    tagsInput: '',
    addressDisabled: false,
    coordsDisabled: false,
    addressCoords: {},
    vicinity: '',
    open: false,
    requesting: false,
    errors: {
      addressInput: false,
      latInput: false,
      lngInput: false,
      nameInput: false,
      tagsInput: false
    }
  },
  action
) => {
  switch(action.type) {
    case 'CREATE_PLACE_MODAL_OPEN':
      return Object.assign({}, state, { open: true });
    case 'CREATE_PLACE_MODAL_CLOSE':
      return Object.assign({}, state, { open: false });
    case 'CREATE_PLACE_MODAL_HANDLE_INPUT':
      if (action.name === 'addressInput' && action.value !== '') {
        return Object.assign({}, state, {
          [action.name]: action.value,
          errors: Object.assign({}, state.errors, {
            addressInput: false,
            latInput: false,
            lngInput: false
          }),
          coordsDisabled: true
        });
      }
      if (action.name === 'addressInput' && action.value === '') {
        return Object.assign({}, state, {
          [action.name]: action.value,
          errors: Object.assign({}, state.errors, {
            addressInput: false,
            latInput: false,
            lngInput: false
          }),
          coordsDisabled: false
        });
      }
      if (
        (action.name === 'latInput' || action.name === 'lngInput')
        && action.value !== ''
      ) {
        return Object.assign({}, state, {
          [action.name]: action.value,
          errors: Object.assign({}, state.errors, {
            addressInput: false,
            latInput: false,
            lngInput: false
          }),
          addressDisabled: true
        });
      }
      if (action.name === 'latInput' && action.value === '') {
        if (state.lngInput === '') {
          return Object.assign({}, state, {
            [action.name]: action.value,
            errors: Object.assign({}, state.errors, {
              addressInput: false,
              latInput: false,
              lngInput: false
            }),
            addressDisabled: false
          });
        }
      }
      if (action.name === 'lngInput' && action.value === '') {
        if (state.latInput === '') {
          return Object.assign({}, state, {
            [action.name]: action.value,
            errors: Object.assign({}, state.errors, {
              addressInput: false,
              latInput: false,
              lngInput: false
            }),
            addressDisabled: false
          });
        }
      }
      return Object.assign({}, state, {
        [action.name]: action.value,
        errors: Object.assign({}, state.errors, {
          [action.name]: false
        }),
      });
    case 'CREATE_PLACE_MODAL_SET_ADDRESS_COORDS':
      return Object.assign({}, state, {
        addressCoords: action.coords,
        vicinity: action.vicinity
      });
    case 'CREATE_PLACE_MODAL_REQUESTING':
      return Object.assign({}, state, {
        requesting: true
      });
    case 'CREATE_PLACE_MODAL_SUCCESS':
      return Object.assign({}, state, {
        addressInput: '',
        latInput: '',
        lngInput: '',
        nameInput: '',
        tagsInput: '',
        addressDisabled: false,
        coordsDisabled: false,
        addressCoords: {},
        vicinity: '',
        open: false,
        requesting: false
      });
    case 'CREATE_PLACE_MODAL_SET_ERRORS':
      return Object.assign({}, state, {
        errors: action.errors
      });
    default:
      return state;
  }
};

export default createPlaceModal;