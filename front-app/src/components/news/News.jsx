import { useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useEffect } from 'react';
import "./News.css"
import { useSelector } from 'react-redux';
import { newsRate } from '../../static/Api';

const News = ()=> {

  const items = [];
  const newsList = useSelector(state=>state.votedNews.value);

  useEffect(() => {
    let arr = [...newsList];
  }, []);

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <a href={"/news/"+item.id} className='news-item'><h3>{item.title}</h3></a>
          ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = event.selected * itemsPerPage % items.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    };

    return (
      <div className='container'>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Items currentItems={currentItems} />
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={0}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="paginate">
      <nav class="navbar bg-body-tertiary news-nav">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Navbar</span>
          <form class="d-flex" role="search">
            <input class="form-control me-1" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <PaginatedItems itemsPerPage={10} />
    </div>
  )
}

export {
    News,
}
