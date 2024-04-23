import { useParams } from "react-router-dom"
import "./ReadNews.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { newsRate,thresholdValue,voteForNews } from "../../static/Api";
import { useSelector } from "react-redux";
import Select from "react-select";

const ReadNews = () => {
    const { newsId } = useParams();

    const [scoreVal, setScoreVal] = useState();
    const [news, setNews] = useState({});
    const [rate, setRate] = useState(null);
    const [threshold, setThreshold] = useState(0);

    // Checks if the user is logged in
    const isLoggedIn = useSelector((state) => state.authGuard.isAuthenticated);
    const token = useSelector((state) => state.authGuard.bearerToken);
    const newsList = useSelector((state) => state.news.value);
    const email = useSelector((state) => state.authGuard.user);

    // There will be the rating options in here
    const options = [
        { label: "Five star", value: "FIVE_STAR" },
        { label: "Four star", value: "FOUR_STAR" },
        { label: "Three star", value: "THREE_STAR" },
        { label: "Two star", value: "TWO_STAR" },
        { label: "One star", value: "ONE_STAR" }
    ]

    const score_values = [
        { label: "FIVE_STAR", value: 5 },
        { label: "FOUR_STAR", value: 4 },
        { label: "THREE_STAR", value: 3 },
        { label: "TWO_STAR", value: 2 },
        { label: "ONE_STAR", value: 1 },
        { label: "ZERO_STAR", value: 0 }
    ]

    useEffect(() => {
        let arr = [...newsList];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == newsId) {
                setNews(arr[i]);
            }
        }
        axios.get(newsRate + newsId)
            .then(data => {
                for (let opt of score_values) {
                    if (opt.label === data.data.value) {
                        console.log(data.data);
                        setScoreVal(opt.value);
                    }
                }
            })
            .catch(err => console.err(err));

        axios.get(thresholdValue+newsId).then(data=>{
            setThreshold(data.data.threshold);
        }).catch(err=>console.error(err));
    }, []);

    const VotingModule = () => {
        const newsVote = (e) => {
            e.preventDefault();
            // Add a section to submit the ratings on the server
            let payload = {
                title: news.title,
                messageBody: news.messageBody,
                ratings: rate.value
            };

            console.log(payload);

            axios.post(voteForNews, payload, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token.data
                }
            }).catch(err => console.error(err));
        }

        if (isLoggedIn) {
            return (
                <div className="card-item">
                    <form onSubmit={newsVote} className="flex flex-col">
                        <span className="flex m-4">
                            <label htmlFor="cars">Choose a rate: </label>
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
                        <p>{news.messageBody}</p>
                    </div>
                    <hr />
                    <div className="card-item">
                        Percentage of negetivity : {threshold} %
                    </div>
                    <hr />
                    <div className="card-item">
                        News ratings : {scoreVal}
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