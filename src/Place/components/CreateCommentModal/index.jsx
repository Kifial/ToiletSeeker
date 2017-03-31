import React from 'react';
import { connect } from 'react-redux';
import { submitCreateComment } from '../../actions/api';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

require('./index.scss');

const propTypes = {
  text: React.PropTypes.string,
  requesting: React.PropTypes.bool,
  open: React.PropTypes.bool,
  placeId: React.PropTypes.string,
  ratingFields: React.PropTypes.array,
  errors: React.PropTypes.object
};

class CreateCommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.setErrors = this.setErrors.bind(this);
  }
  closeModal() {
    this.props.dispatch({
      type: 'CREATE_COMMENT_MODAL_CLOSE'
    });
  }
  handleInput(e) {
    this.props.dispatch({
      type: 'CREATE_COMMENT_MODAL_HANDLE_INPUT',
      name: e.target.name,
      value: e.target.value
    });
  }
  handleSelectChange(id, value) {
    this.props.dispatch({
      type: 'CREATE_COMMENT_MODAL_SELECT_CHANGE',
      value: value + 1,
      id
    });
  }
  setErrors() {
    const errors = {
      text: false
    };
    if (this.props.text === '') {
      errors.text = true;
    }
    this.props.dispatch({
      type: 'CREATE_COMMENT_MODAL_SET_ERRORS',
      errors
    });
  }
  handleSubmit() {
    if (this.props.text !== '') {
      this.props.dispatch(submitCreateComment({
        placeId: this.props.placeId,
        text: this.props.text,
        ratingFields: this.props.ratingFields
      }));
    } else {
      this.setErrors();
    }
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
      />,
    ];
    return (
      <Dialog
        title="Create comment"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.closeModal}
      >
        <div className="create-comment-modal">
          <div className="create-comment-modal__selects-box">
            {this.props.ratingFields.map((item, i) =>
              <div
                key={item.id}
                className="create-comment-modal__select"
              >
                <div className="create-comment-modal__select-label">{item.name}</div>
                <SelectField
                  value={this.props.ratingFields[i].value}
                  onChange={(e, key) => this.handleSelectChange(item.id, key, e)}
                >
                  <MenuItem value={1} primaryText="Terrible" />
                  <MenuItem value={2} primaryText="Bad" />
                  <MenuItem value={3} primaryText="I saw better" />
                  <MenuItem value={4} primaryText="Will visit again" />
                  <MenuItem value={5} primaryText="Beautiful place" />
                </SelectField>
              </div>
            )}
          </div>
          <textarea
            name="text"
            className={'create-comment-modal__text ' + (this.props.errors.text ? 'create-comment-modal__text--error' : '')}
            placeholder="Type comment text here"
            value={this.props.text}
            onChange={this.handleInput}
            autoFocus="true"
          />
        </div>
      </Dialog>
    )
  }
}

CreateCommentModal.propTypes = propTypes;

const mapStateToProps = (state) => {
  const modal = state.modals.createCommentModal;
  return {
    text: modal.text,
    requesting: modal.requesting,
    open: modal.open,
    errors: modal.errors
  }
};

CreateCommentModal = connect(
  mapStateToProps
)(CreateCommentModal);

export default CreateCommentModal;