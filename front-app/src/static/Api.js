const baseUrl = "http://localhost:8080/api/v1/";

const fetchAllNews = baseUrl+"news-list";

const latestNews = baseUrl+"latest-news";

// Need to add an id at the end like /api/v1/get-news-rate/{id}
const newsRate = baseUrl+"get-news-rate/";

// Remember that sign-in is actually the registration
const signIn = baseUrl+"sign-in";

//Token is the login
const token = baseUrl+"token"

const refresh = baseUrl+"refresh";

const logout = baseUrl+"logout";

const globalChatRoom = "/topic/chat";

const globalChatSend = "/app/message";

const wsUrl = "http://localhost:8080/websocket";

export {
    fetchAllNews,
    latestNews,
    newsRate,
    signIn,
    token,
    refresh,
    logout,
    globalChatRoom,
    globalChatSend,
    wsUrl
}