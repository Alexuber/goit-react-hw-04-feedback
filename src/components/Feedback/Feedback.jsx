import { useState } from 'react';
import { Section } from '../Section/Section';
import { FeedbackOptions } from '../FeedbackOptions/FeedbackOptions';
import { Statistics } from 'components/Statistics/Statistics';
import { Notification } from 'components/Notification/Notification';

export const Feedback = () => {
  const [options, setOptions] = useState({ good: 0, neutral: 0, bad: 0 });

  const increaseStatCount = option => {
    setOptions(prevState => {
      return { ...prevState, [option]: prevState[option] + 1 };
    });
  };

  const { good, neutral, bad } = options;

  const getStatus = () => {
    return good > 0 || neutral > 0 || bad > 0;
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.floor((good / countTotalFeedback()) * 100);
  };

  const total = countTotalFeedback();
  const status = getStatus();
  const positive = countPositiveFeedbackPercentage();
  const optionLabels = Object.keys(options);

  return (
    <>
      <Section title="Please leave your feedback">
        <FeedbackOptions
          options={optionLabels}
          onLeaveFeedback={increaseStatCount}
        />
      </Section>
      <Section title="Statistics">
        {status ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positive}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};
