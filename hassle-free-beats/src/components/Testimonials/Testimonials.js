import React, { Component } from "react";

import Quote from "./Quote";

import "./Testimonials.css";

export default class Testimonials extends Component {
  render() {
    return (
      <div className="testimonial-container">
        <div className="testimonial-left">
          <Quote
            quote="I can't stress enough how awesome my experience has been with you guys. Everytime that I went to look for instrumentals on other websites I would be really turned off by the how complex the different licensing options were. I like that you have one price and one license, not to mention the dope ass beats!"
            person="Seattle, WA -USA"
          />
          <Quote
            quote="I love what you guys are doing here at Hassle-Free-Beats! I love knowing that I can express myself over your tracks and not worry about any legal issues when I release my music out into the world. The fact that this flexible of a license is available for such a low-price almost seems like you guys are TRYING to lose money. Thank you for what you do."
            person="Berlin, Germany"
          />
          <Quote
            quote="Ay man I just want to thank your team of producers for allowing us rappers to be able to create and put ourselves into the world without having to get hung up on all the industry bullshit. Buy the beat and get to work, that's how I like to do it and that's why I keep coming back. "
            person="Atlanta, GA -USA"
          />
        </div>
        <div className="testimonial-right">
          <Quote
            quote="I usually have to look all over the place for instrumentals that fit the kind of music I want to make, but everytime I come here it seems like there is something new that I want to try out. The fact that I can download the beat instantly makes it so easy for me to keep the creative juice flowing and just drop it right into my DAW. THANK YOU!"
            person="London, England"
          />
          <Quote
            quote="Why don't more websites do their business like this? We all know how hard it can be to make money off of music, but the fact that your company allows me to make as much money as people are willing to pay me without taking a huge share of it is a relief. I feel like the power to make a song a hit is in my hands."
            person="Chicago, IL -USA"
          />
        </div>
      </div>
    );
  }
}
