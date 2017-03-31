import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const propTypes = {
  title: React.PropTypes.string.isRequired,
  onDeleteField: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool
};

class ConfirmDeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.closeConfirmDeleteModal = this.closeConfirmDeleteModal.bind(this);
    this.openConfirmDeleteModal = this.openConfirmDeleteModal.bind(this);
  }
  closeConfirmDeleteModal() {
    this.props.dispatch({
      type: 'ADMIN_CLOSE_CONFIRM_DELETE_MODAL'
    });
  }
  openConfirmDeleteModal() {
    this.props.dispatch({
      type: 'ADMIN_OPEN_CONFIRM_DELETE_MODAL'
    });
  }
  get confirmDeleteModalActions() {
    return [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeConfirmDeleteModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.props.onDeleteField}
      />
    ]
  }
  render() {
    return (
      <Dialog
        title={this.props.title}
        open={this.props.open}
        actions={this.confirmDeleteModalActions}
      />
    )
  }
}

ConfirmDeleteModal.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    open: state.admin.confirmDeleteModalOpen
  }
};

ConfirmDeleteModal = connect(
  mapStateToProps
)(ConfirmDeleteModal);

export default ConfirmDeleteModal;