import './AboutComp.css';

const AboutUs = () => {
    return (
        <div className="about-comp">
            <div className="container">
                <div className="d-flex flex-column justify-content-center-align-items-center">
                    <div className="d-flex justify-content-center">
                        <div className="item-header">
                            <h4>About Us</h4>
                        </div>
                    </div>
                    <div className="about-box">
                        <p>
                            Welcome to our platform dedicated to truth and accuracy.
                            At our core, we're driven by the mission to fact-check and curb the spread of misinformation.
                            In today's digital age, false information can proliferate rapidly, causing harm and confusion.
                            Our dedicated team of researchers and analysts work tirelessly to verify claims, debunk falsehoods, and provide the public with reliable, evidence-based information.
                            We believe in the power of knowledge to empower individuals and strengthen communities.
                            With a commitment to transparency and integrity, we strive to be a trusted resource in the fight against misinformation.
                            Join us in promoting truth and fostering informed decision-making.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {
    AboutUs,
}