import React from 'react';
import { connect } from 'react-redux';
import { submitAddRatingField } from '../../actions/api';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

require('./index.scss');

const propTypes = {
  text: React.PropTypes.string,
  open: React.PropTypes.bool,
  requesting: React.PropTypes.bool,
  errors: React.PropTypes.object
};

class AddRatingModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.setErrors = this.setErrors.bind(this);
  }
  setErrors() {
    const errors = {
      text: false
    };
    if (this.props.text === '') {
      errors.text = true;
    }
    this.props.dispatch({
      type: 'ADMIN_ADD_RATING_MODAL_SET_ERRORS',
      errors
    });
  }
  handleSubmit() {
    if (this.props.text !== '') {
      this.props.dispatch(submitAddRatingField({
        text: this.props.text
      }));
    } else {
      this.setErrors();
    }
  }
  handleClose() {
    this.props.dispatch({
      type: 'ADMIN_ADD_RATING_MODAL_CLOSE'
    });
  }
  handleInput(e) {
    this.props.dispatch({
      type: 'ADMIN_ADD_RATING_MODAL_HANDLE_INPUT',
      name: e.target.name,
      value: e.target.value
    });
  }
  get actions() {
    return [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
      />
    ]
  }
  render() {
    return (
      <Dialog
        title="Add rating field"
        actions={this.actions}
        open={this.props.open}
        modal={false}
        onRequestClose={this.handleClose}
      >
        <input
          type="text"
          className={'ui-input ' + (this.props.errors.text ? 'ui-input--error' : '')}
          name="text"
          placeholder="Type rating field name here"
          value={this.props.text}
          onChange={this.handleInput}
          autoFocus="true"
        />
      </Dialog>
    )
  }
}

AddRatingModal.propTypes = propTypes;

const mapStateToProps = (state) => {
  const modal = state.modals.addRatingModal;
  return {
    text: modal.text,
    open: modal.open,
    requesting: modal.requesting,
    errors: modal.errors
  }
};

AddRatingModal = connect(
  mapStateToProps
)(AddRatingModal);

export default AddRatingModal;