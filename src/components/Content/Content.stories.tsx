import { LeftRightContent } from "./LeftRightContent";
import { Content } from "./Content";
import { StackedContent } from "./StackedContent";
import { Text } from "./Text";

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris volutpat odio non risus lacinia lacinia. Ut a ornare lacus. Vivamus semper, nulla tincidunt tempor viverra, lectus augue dignissim velit, ut mollis sem leo quis justo. Duis fringilla, lectus non iaculis pretium, ipsum mauris consequat mi, non sagittis lacus magna quis nunc. Proin scelerisque vel lacus in gravida. Sed non justo et metus placerat luctus in vitae tellus. Etiam sit amet justo tempor, commodo ex vitae, suscipit sem.";

export const World = () => {
    return (
        <>
             <LeftRightContent
                leftContent={
                    <Content>
                        <div style={{ 
                            width: "100%", 
                            background: "#def", 
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            textAlign: "center"
                        }}>Left Side</div>
                    </Content>
                }
                rightContent={
                    <Content>
                        <div style={{ 
                            width: "100%", 
                            background: "#fed", 
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            textAlign: "center"
                        }}>Right Side</div>
                    </Content>
                }
            />

            <hr style={{ width: "#100%" }}/>

            <LeftRightContent
                leftContent={
                    <Content>
                        <div style={{ 
                            width: "100%", 
                            background: "#dfe", 
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            textAlign: "center"
                        }}>Shrink Left</div>
                    </Content>
                }
                rightContent={
                    <Content>
                        <div style={{ 
                            width: "100%", 
                            background: "#efd", 
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            textAlign: "center"
                        }}>Expand Right</div>
                    </Content>
                }
                shrinkLeft
            />

            <hr style={{ width: "#100%" }}/>

            <LeftRightContent
                leftContent={
                    <Content>
                        <div style={{ 
                            width: "100%", 
                            background: "#def", 
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            textAlign: "center"
                        }}>Expand Left</div>
                    </Content>
                }
                rightContent={
                    <Content>
                        <div style={{ 
                            width: "100%", 
                            background: "#fde", 
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            textAlign: "center"
                        }}>Shrink Right</div>
                    </Content>
                }
                shrinkRight
            />

            <hr style={{ width: "100%" }}/>

            <LeftRightContent
                leftContent={
                    <StackedContent
                        topContent={<Content><img src="https://placehold.co/300x200/EEE/31343C" alt="Placeholder Left" /></Content>}
                        bottomContent={<Content><p style={{textAlign: "center"}}>{lorem}</p></Content>}
                    />
                }
                rightContent={<Content><img src="https://placehold.co/600x400/EEE/31343C" alt="Placeholder Left" /></Content>}
                className="custom-container-class"
                shrinkLeft
            />

            <hr style={{ width: "100%" }}/>

            <Content direction="row" height="250px">
                <StackedContent
                    topContent={<Content><div style={{ height: "100%", background: "lightblue", paddingLeft: "1rem", paddingRight: "1rem"}}>Top</div></Content>}
                    bottomContent={<Content><div style={{ height: "100%", background: "lightblue", paddingLeft: "1rem", paddingRight: "1rem"}}>Bottom</div></Content>}
                />
                <StackedContent
                    topContent={<Content><div style={{ height: "100%", background: "lightblue", paddingLeft: "1rem", paddingRight: "1rem"}}>Top</div></Content>}
                    bottomContent={<Content><div style={{ height: "100%", background: "lightblue", paddingLeft: "1rem", paddingRight: "1rem"}}>Bottom</div></Content>}
                />
                <StackedContent
                    topContent={<Content><div style={{ height: "100%", background: "lightblue", paddingLeft: "1rem", paddingRight: "1rem"}}>Top</div></Content>}
                    bottomContent={<Content><div style={{ height: "100%", background: "lightblue", paddingLeft: "1rem", paddingRight: "1rem"}}>Bottom</div></Content>}
                    gap="2rem"
                />
                <StackedContent
                    topContent={<Content><img src="https://placehold.co/200x100/EEE/31343C" alt="Placeholder Left" /></Content>}
                    bottomContent={<Content><img src="https://placehold.co/200x100/EEE/31343C" alt="Placeholder Left" /></Content>}
                    gap="2rem"
                />
                <StackedContent
                    topContent={<Content><img src="https://placehold.co/200x100/EEE/31343C" alt="Placeholder Left" /></Content>}
                    bottomContent={<Content><img src="https://placehold.co/200x100/EEE/31343C" alt="Placeholder Left" /></Content>}
                    gap="2rem"
                />
            </Content>

            <hr style={{ width: "100%" }}/>

            <Text
                textAlign="left"
                content={[lorem]}
                indent={true}
                />

            <Text
                textAlign="justify"
                content={[lorem]}
                indent={false}
                />

            <Text
                sectionTitle="Rightward"
                textAlign="right"
                content={[lorem]}
                indent={false}
                />

            <Text
                indent={false}
                content={[
                    "Plain text paragraph.",
                    "<strong>&nbsp;This text is bold using HTML.&nbsp;</strong>",
                    "<em>&nbsp;This text is italicized.&nbsp;</em>",
                ]}
                />


            <Text
                sectionTitle="Key Features"
                indent={false}
                content={[
                    {
                    text: "The system supports the following:",
                    listType: "ul",
                    listStyleType: "disc",
                    subBulletList: [
                        "Fast performance",
                        "Modular architecture",
                        "Developer-friendly APIs",
                    ],
                    },
                    "Additional details will be shared soon.",
                ]}
                />

            <Text
                indent={true}
                sectionTitle="Benefits"
                borderColor="blue"
                content={[
                    lorem,
                    "<br/><br/>",
                    {
                        text: "<strong>Why choose our platform?</strong>",
                        listType: "ul",
                        listStyleType: "circle",
                        subBulletList: [
                            "Easy to learn",
                            "Extensive documentation",
                            "<em>Community support</em>",
                        ],
                    },
                    lorem,
                    lorem
                ]}
                textAlign="left"
                />
        </>
    );
}