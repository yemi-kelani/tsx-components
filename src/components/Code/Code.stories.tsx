import { CenterDisplay } from '../StoryUtils/CenterDisplay';
import { Code } from './Code';

const code_sample = `# sample comment
def foo():
    print("Hello World!")`;

export const World = () => {
  return (
    <CenterDisplay>
      <Code type="basic" text="def one_liner: pass" language="python" />
      <Code
        type="basic"
        text={code_sample}
        language="python"
        theme="dark"
        lineNumbers={true}
        style={{ width: '500px' }}
        caption="Lorem ipsum deus ex machina. Lorem ipsum deus ex machina. Lorem ipsum deus ex machina. Lorem ipsum deus ex machina. Lorem ipsum deus ex machina. Lorem ipsum deus ex machina."
      />
      <Code
        type="basic"
        text={code_sample}
        language="python"
        theme="dark"
        lineNumbers={true}
        caption="Lorem ipsum deus ex machina."
      />
      <Code type="basic" text={code_sample} language="python" theme="light" />
      <Code
        type="gist"
        language="python"
        gistID={'0f31561ffd5d6cb8de0a36c867e0a70e'}
        caption="A Transformer component implementation."
        style={{ width: '50%' }}
      />
    </CenterDisplay>
  );
};
