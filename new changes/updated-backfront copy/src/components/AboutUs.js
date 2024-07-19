import React from 'react';
import './AboutUs.css';
import TeamPic1 from '../images/TeamPic1.png';
import TeamPic2 from '../images/TeamPic2.png';
import TeamPic3 from '../images/TeamPic3.png';
import image6 from '../images/image6.png';
import image7 from '../images/image7.png';
import image8 from '../images/image8.png';
import Navbar from './Navbar';


const AboutUs = () => {
  return (
    <>
     <section className="goals-section">
          <h2>Our Goals</h2>
          <div className="goals">
            <div className="goal">
              <img src={image6} alt="Ensure Safety" />
              <h3>Ensure Safety</h3>
              <p>We have built our system to ensure drivers safety and minimize road hazards.
              </p>
            </div>
            <div className="goal">
              <img src={image7} alt="Public Transport Safety" />
              <h3>System integration in Public Transport</h3>
              <p>Our system has been integrated into public transport vehicles, safeguarding the well-being of drivers.</p>
            </div>
            <div className="goal">
              <img src={image8} alt="Personal Vehicle Protection" />
              <h3>Personal Vehicle Protection</h3>
              <p>Individual drivers will be benefited from our drowsiness detection system, with decrease in numerous cases of potential accidents.</p>
            </div>
          </div>
        </section>
      <Navbar transparent={false} customstyle="nav-about"/>
      <div className="about-container" >
        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-member">
            <img src={TeamPic1} alt="Engineers" />
            <h3>Epsa Pokhrel(Frontend)</h3>
            <p>Responsible for designing user friendly UI using modern CSS and popular javascript framework react.js. </p>
          </div>
          <div className="team-member">
            <img src={TeamPic2} alt="Engineer" />
            <h3>Prashuma lama(Backend)</h3>
            <p>Responsible for buliding the system model that detects the drowsiness in driver and sends them alert.</p>
          </div>
          <div className="team-member">
            <img src={TeamPic3} alt="Engineer" />
            <h3>Sampada Subedi(Backend)</h3>
            <p>Responsible for buliding the system model that detects the drowsiness in driver and sends them alert.</p>
          </div>
        </section>

       
       
      </div>
      
    </>
  );
};

export default AboutUs;