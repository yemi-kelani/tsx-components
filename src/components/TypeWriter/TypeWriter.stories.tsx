import { Content } from "../../StoryUtils/Content";
import { TypeWriter } from "./TypeWriter";

export const World = () => {
  return (
    <Content
      content={[
        <TypeWriter
          terms={["Hello World!"]}
          loop={true}
          cursor={false}
          speed={10}
        />,
        <TypeWriter
          terms={["Photographer", "Artist", "Developer", "Writer"]}
          loop={true}
          speed={10}
        />,
        <TypeWriter
          terms={["Goodbye, see you later!"]}
          loop={false}
          speed={30}
          delay={2}
        />,
        <TypeWriter
          terms={["a b c d e", "あいうえお", "アイウエオ"]}
          loop={true}
          cursor={false}
          speed={10}
        />,
        <TypeWriter
          terms={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris volutpat odio non risus lacinia lacinia. Ut a ornare lacus. Vivamus semper, nulla tincidunt tempor viverra, lectus augue dignissim velit, ut mollis sem leo quis justo. Duis fringilla, lectus non iaculis pretium, ipsum mauris consequat mi, non sagittis lacus magna quis nunc. Proin scelerisque vel lacus in gravida. Sed non justo et metus placerat luctus in vitae tellus. Etiam sit amet justo tempor, commodo ex vitae, suscipit sem.",
          ]}
          speed={50}
          delay={5}
        />,
        <TypeWriter
          terms={[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris volutpat odio non risus lacinia lacinia. Ut a ornare lacus. Vivamus semper, nulla tincidunt tempor viverra, lectus augue dignissim velit, ut mollis sem leo quis justo. Duis fringilla, lectus non iaculis pretium, ipsum mauris consequat mi, non sagittis lacus magna quis nunc. Proin scelerisque vel lacus in gravida. Sed non justo et metus placerat luctus in vitae tellus. Etiam sit amet justo tempor, commodo ex vitae, suscipit sem.",
          ]}
          speed={100}
          delay={5}
        />,
      ]}
    />
  );
};
