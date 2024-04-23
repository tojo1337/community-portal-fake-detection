import axios from 'axios';
import './ContactUs.css';
import { makeComplain } from '../../static/Api';

const ContactUs = () => {
    const handleForm = (e)=>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        
        axios.post(makeComplain,formJson).catch(err=>console.error(err));
    }

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
                                    <form onSubmit={handleForm}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                            <input type="email" className="form-control my-input" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputComplaint" className="form-label">Complains</label>
                                            <input type='text' className="form-control my-input" id="exampleInputComplaint" name='complain' />
                                        </div>
                                        <button type="submit" className="btn btn-primary sample-btn">Submit</button>
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