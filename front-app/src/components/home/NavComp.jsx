import { useEffect, useState } from "react";
import "./NavComp.css";
import { over } from "stompjs";
import { useSelector } from "react-redux";
import { globalChatRoom, globalChatSend, wsUrl } from "../../static/Api";
import sockjs from "sockjs-client/dist/sockjs";

var stompClient = null;
const NavComp = () => {

    const [chat, setChat] = useState("none");
    const [chatButton, setChatButton] = useState("chat");
    const [latest, setLatest] = useState("none");
    const [latestButton, setLatestButton] = useState("latest");
    const [chatLogs, setChatLogs] = useState([]);

    const userName = useSelector(state => state.authGuard.user);

    useEffect(()=>{
        let sock = new sockjs(wsUrl);
        stompClient = over(sock);
        stompClient.connect({},onConnected,onError);
    },[]);

    const onConnected = ()=>{
        stompClient.subscribe(globalChatRoom, onMessageRecieved);
    }

    const onMessageRecieved = (payload)=>{
        // Add a queue so that the memory will not face extreme use/rendering issues
        let getChatLogs = [...chatLogs];
        if(getChatLogs.length>30){
            getChatLogs.pop();
            getChatLogs.push(payload);
            setChatLogs(getChatLogs);
        }else {
            getChatLogs.push(payload);
            setChatLogs(getChatLogs);
        }
    }

    const onMessageSend = (evt)=>{
        //Use stompClient.send(url,{},messageBody) to send the data
        evt.preventDefault();
        evt.preventDefault();
        const form = evt.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        if(user===null||user===undefined){
            let jsonData = {
                user: userName,
                message: formJson.message
            };
            let arr = [...chatLogs];
            if(arr.length>30){
                arr.pop();
                arr.push(jsonData);
                setChatLogs(arr);
            }
            let sendData = JSON.stringify(jsonData);
        }else {
            let jsonData = {
                user: userName,
                message: formJson.message
            };
            let arr = [...chatLogs];
            if(arr.length>30){
                arr.pop();
                arr.push(jsonData);
                setChatLogs(arr);
            }
            let sendData = JSON.stringify(jsonData);
        }
        stompClient.send(globalChatSend,{},sendData);
    }

    const onError = (err)=>{
        console.error(err);
    }

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

    const ChatRender = () => {
        // Do the chat rendering in here
        let arr = [...chatLogs];
        let rend = arr.map(entry => <li key={arr.indexOf(entry)}>{entry.user}: {entry.message}</li>);
        return <ul>{rend}</ul>;
    }

    return (
        <div className="nav-comp">
            {/* <nav class="navbar navbar-expand-lg bg-body-tertiary sample-nav">
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
            </nav> */}
            <nav className="bg-transparent">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <div className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex flex-row">
                                <li className="nav-item nav-mar">
                                    <a className="nav-link my-nav-link" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item nav-mar">
                                    <a className="nav-link my-nav-link" href="#">News</a>
                                </li>
                                <li className="nav-item nav-mar">
                                    <a className="nav-link my-nav-link" href="#">Video</a>
                                </li>
                                <li className="nav-item nav-mar">
                                    <a className="nav-link my-nav-link" href="#">Images</a>
                                </li>
                            </ul>
                            <span className="w-[50vw]"></span>
                            <div className="d-flex">
                                <a href="/login" className="btn btn-outline-light me-2 btn-sample">Login</a>
                                <a href="/register" className="btn btn-outline-light me-2 btn-sample">Registration</a>
                            </div>
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
                        <ChatRender />
                    </div>
                    <form method="post" onSubmit={onMessageSend}>
                        <div class="mb-3">
                            <input type="text" class="form-control my-input" id="exampleInputText1" aria-describedby="textHelp" name="message" />
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
                <div className="d-flex flex-row-reverse" id="btn-items">
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