const admin = (
  state = {
    places: [],
    users: [],
    ratingFields: [],
    selectedRatingFields: [],
    selectedUsersFields: [],
    selectedPlacesFields: [],
    currentTab: '',
    paginationPage: 1,
    paginationPagesCount: 0,
    paginationPages: [],
    pagesCount: 0,
    confirmDeleteModalOpen: false
  },
  action
) => {
  let fields = [];
  switch(action.type) {
    case 'ADMIN_SET_PLACES':
      return Object.assign({}, state, {
        places: action.data,
        paginationPages: action.pagination,
        paginationPage: action.page,
        pagesCount: action.pagesCount
      });
    case 'ADMIN_SET_USERS':
      return Object.assign({}, state, {
        users: action.data,
        paginationPages: action.pagination,
        paginationPage: action.page,
        pagesCount: action.pagesCount
      });
    case 'ADMIN_SET_RATING_FIELDS':
      return Object.assign({}, state, {
        ratingFields: action.data
      });
    case 'ADMIN_ADD_RATING_MODAL_SUCCESS':
      return Object.assign({}, state, {
        ratingFields: [
          ...state.ratingFields,
          action.data
        ]
      });
    case 'ADMIN_RATING_FIELD_SELECTED':
      fields = state.ratingFields.filter((item, i) => {
        for (let j = 0; j < action.data.length; j += 1) {
          if (action.data[j] === i) {
            return true;
          }
        }
        return false;
      });
      return Object.assign({}, state, {
        selectedRatingFields: fields
      });
    case 'ADMIN_USERS_FIELD_SELECTED':
      fields = state.users.filter((item, i) => {
        for (let j = 0; j < action.data.length; j += 1) {
          if (action.data[j] === i) {
            return true;
          }
        }
        return false;
      });
      return Object.assign({}, state, {
        selectedUsersFields: fields
      });
    case 'ADMIN_PLACES_FIELD_SELECTED':
      fields = state.places.filter((item, i) => {
        for (let j = 0; j < action.data.length; j += 1) {
          if (action.data[j] === i) {
            return true;
          }
        }
        return false;
      });
      return Object.assign({}, state, {
        selectedPlacesFields: fields
      });
    case 'ADMIN_DELETE_RATING_FIELDS':
      fields = state.ratingFields.filter(item => {
        if (action.data === item.id) {
          return false;
        }
        return true;
      });
      return Object.assign({}, state, {
        ratingFields: fields,
        selectedRatingFields: []
      });
    case 'ADMIN_DELETE_USER':
      fields = state.users.filter(item => {
        if (action.data === item.id) {
          return false;
        }
        return true;
      });
      return Object.assign({}, state, {
        users: fields,
        selectedUsersFields: []
      });
    case 'ADMIN_DELETE_PLACE':
      fields = state.places.filter(item => {
        if (action.data === item.id) {
          return false;
        }
        return true;
      });
      return Object.assign({}, state, {
        places: fields,
        selectedPlacesFields: []
      });
    case 'ADMIN_SET_CURRENT_TAB':
      return Object.assign({}, state, {
        currentTab: action.data
      });
    case 'ADMIN_CLEAR_PAGINATION':
      return Object.assign({}, state, {
        paginationPage: 1,
        paginationPagesCount: 0,
        paginationPages: [],
        pagesCount: 0
      });
    case 'ADMIN_CLOSE_CONFIRM_DELETE_MODAL':
      return Object.assign({}, state, {
        confirmDeleteModalOpen: false
      });
    case 'ADMIN_OPEN_CONFIRM_DELETE_MODAL':
      return Object.assign({}, state, {
        confirmDeleteModalOpen: true
      });
    default:
      return state;
  }
};

export default admin;