// About.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure to include the Bootstrap CSS file
import '../Stylings/About.css';

const About = () => {
  return (
    <div style={{ marginTop: "40px" }}>
      <div className="container">
        <div className="row">
          <div className="col-7">
            <h1 style={{ color: "red", textAlign: "center", fontSize: "4em", marginBottom: "30px"}}>ABOUT US</h1>
            <p>
              <strong>Uniting Communities, Fostering Resilience</strong>
            </p>
            <p>
              At CrisLine, we believe in the transformative power of community
              action, especially in times of adversity. Our platform serves as a
              beacon of connection amidst the chaos, bridging the gap between
              individuals eager to lend a helping hand, and communities in dire
              need of support.
            </p>
            <p>
              Join us in weaving a tapestry of hope, solidarity, and proactive
              action. Together, we can turn the tides of adversity into
              opportunities for community growth and enduring connections. Your
              journey towards making a tangible difference begins here, at the
              Community Crisis Aid Network.
            </p>
            <p>
              <strong>Our Features:</strong>
            </p>
            <ul>
              <li>
                Real-Time Updates: Stay informed with live updates on local
                crises and volunteering opportunities.
              </li>
              <li>
                Interactive Map: Visualize needs and initiatives in your
                locality, and navigate to where your help is needed the most.
              </li>
              <li>
                Secure & Supportive Environment: Engage in a safe, respectful
                space dedicated to collaborative crisis resolution.
              </li>
              <li>
                Personalized Profiles: Showcase your contributions, connect with
                other community members, and build a network of support.
              </li>
            </ul>
          </div>
          <div className="col-4 ml-auto">
            <div className = "firefighterimage" style={{ textAlign: "center"}}>
              <img
                src="https://www.mlive.com/resizer/gmfGS7I_NuYe4iFtqcLhb1vxyHQ=/800x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/CZHEBFBZ2VAR7BXTZS3L5QVC7I.jpg"
                alt="Firefighter injured in house fire"
                style={{ width: "60%", height: "175px"}}
              />
            </div>
            <strong>How It Works:</strong>
            <ol type="1">
              <li>
                Create Your Profile:
                <ul>
                  <li>Sign up and customize your profile.</li>
                  <li>
                    Specify your skills, availability, and the type of aid you
                    can provide or require.
                  </li>
                </ul>
              </li>
              <li>
                Discover Opportunities:
                <ul>
                  <li>Browse a live map of local events.</li>
                  <li>
                    Explore needs and initiatives within your community or
                    groups you're interested in.
                  </li>
                </ul>
              </li>
              <li>
                Engage & Contribute:
                <ul>
                  <li>Respond to real-time calls for assistance.</li>
                  <li>
                    Connect with other volunteers, coordinate efforts, and track
                    your impact.
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
