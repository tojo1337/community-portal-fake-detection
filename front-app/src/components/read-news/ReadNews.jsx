import { useParams } from "react-router-dom"
import "./ReadNews.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { newsRate } from "../../static/Api";
import { useSelector } from "react-redux";

const ReadNews = () => {
    const { newsId } = useParams();
    const newsList = useSelector(state => state.votedNews.value);
    const [scoreVal, setScoreVal] = useState({});
    const [news, setNews] = useState({});

    useEffect(() => {
        let arr = newsList;
        for (let news in arr) {
            if (news.id === newsId) {
                setNews(news);
            }
        }
        axios.get(newsRate + newsId)
            .then(data => setScoreVal(data))
            .catch(err => console.err(err));
    }, []);

    if (news.title === undefined) {
        return (
            <div className="page">
                <div className="card">
                    <h4>News item does not exist</h4>
                </div>
            </div>
        )
    } else {
        return (
            <div className="page d-flex justify-content-center align-items-center ">
                <div className="card">
                    <div className="card-item">
                        <h4>{news.title}</h4>
                    </div>
                    <hr />
                    <div className="card-item">
                        <p>{news.newsBody}</p>
                    </div>
                    <hr />
                    <div className="card-item">
                        News ratings : {scoreVal.value}
                    </div>
                    <hr />
                    <div className="card-item">
                        <a href="/news" className="btn-primary">return</a>
                    </div>
                </div>
            </div>
        )
    }
}

export {
    ReadNews,
}