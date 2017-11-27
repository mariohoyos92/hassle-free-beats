import React from "react";

import Card from "material-ui/Card";

import "./Quote.css";

const Quote = ({ quote, person }) => {
  return (
    <Card className="testimonial-quote">
      <blockquote>
        {quote}
        <cite>{person}</cite>
      </blockquote>
    </Card>
  );
};

export default Quote;
