import { useEffect } from "react";
import "./DashBoard.css";
import { useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

const DashBoard = () => {
    const isLoggedIn = useSelector((state) => state.authGuard.isAuthenticated);
    const token = useSelector((state) => state.authGuard.bearerToken);

    const navigate = useNavigate();

    useEffect(() => {
        // if (isLoggedIn === true) {
        //     console.log("Alreday logged in user");
        // } else {
        //     navigate("/login");
        // }
    }, [isLoggedIn, navigate]);

    return (
        <div className="dashboard">
            <div class="container user-home">
                <div class="d-flex user-modules">
                    <div class="container">
                        <div class="d-flex flex-column justify-content-center.align-items-center">
                            <div class="container">
                                <div class="d-flex justify-content-center align-items-center">
                                    <h1>Make your new post</h1>
                                </div>
                            </div>

                            {/* <!-- This section will contain the create post part --> */}
                            <div class="section" id="contribution">
                                <div class="container dashboard-box">
                                    <form className="dashboard-form">
                                        <div class="mb-3">
                                            <label for="exampleHeader" class="form-label">Title</label>
                                            <input type="text" class="form-control" id="exampleHeader" />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleTopic" class="form-label">Topic</label>
                                            <textarea class="form-control sample-text-area" id="floatingTextarea"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <input type="file" class="form-control" id="supportingFile" />
                                        </div>
                                        <button type="submit" class="btn btn-dark dashboard-button">Submit</button>
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