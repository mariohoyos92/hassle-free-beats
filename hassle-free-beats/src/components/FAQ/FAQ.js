import React from "react";

import { Link } from "react-router-dom";

import QuestionAnswer from "../QuestionAnswer/QuestionAnswer";

import "./FAQ.css";

const FAQ = () => (
  <div className="faq-container">
    <h1 className="faq-header">F.A.Q.</h1>
    <QuestionAnswer
      question={`HOW DO I BUY A BEAT?`}
      answer={`In our beat store, simply listen to the different available instrumentals, add the ones you like to your cart, hit the checkout button, and put in your card information through our secure payment processing portal powered by Stripe. Your beats will then be emailed to you and will be available for download immediately on the website as well.`}
    />
    <QuestionAnswer
      question={`DO YOUR PRODUCERS USE SAMPLES?`}
      answer={`No we do not! Our producers create entirely original instrumentals in order to ensure that you do not have to worry about clearing samples. We do not want to burden you with legal issues.`}
    />
    <QuestionAnswer
      question={`CAN I MAKE MONEY OFF OF A SONG MADE WITH YOUR INSTRUMENTALS?`}
      answer={`Absolutely. Our team of producers believes that you should be able to make the most out of the instrumental you purchased. Unlike our competitors, we do not set limits on how many units you can sell, how many radio spins you can get, or how popular you make this song. We believe in leaving the power in your hands.`}
    />
    <QuestionAnswer
      question={`DO I HAVE TO PAY YOU A PERCENTAGE OF THE MONEY I EARN?`}
      answer={`No you do not! We like to provide you with the opportunity to earn as much for yourself off of your creative work. All you will ever have to pay us for is the purcahse of the license.`}
    />
    <QuestionAnswer
      question={`HOW LONG DO I HAVE TO WAIT TO DOWNLOAD MY INSTRUMENTAL?`}
      answer={`You won't have to wait at all! As soon as the payment is processed, we will send you an email with download links and you will also be redirected to a page where you can download the songs immediately.`}
    />
    <QuestionAnswer
      question={`WHAT FORMS OF PAYMENT DO YOU ACCEPT?`}
      answer={`We accept all major credit cards through our payment portal which is powered by Stripe. This ensures that your financial information never touches our servers so that you can rest assured that your information is safe.`}
    />
    <QuestionAnswer
      question={`DO YOU SELL EXCLUSIVE LICENSES?`}
      answer={`We do not offer exclusive licenses through our website but we are willing to work with you to find a fair price if you would like exclusive rights. Please email us at support@hasslefreebeats.com`}
    />
    <QuestionAnswer
      question={`AFTER I PURCHASE THE BEAT, WILL IT BE TAKEN OFF OF THE WEBSITE?`}
      answer={`No it will not. We work on a model where we are able to sell a beat multiple times, but we sell it with a non-restrictive license that allows you to earn as much money as you can generate from it. This allows for a win-win situation where you can make money from your creative efforts and we can stay in business to keep providing artists like you with quality instrumentals.`}
    />
    <QuestionAnswer
      question={`HOW DO I CREDIT THE PRODUCERS?`}
      answer={`For any publishing, it suffices to include "Instrumental by Hassle-Free-Beats https://hasslefreebeats.com" in the credits.`}
    />

    <h3 className="faq-header">
      For any other questions please email us at{" "}
      <a
        href="mailto:support@hasslefreebeats.com"
        style={{ color: "#F8AA15", textDecoration: "none" }}
      >
        support@hasslefreebeats.com
      </a>{" "}
      or go to our{" "}
      <Link to="/contact" style={{ color: "#F8AA15", textDecoration: "none" }}>
        contact page
      </Link>.
    </h3>
  </div>
);

export default FAQ;
