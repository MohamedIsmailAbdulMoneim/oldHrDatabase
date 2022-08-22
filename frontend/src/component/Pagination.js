import React, {Fragment} from "react";
import { connect } from "react-redux";
import BasicTable from './general/BasicTable'

const Pagination = (props) => {
  const pageLinks = [];
  const itemsPerPage = Math.ceil(props.pagesLength / 10)
  
  for (let i = 1; i < itemsPerPage; i++) {
    let active = props.currentPage === i ? 'active' : '';
    pageLinks.push(
      <a onClick={props.changargs(i)} className={`${active} page-link`} href="/#">
        {i}
      </a>
    );
  }


  return (
    <div className="pagination">
      <a onClick={props.minusFirstArg} href="/#">&raquo;</a>
      {pageLinks.slice(props.firstArgPerBtn,props.secondArgPerBtn).map(link => (
        <Fragment>
        {link}
        </Fragment>
      ))}
      <a onClick={props.plusSecondArg} href="/#">&laquo;</a>
    </div>
    

  );
};

const mapStateToProps = (state) => {
  return { posts: state.posts.items, length: state.posts.length, static: state.posts.static, sliced: state.posts.sliced };
};

export default connect(mapStateToProps, {})(Pagination);