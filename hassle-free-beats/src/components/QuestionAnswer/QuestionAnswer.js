import React from "react";

import { Card, CardHeader, CardText } from "material-ui/Card";

import "./QuestionAnswer.css";

const QuestionAnswer = ({ question, answer }) => (
  <Card className="question-answer">
    <CardHeader
      title={question}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>{answer}</CardText>
  </Card>
);

export default QuestionAnswer;
