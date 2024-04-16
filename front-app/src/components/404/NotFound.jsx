import "./NotFound.css"

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center p-5">
                    <div className="nf-box">
                        <div className="nf-box-container">
                            <div className="nf-item">
                                <div className="nf-big-head">
                                    <h1>404</h1>
                                </div>
                                <div className="nf-item-header">
                                    <h4>Page Not Found</h4>
                                </div>
                                <div className="container nf-item-contain">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <p>
                                            Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex flex-row-reverse">
                                    <a href="/" className="btn btn-outline-dark nf-custom-btn">home</a>
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
    NotFound,
}