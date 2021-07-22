import React from 'react';
import "./pagination.scss"

const Pagination = ({ currentPage, handlePageChange, maxPagesCount }) => {

    return ( 
    <div className="pagination">
        <div className="pagination__control">
            <button disabled={currentPage === 0} onClick={() => handlePageChange(0)} className="pagination__btn">First</button>
            <button disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)} className="pagination__btn">Prev</button>
            <button disabled={currentPage === maxPagesCount} onClick={() => handlePageChange(currentPage + 1)} className="pagination__btn">Next</button>
            <button disabled={currentPage === maxPagesCount} onClick={() => handlePageChange(maxPagesCount)} className="pagination__btn">Last</button>
        </div>
        <div className="pagination__pageCount">
            {/* +1 due to index of 0 */}
            <p>{`page ${currentPage + 1} of ${maxPagesCount + 1}`}</p>
        </div>
      </div>
     );
}
 
export default Pagination;