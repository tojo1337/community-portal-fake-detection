import "./NotFound.css"

const NotFound = () => {
    return (
        <div className="not-found">
            <div class="container">
                <div class="d-flex justify-content-center align-items-center p-5">
                    <div class="nf-box">
                        <div class="nf-box-container">
                            <div class="nf-item">
                                <div class="nf-big-head">
                                    <h1>404</h1>
                                </div>
                                <div class="nf-item-header">
                                    <h4>Page Not Found</h4>
                                </div>
                                <div class="container nf-item-contain">
                                    <div class="d-flex justify-content-center align-items-center">
                                        <p>
                                            Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable
                                        </p>
                                    </div>
                                </div>
                                <div class="d-flex flex-row-reverse">
                                    <a href="/" class="btn btn-outline-dark nf-custom-btn">home</a>
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