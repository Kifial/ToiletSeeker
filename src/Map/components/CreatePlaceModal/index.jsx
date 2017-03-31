import React from 'react';
import { connect } from 'react-redux';
import { submitCreatePlaceModal } from '../../actions/modal';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SearchBox from '../SearchBox/index.jsx';

const propTypes = {
  addressInput: React.PropTypes.string,
  latInput: React.PropTypes.string,
  lngInput: React.PropTypes.string,
  nameInput: React.PropTypes.string,
  tagsInput: React.PropTypes.string,
  addressDisabled: React.PropTypes.bool,
  vicinity: React.PropTypes.string,
  coordsDisabled: React.PropTypes.bool,
  addressCoords: React.PropTypes.object,
  open: React.PropTypes.bool,
  errors: React.PropTypes.object
};

class CreatePlaceModal extends React.Component {
  constructor(props) {
    super(props);
    this.submitModal = this.submitModal.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleAddressSelection = this.handleAddressSelection.bind(this);
    this.handleRequired = this.handleRequired.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }
  closeModal() {
    this.props.dispatch({
      type: 'CREATE_PLACE_MODAL_CLOSE'
    });
  }
  handleInput(e) {
    this.props.dispatch({
      type: 'CREATE_PLACE_MODAL_HANDLE_INPUT',
      name: e.target.name,
      value: e.target.value
    });
  }
  handleAddressSelection(coords, vicinity) {
    this.props.dispatch({
      type: 'CREATE_PLACE_MODAL_SET_ADDRESS_COORDS',
      coords,
      vicinity
    });
  }
  handleRequired() {
    if (
      (this.props.addressInput !== ''
      || (this.props.latInput !== '' && this.props.lngInput !== ''))
      && this.props.nameInput !== ''
      && this.props.tagsInput !== ''
    ) {
      return true;
    }
    return false;
  }
  handleErrors() {
    const errors = {
      addressInput: false,
      latInput: false,
      lngInput: false,
      nameInput: false,
      tagsInput: false
    };
    if (!this.props.addressDisabled && this.props.addressInput === '') {
      errors.addressInput = true;
    }
    if (!this.props.coordsDisabled && this.props.latInput === '') {
      errors.latInput = true;
    }
    if (!this.props.coordsDisabled && this.props.lngInput === '') {
      errors.lngInput = true;
    }
    if (this.props.nameInput === '') {
      errors.nameInput = true;
    }
    if (this.props.tagsInput === '') {
      errors.tagsInput = true;
    }
    this.props.dispatch({
      type: 'CREATE_PLACE_MODAL_SET_ERRORS',
      errors
    });
  }
  submitModal() {
    if (this.handleRequired()) {
      this.props.dispatch(submitCreatePlaceModal());
    } else {
      this.handleErrors();
    }
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        style={{
          margin: '0 10px 0 0'
        }}
        onClick={this.closeModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.submitModal}
      />,
    ];
    return (
      <Dialog
        title="Create Place"
        actions={actions}
        modal={true}
        open={this.props.open}
        contentStyle={{ width: '460px', maxWidth: 'none' }}
      >
        <div className="create-place-modal">
          <div className="create-place-modal__input-row">
            <SearchBox
              name="addressInput"
              className={'ui-input ' + (this.props.errors.addressInput ? 'ui-input--error' : '')}
              placeholder="Type address"
              value={this.props.addressInput}
              handleInput={this.handleInput}
              disabled={this.props.addressDisabled}
              onSelect={this.handleAddressSelection}
            />
          </div>
          <div className="create-place-modal__input-row">
            <input
              type="text"
              name="latInput"
              className={'ui-input ' + (this.props.errors.latInput ? 'ui-input--error' : '')}
              placeholder="Type lat coord"
              value={this.props.latInput}
              onChange={this.handleInput}
              disabled={this.props.coordsDisabled}
            />
          </div>
          <div className="create-place-modal__input-row">
            <input
              type="text"
              name="lngInput"
              className={'ui-input ' + (this.props.errors.lngInput ? 'ui-input--error' : '')}
              placeholder="Type lng coord"
              value={this.props.lngInput}
              onChange={this.handleInput}
              disabled={this.props.coordsDisabled}
            />
          </div>
          <div className="create-place-modal__input-row">
            <input
              type="text"
              name="nameInput"
              className={'ui-input ' + (this.props.errors.nameInput ? 'ui-input--error' : '')}
              placeholder="Type name of the place"
              value={this.props.nameInput}
              onChange={this.handleInput}
            />
          </div>
          <div className="create-place-modal__input-row">
            <input
              type="text"
              name="tagsInput"
              className={'ui-input ' + (this.props.errors.tagsInput ? 'ui-input--error' : '')}
              placeholder="Type tags"
              value={this.props.tagsInput}
              onChange={this.handleInput}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

CreatePlaceModal.propTypes = propTypes;

const mapStateToProps = (state) => {
  const modal = state.modals.createPlaceModal;
  return {
    addressInput: modal.addressInput,
    latInput: modal.latInput,
    lngInput: modal.lngInput,
    nameInput: modal.nameInput,
    tagsInput: modal.tagsInput,
    addressDisabled: modal.addressDisabled,
    vicinity: modal.vicinity,
    coordsDisabled: modal.coordsDisabled,
    addressCoords: modal.addressCoords,
    open: modal.open,
    errors: modal.errors
  }
};

CreatePlaceModal = connect(
  mapStateToProps
)(CreatePlaceModal);

export default CreatePlaceModal;