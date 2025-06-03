import { useState } from 'react';
import { CenterDisplay } from '../StoryUtils/CenterDisplay';
import { BoomerangButton } from './BoomerangButton';

export const World = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  return (
    <CenterDisplay>
      <BoomerangButton
        tip={['BEFORE CLICK', 'AFTER CLICK']}
        content={['Increment?', 'running...']}
        handleClick={() => {
          setCount1(count1 + 1);
        }}
        tipPosition="top"
        style={{
          width: '200px',
        }}
      />
      <span>Count:{count1}</span>
      <BoomerangButton
        tip={['BEFORE CLICK', 'AFTER CLICK']}
        content={['Increment?', 'running...']}
        handleClick={() => {
          setCount2(count2 + 1);
        }}
        tipPosition="bottom"
        style={{
          width: '200px',
        }}
      />
      <span>Count:{count2}</span>
      <BoomerangButton
        tip={['BEFORE CLICK', 'AFTER CLICK']}
        content={['Increment?', 'running...']}
        handleClick={() => {
          setCount3(count3 + 1);
        }}
        tipPosition="left"
        style={{
          width: '200px',
        }}
      />
      <span>Count:{count3}</span>
      <BoomerangButton
        tip={['BEFORE CLICK', 'AFTER CLICK']}
        content={['Increment?', 'running...']}
        handleClick={() => {
          setCount4(count4 + 1);
        }}
        tipPosition="right"
        style={{
          width: '200px',
        }}
      />
      <span>Count:{count4}</span>
    </CenterDisplay>
  );
};
