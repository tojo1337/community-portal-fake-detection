import "./DashBoard.css";

const DashBoard = () => {
    return (
        <div className="dashboard">
            <div class="container user-home">
                <div class="d-flex user-modules">
                    <div class="container">
                        <div class="d-flex flex-column justify-content-center.align-items-center">
                            <div class="container">
                                <div class="d-flex justify-content-center align-items-center">
                                    <h1>Control panel</h1>
                                </div>
                            </div>

                            {/* <!-- This section will contain administrative parts such as whome to promote to moderator, do new post etc
                            <div class="section" id="administrative">
                                <div class="container box">Hello</div>
                            </div> --> */}

                            {/* <!-- This section will contain the create post part --> */}
                            <div class="section" id="contribution">
                                <div class="container dashboard-box">
                                    <h4>Make a new post</h4>
                                    <form className="dashboard-form">
                                        <div class="mb-3">
                                            <label for="exampleHeader" class="form-label">Title</label>
                                            <input type="text" class="form-control" id="exampleHeader" />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleTopic" class="form-label">Topic</label>
                                            <textarea class="form-control" id="floatingTextarea"></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <input type="file" class="form-control" id="supportingFile" />
                                        </div>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>

                            {/* <!-- This section will contain the voting part --> */}
                            <div class="section" id="votings">
                                <div class="container dashboard-box">
                                    <div class="container">
                                        <div class="d-flex flex-column">
                                            <h4>Recent posts</h4>
                                            <div class="posts">
                                                <div class="post">post 1</div>
                                                <div class="post">post 2</div>
                                                <div class="post">post 3</div>
                                                <div class="post">post 4</div>
                                                <div class="post">post 5</div>
                                                <div class="post">post 6</div>
                                                <div class="post">post 7</div>
                                                <div class="post">post 8</div>
                                                <div class="post">post 9</div>
                                            </div>
                                        </div>
                                    </div>
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