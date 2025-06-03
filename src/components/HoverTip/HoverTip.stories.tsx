import { CenterDisplay } from '../StoryUtils/CenterDisplay';
import { HoverTip } from './HoverTip';

export const World = () => {
  return (
    <CenterDisplay>
      <HoverTip
        tip="Example Hover Tip"
        tipPosition="top"
        children={<div style={{ width: '100px', height: '100px', backgroundColor: 'black' }}></div>}
      />
      <HoverTip
        tip="Example Hover Tip"
        tipPosition="bottom"
        children={<div style={{ width: '100px', height: '100px', backgroundColor: 'black' }}></div>}
      />
      <HoverTip
        tip="Example Hover Tip"
        tipPosition="left"
        children={<div style={{ width: '100px', height: '100px', backgroundColor: 'black' }}></div>}
      />
      <HoverTip tip="Example Hover Tip" tipPosition="right">
        <div style={{ width: '100px', height: '100px', backgroundColor: 'black' }}></div>
      </HoverTip>
    </CenterDisplay>
  );
};
