import './HomeComp.css';

const HomeComp = () => {
    return (
        <div className="home-comp">
            <div className="container">
                <div className="d-flex">
                    <div className="container">
                        <div className="d-flex flex-column">

                            {/* This contains the section which shows the detection steps */}
                            <div className="home-box">
                                <div className="item-header">
                                    <h4>Detection schemes</h4>
                                </div>
                                <div className="item-list">
                                    <ul className="list-group list-group-flush list-transparent">
                                        <li className="list-group-item">Natural Language Processing (NLP) Techniques</li>
                                        <li className="list-group-item">Source Credibility Analysis</li>
                                        <li className="list-group-item">Fact-Checking Services Integration</li>
                                        <li className="list-group-item">Social Media Analysis</li>
                                        <li className="list-group-item">Deep Learning Models</li>
                                        <li className="list-group-item">Metadata Analysis</li>
                                        <li className="list-group-item">Cross-Referencing Multiple Sources</li>
                                        <li className="list-group-item">User Behavior Analysis</li>
                                        <li className="list-group-item">Crowdsourcing and Community Reporting</li>
                                    </ul>
                                </div>
                            </div>

                            {/* This section contains the methodologies or the steps taht we take to check facts */}
                            <div className="home-box">
                                <div className="item-header">
                                    <h4>Detection methodology</h4>
                                </div>
                                <div className="item-list">
                                    <ol>
                                        <li>
                                            Content Aggregation: The site gathers news articles and content from various sources, including mainstream media outlets, blogs, social media platforms, and user submissions.
                                        </li>
                                        <li>
                                            Pre-processing and Data Cleaning: Before analysis, the text data is pre-processed and cleaned. This involves removing HTML tags, special characters, punctuation, and stop words. The text may also be tokenized into words or phrases for further analysis.
                                        </li>
                                        <li>
                                            Feature Extraction: Relevant features are extracted from the cleaned text data. These features may include word frequency, sentiment scores, linguistic patterns, metadata (e.g., publication date, author information), and source credibility scores.
                                        </li>
                                        <li>
                                            Training Data Preparation: A labeled dataset is created, consisting of both real and fake news articles. Each article is labeled accordingly.
                                        </li>
                                        <li>
                                            Model Training: Machine learning models, such as deep learning models (e.g., CNNs, RNNs), logistic regression, or support vector machines, are trained using the labeled dataset. During training, the models learn to distinguish between real and fake news based on the extracted features.
                                        </li>
                                        <li>
                                            Model Evaluation: The trained models are evaluated using validation data to assess their performance in terms of accuracy, precision, recall, and F1 score. Cross-validation techniques may also be employed to ensure robustness.
                                        </li>
                                        <li>
                                            Deployment: Once the models have been trained and evaluated, they are deployed on the website's server or cloud platform, where they can be accessed via APIs or web interfaces.
                                        </li>
                                        <li>
                                            Real-time Analysis: When a user submits a news article or URL to the site, the text data is passed through the deployed models for real-time analysis. The models classify the article as either real or fake based on the learned patterns and features.
                                        </li>
                                        <li>
                                            Result Presentation: The classification result is presented to the user along with additional information, such as the confidence score, key features contributing to the classification, and relevant fact-checking references.
                                        </li>
                                        <li>
                                            User Feedback and Improvement: Users are encouraged to provide feedback on the classification results. This feedback is used to continuously improve the models, update the training data, and refine the fake news detection algorithms.
                                        </li>
                                        <li>
                                            Monitoring and Maintenance: The site is regularly monitored for performance issues, model drift, and emerging trends in fake news propagation. Updates and improvements are made as necessary to ensure the effectiveness and accuracy of the detection system.
                                        </li>
                                    </ol>
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
    HomeComp,
}