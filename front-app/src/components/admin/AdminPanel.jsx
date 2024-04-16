import { useEffect, useState } from "react";
import "./AdminPanel.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { delNews, delUser, isAdmid, userList } from "../../static/Api";
import { setNews } from "../../services/News";

const AdminPanel = () => {
    const [userDisplay, setUserDisplay] = useState("block");
    const [newsDisplay, setNewsDisplay] = useState("none");
    const [newsArr, setNewsArr] = useState([]);
    const [userArr, setUserArr] = useState([]);

    const newsList = useSelector(state => state.news.value);
    const bearer = useSelector(state => state.authGuard.bearerToken);
    const adminStat = useSelector(state=> state.authGuard.admin);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        if(adminStat===false){
            navigate("/");
        }
        let newsItems = [...newsList];
        setNewsArr(newsItems);
        fillUserList(bearer.data);
    }, []);

    const fillUserList = async (tok)=> {
        await axios.get(userList, {
            headers: {
                "Authorization": "Bearer "+tok
            }
        }).then((data)=>{
            let userList = [...data.data];
            console.log(userList);
            setUserArr(userList);
        }).catch((err)=>{
            console.error(err);
        });
    }

    const userDelete = (e, id) => {
        let arr = [...userArr];
        let temp = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                continue;
            } else {
                temp.push(arr[i]);
            }
        }
        console.log(delUser+id);
        setUserArr(temp);
        axios.get(delUser+id,{headers:{"Authorization":"Bearer "+bearer.data}}).catch(err => console.error(err));
    }

    const newsDelete = (e, id) => {
        let arr = [...newsArr];
        let temp = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                continue;
            } else {
                temp.push(arr[i]);
            }
        }
        setNewsArr(temp);
        axios.get(delNews + id,{headers:{"Authorization":"Bearer "+bearer.data}}).catch(err => console.error(err));
        dispatch(setNews(temp));
    }

    const NewsList = () => {
        let arr = [...newsArr];
        if (arr.length === 0) {
            return (
                <div className="admin-card">
                    <div className="admin-item">
                        No news found
                    </div>
                </div>
            )
        } else {
            let listItem = arr.map((data, index) => {
                return (
                    <li key={index} className="list-none pb-1">
                        <div className="admin-card">
                            <div className="admin-item">
                                {data.id}. {data.title}
                            </div>
                            <div className="admin-item">
                                <button className="btn btn-outline-danger text-white" onClick={(e) => { newsDelete(e, data.id) }}>remove news</button>
                            </div>
                        </div>
                    </li>
                )
            });
            return (
                <ul className="p-0">{listItem}</ul>
            )
        }
    }

    const UserList = () => {
        let arr = [...userArr];
        if (arr.length === 0) {
            return (
                <div className="admin-card">
                    <div className="admin-item">
                        No user found
                    </div>
                </div>
            )
        } else {
            let retUser = arr.map((data, index) => {
                return (
                    <li key={index} className="list-none pb-1" >
                        <div className="admin-card">
                            <div className="admin-item">
                                {data.id}. {data.email}
                            </div>
                            <div className="admin-item">
                                <button className="btn btn-outline-danger text-white" onClick={(e) => { userDelete(e, data.id) }}>remove user</button>
                            </div>
                        </div>
                    </li>
                )
            });
            return (
                <ul className="p-0">{retUser}</ul>
            )
        }
    }

    const showUser = () => {
        setNewsDisplay("none");
        setUserDisplay("block");
    }

    const showNews = () => {
        setNewsDisplay("block");
        setUserDisplay("none");
    }

    return (
        <div className="admin-panel">
            <ul className="nav nav-underline pl-2">
                <li className="nav-item">
                    <button className="nav-link hover:text-gray-200" onClick={showUser}>Users</button>
                </li>
                <li className="nav-item">
                    <button className="nav-link hover:text-gray-200" onClick={showNews}>News</button>
                </li>
            </ul>
            <hr />

            <div className="container">
                {/* Show all the users and perform crud over it */}
                <div className="user-list admin-block" style={{ display: userDisplay }}>
                    <UserList />
                </div>

                {/* Show all the news and perform crud over it */}
                <div className="admin-news-list admin-block" style={{ display: newsDisplay }}>
                    <NewsList />
                </div>
            </div>
        </div>
    )
}

export {
    AdminPanel
}