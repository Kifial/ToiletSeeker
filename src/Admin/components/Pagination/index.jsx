import React from 'react';
import { connect } from 'react-redux';
import { getPlaces, getUsers } from '../../actions/api';
import PaginationItem from '../PaginationItem/index.jsx';
import PaginationDots from '../PaginationDots/index.jsx';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

require('./index.scss');

const propTypes = {
  route: React.PropTypes.string,
  paginationPagesCount: React.PropTypes.number,
  paginationPage: React.PropTypes.number,
  pagesCount: React.PropTypes.number
};

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleArrowLeftClick = this.handleArrowLeftClick.bind(this);
    this.handleArrowRightClick = this.handleArrowRightClick.bind(this);
    this.getItems = this.getItems.bind(this);
  }
  getItems(page) {
    switch(this.props.route) {
      case 'places':
        return getPlaces(page);
      case 'users':
        return getUsers(page);
      default:
        break;
    }
  }
  handlePageClick(page) {
    this.props.dispatch(this.getItems(page));
  }
  handleArrowLeftClick() {
    this.props.dispatch(this.getItems(this.props.paginationPage - 1));
  }
  handleArrowRightClick() {
    this.props.dispatch(this.getItems(this.props.paginationPage + 1));
  }
  render() {
    return (
      <div className="pagination">
        <div className="pagination__content">
          {this.props.paginationPage !== 1 ?
            <div
              className="pagination__arrow"
              onClick={this.handleArrowLeftClick}
            >
              <ArrowLeft />
            </div> :
            ''
          }
          <div className="pagination__pages">
            {this.props.pages.map((item, i) => {
              if (item === '..') {
                return <PaginationDots key={i} />
              }
              return (
                <PaginationItem
                  key={i}
                  value={item}
                  handleClick={() => this.handlePageClick(item)}
                  active={item === this.props.paginationPage}
                />
              )
            })}
          </div>
          {this.props.paginationPage !== this.props.pagesCount ?
            <div
              className="pagination__arrow"
              onClick={this.handleArrowRightClick}
            >
              <ArrowRight />
            </div> :
            ''
          }
        </div>
      </div>
    )
  }
}

Pagination.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    route: state.admin.currentTab,
    pages: state.admin.paginationPages,
    paginationPage: state.admin.paginationPage,
    pagesCount: state.admin.pagesCount
  }
};

Pagination = connect(
  mapStateToProps
)(Pagination);

export default Pagination;