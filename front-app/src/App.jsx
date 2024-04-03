import "./App.css"

import { Parallax } from "@react-spring/parallax"
import { ParallaxLayer } from "@react-spring/parallax"

import { NavComp } from './components/home/NavComp'
import { HomeComp } from './components/home/HomeComp'
import { AboutUs } from './components/home/AboutComp'
import { ContactUs } from './components/home/ContactUs'
import { useEffect, useState } from "react"
import axios from "axios"
import { fetchAllNews } from "./static/Api"
import { useDispatch, useSelector } from "react-redux"
import { setNews } from "./services/VotedNews"
import { login } from "./services/AuthGuard"

const App = () => {
    const [arr,setArr] = useState([]);
    
    const votedNews = useSelector((state)=>state.votedNews.value);
    const token = useSelector(state=>state.authGuard.bearerToken);

    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(votedNews);

        axios.get(fetchAllNews)
        .then(data=>{  
            // This is to add persistance in login
            let token = window.localStorage.getItem("bearer");
            if(token!==null){
                dispatch(login(token));
            }

            // This is to save the news array
            dispatch(setNews(data));
        })
        .catch(err=>{
            console.error(err);
        })
    },[]);

    return (
        <Parallax pages={6}>
            {/* <ParallaxLayer offset={0} sticky={{start:0,end:3}}> */}

            <ParallaxLayer offset={0} speed={0.5}>
                <div className="parallax" id="bg-img"></div>
            </ParallaxLayer>

            <ParallaxLayer offset={0} speed={0.65}>
                <div className="parallax" id="cloud1"></div>
            </ParallaxLayer>

            <ParallaxLayer offset={0} speed={0.65}>
                <div className="parallax" id="cloud2"></div>
            </ParallaxLayer>

            <ParallaxLayer offset={0} speed={0.55}>
                <div className="parallax" id="cloud3"></div>
            </ParallaxLayer>

            {/* Header for the website */}
            <ParallaxLayer offset={0} speed={-0.25}>
                <div className="container" id="site-header">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h3>The TruthBallot</h3>
                        <hr class="border border-primary border-3 opacity-75 site-header-border"></hr>
                        <div className="site-header-box">
                            <p>
                                Facts Speak Louder than Opinions! <br />
                                Your Trusted Source for Verified Information in the Era of Misinformation.
                            </p>
                        </div>
                    </div>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={0} speed={0.25}>
                <div className="parallax" id="tree"></div>
            </ParallaxLayer>

            {/* Nav component. Place it at the end and don't remove it */}
            <ParallaxLayer offset={0} speed={1}>
                <NavComp />
            </ParallaxLayer>

            <ParallaxLayer offset={1} factor={3}>
                <HomeComp />
            </ParallaxLayer>

            <ParallaxLayer offset={4}>
                <AboutUs />
            </ParallaxLayer>

            <ParallaxLayer offset={5}>
                <ContactUs />
            </ParallaxLayer>
        </Parallax>
    )
}

export default App;