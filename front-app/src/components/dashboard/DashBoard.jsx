import { useEffect } from "react";
import "./DashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { newNews } from "../../static/Api";
import axios from "axios";
import { addNews } from "../../services/News";

const DashBoard = () => {
    const isLoggedIn = useSelector((state) => state.authGuard.isAuthenticated);
    const token = useSelector((state) => state.authGuard.bearerToken);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            console.log("Alreday logged in user");
        } else {
            navigate("/login");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        let payload = {
            title: formJson.title,
            messageBody: formJson.body
        };

        saveNews(payload);
    }

    const saveNews = async (payload) => {
        await axios.post(newNews, payload, {
            headers:{
                "Authorization" : "Bearer "+token.data,
                "Content-Type": "application/json"
            }
        }).then((data)=>{
            if(data.data.info==="News was saved successfully"){
                alert("News was saved successfully");
            }else {
                alert("News wasn't saved successfully");
            }
        }).catch(err=>console.error(err));
    }

    return (
        <div className="dashboard">
            <div className="container user-home">
                <div className="d-flex user-modules">
                    <div className="container">
                        <div className="d-flex flex-column justify-content-center.align-items-center">
                            <div className="container">
                                <div className="d-flex justify-content-center align-items-center">
                                    <h1>Make your new post</h1>
                                </div>
                            </div>

                            {/* <!-- This section will contain the create post part --> */}
                            <div className="section" id="contribution">
                                <div className="container dashboard-box">
                                    <form className="dashboard-form" onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleHeader" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="exampleHeader" name="title" maxLength={100} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleTopic" className="form-label">Topic</label>
                                            <textarea className="form-control sample-text-area" id="floatingTextarea" name="body" maxLength={1000}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <input type="file" className="form-control" id="supportingFile" />
                                        </div>
                                        <button type="submit" className="btn btn-dark dashboard-button">Submit</button>
                                        <div className="pb-2"></div>
                                        <a href="/logout" className="btn btn-dark dashboard-button">Logout</a>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {
    DashBoard,
}