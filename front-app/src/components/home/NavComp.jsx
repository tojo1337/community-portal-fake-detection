import { useState } from "react";
import "./NavComp.css";

const NavComp = () => {
    const [chat, setChat] = useState("none");
    const [chatButton, setChatButton] = useState("chat");
    const [latest, setLatest] = useState("none");
    const [latestButton, setLatestButton] = useState("latest");

    const toggleChat = () => {
        setLatest("none");
        setLatestButton("latest");
        if (chat === "none") {
            setChat("block");
            setChatButton("x");
        } else {
            setChat("none");
            setChatButton("chat");
        }
    }

    const toggleLatest = () => {
        setChat("none");
        setChatButton("chat");
        if (latest === "none") {
            setLatest("block");
            setLatestButton("x");
        } else {
            setLatest("none");
            setLatestButton("latest");
        }
    }

    return (
        <div className="nav-comp">
            <nav class="navbar navbar-expand-lg bg-body-tertiary sample-nav">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link my-nav-link" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link my-nav-link" href="#">News</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link my-nav-link" href="#">Video</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link my-nav-link" href="#">Images</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <a href="/login" className="btn btn-outline-light me-2 btn-sample">Login</a>
                            <a href="/register" className="btn btn-outline-light me-2 btn-sample">Registration</a>
                        </div>
                    </div>
                </div>
            </nav>
            
            <div className="side-bar">
                {/* Chat dialogue */}
                <div className="dialogue-box" id="chat-box" style={{ display: chat }}>
                    <h4>Global chat</h4>
                    <div className="chat-entry">
                        {/* All the chat data will be rendered here */}
                    </div>
                    <form>
                        <div class="mb-3">
                            <input type="text" class="form-control my-input" id="exampleInputText1" aria-describedby="textHelp" />
                        </div>
                    </form>
                </div>

                {/* Current news dialogue */}
                <div className="dialogue-box" id="latest-box" style={{ display: latest }}>
                    <h4>Current news</h4>
                    <div className="news-entry">
                        {/* All the current news will be fetched in this div */}
                    </div>
                </div>
            </div>

            {/* Footer element */}
            <div className="footer">
                <div class="d-flex flex-row-reverse" id="btn-items">
                    <button className="btn btn-outline-light btn-sample" onClick={toggleChat}>{chatButton}</button>
                    <button className="btn btn-outline-light btn-sample" onClick={toggleLatest}>{latestButton}</button>
                </div>
            </div>
        </div>
    )
}

export {
    NavComp,
}