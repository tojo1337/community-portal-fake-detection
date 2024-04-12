import { useParams } from "react-router-dom"
import "./ReadNews.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { newsRate } from "../../static/Api";
import { useSelector } from "react-redux";
import Select from "react-select";

const ReadNews = () => {
    const { newsId } = useParams();
    const newsList = useSelector(state => state.news.value);
    const [scoreVal, setScoreVal] = useState({});
    const [news, setNews] = useState({});
    const [rate, setRate] = useState(null);

    // Checks if the user is logged in
    const isLoggedIn = useSelector((state) => state.authGuard.isAuthenticated);
    const token = useSelector((state) => state.authGuard.bearerToken);

    // There will be the rating options in here
    const options = [
        { label: "Five star", value: 5 },
        { label: "Four star", value: 4 },
        { label: "Three star", value: 3 },
        { label: "Two star", value: 2 },
        { label: "One star", value: 1 }
    ]

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

    function handleSubmit(e) {
        console.log("Rating submitted");
        console.log(rate);
        // Add a section to submit the ratings on the server
    }

    const VotingModule = () => {
        const newsVote = (e) => {
            e.preventDefault();
        }

        if (isLoggedIn) {
            return (
                <div className="card-item">
                    <form onSubmit={handleSubmit} className="flex flex-col" method="post">
                        <span className="flex m-4">
                            <label for="cars">Choose a rate: </label>
                            <Select
                                value={rate}
                                onChange={setRate}
                                options={options}
                                className="text-black"
                            />
                        </span>
                        <button className="btn btn-primary">rate news</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className="card-item">
                    Login to vote
                </div>
            )
        }
    }

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
            <div className="page d-flex justify-content-center align-items-center overflow-scroll">
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
                    <VotingModule />
                    <hr />
                    <div className="card-item">
                        <a href="/news" className="btn btn-primary w-[100%]">return</a>
                    </div>
                </div>
            </div>
        )
    }
}

export {
    ReadNews,
}