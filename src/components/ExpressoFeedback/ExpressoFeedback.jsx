import {useState} from 'react';
import { Wrapper } from './ExpressoFeedback.styled.js';
import Section from '../Section/Section.jsx';

import Controls from '../Controls';
import Statistics from '../Statistics';
import Notification from '../Notification';


export default function Feedback() {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);


  const getFeedback = e => {
    const {
      target: { name }
    } = e;
   
    switch (name) {
      case 'good': setGood(good + 1);
        break;
      case 'bad': setBad(bad + 1);
        break;
      case 'neutral': setNeutral(neutral + 1);
        break;
      default: return;
    };
  }

   const counterFeedback = () => {
     return good + neutral + bad;
   };
   const counterPositivePercentage = () => {
     return (100 / counterFeedback()) * good;
   };
    return (
      <Wrapper>
        <Section title="Please, leave feedback">
          <Controls
            onFeedback={getFeedback}
          />
        </Section>
        <Section title="Statistics">
          {counterFeedback() ? (
            <>
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={counterFeedback()}
                positivePercentage={counterPositivePercentage()}
              />
            </>
          ) : (
            <Notification message="There is no feedback..." />
          )}
        </Section>
      </Wrapper>
    );

  }
