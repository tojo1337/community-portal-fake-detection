import { useEffect, useState } from "react";
import "./AdminPanel.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { delNews, delUser, isAdmid } from "../../static/Api";
import { setNews } from "../../services/News";

const AdminPanel = () => {
    const [userDisplay, setUserDisplay] = useState("block");
    const [newsDisplay, setNewsDisplay] = useState("none");
    const [newsArr, setNewsArr] = useState([]);
    const [userArr, setUserArr] = useState([]);

    const newsList = useSelector(state => state.news.value);
    const bearer = useSelector(state => state.authGuard.bearerToken);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        if (bearer.length === 0) {
            navigate("/");
        } else {
            isUserAdmin = false;
            axios.get(isAdmid)
                .then((data) => {
                    isUserAdmin = data.isAdmin;
                })
                .catch(err => {
                    console.error(err)
                });
            if(!isUserAdmin){
                navigate("/");
            }
            let arr = [...newsList];
            setNewsArr(arr);
        }
    }, []);

    const userDelete = (e,id)=>{
        let arr = [...userArr];
        let temp = [];
        for(let i=0;i<arr.length;i++){
            if(arr[i].id===id){
                continue;
            }else {
                temp.push(arr[i]);
            }
        }
        setUserArr(temp);
        axios.get(delUser+id).catch(err=>console.error(err));
    }

    const newsDelete = (e,id)=>{
        let arr = [...newsArr];
        let temp = [];
        for(let i=0;i<arr.length;i++){
            if(arr[i].id===id){
                continue;
            }else {
                temp.push(arr[i]);
            }
        }
        setNewsArr(temp);
        axios.get(delNews+id).catch(err=>console.error(err));
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
            let listItem = arr.map((data,index) => {
                return (
                    <li key={index}>
                        <div className="admin-card">
                            <div className="admin-item">
                                {data.id}. {data.title}
                            </div>
                            <div className="admin-item">
                                <button className="btn btn-outline-danger text-white" onClick={(e)=>{newsDelete(e,data.id)}}>remove news</button>
                            </div>
                        </div>
                    </li>
                )
            });
            return (
                <ul>{listItem}</ul>
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
            let retUser = arr.map((data,index) => {
                return (
                    <li key={index}>
                        <div className="admin-card">
                            <div className="admin-item">
                                {data.id}. {data.email}
                            </div>
                            <div className="admin-item">
                                <button className="btn btn-outline-danger text-white" onClick={(e)=>{delUser(e,data.id)}}>remove user</button>
                            </div>
                        </div>
                    </li>
                )
            });
            return (
                <ul>{retUser}</ul>
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
            <ul class="nav nav-underline pl-2">
                <li class="nav-item">
                    <button class="nav-link hover:text-gray-200" onClick={showUser}>Users</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link hover:text-gray-200" onClick={showNews}>News</button>
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