import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className="contact-us">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column">

                        <div className="container">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="item-header">
                                    <h4>Contact Us</h4>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="d-flex flex-row">
                                <div className="contact-box">
                                    <ul>
                                        <li>C7JX+Q5R, Vidyasagar University Rd, Rangamati, Midnapore, West Bengal 721102</li>
                                        <li>03222 276 555</li>
                                        <li>vc@mail.vidyasagar.ac.in</li>
                                        <li>registrar@mail.vidyasagar.ac.in</li>
                                        <li>fo@mail.vidyasagar.ac.in</li>
                                        <li>controller@mail.vidyasagar.ac.in</li>
                                    </ul>
                                </div>

                                <div className="contact-box">
                                    <form>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                                            <input type="email" class="form-control my-input" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputComplaint" class="form-label">Complains</label>
                                            <input type='text' class="form-control my-input" id="exampleInputComplaint" />
                                        </div>
                                        <button type="submit" class="btn btn-primary sample-btn">Submit</button>
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
    ContactUs,
}