import { useState } from 'react'
import { useEffect } from 'react';
import "./News.css"
import { useSelector } from 'react-redux';

const News = () => {
  const [arr, setArr] = useState([]);
  const allNews = useSelector((state) => state.news.value);

  useEffect(() => {
    let tempArr = [...allNews];
    setArr(tempArr);
  }, []);

  const List = () => {
    let temp = [...arr];

    let listData = temp.map((data, index) => {
      return (
        <li key={index} className='list-none pb-1'>
          <div className="news-card">
            <h5>
              <a className='news-link' href={"/news/" + data.id}>{data.title}</a>
            </h5>
          </div>
        </li>
      )
    });


    if (listData.length === 0) {
      return (
        <div className="news-card">
          <h5>
            No data found
          </h5>
        </div>
      )
    } else {
      return(
        <ul className='p-0'>{listData}</ul>
      )
    }
  }

  return (
    <div className='news-container'>
      <div className="flex justify-center">
        <h3>News items</h3>
      </div>
      <hr />
      <div className="news-block">
        <List />
      </div>
    </div>
  )
}

export {
  News,
}
