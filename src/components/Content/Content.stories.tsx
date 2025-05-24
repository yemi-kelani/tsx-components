import { LeftRightContent } from "./LeftRightContent";
import { Content } from "./Content";

export const World = () => {
    return (
        <>
             <LeftRightContent
                leftContent={
                    <Content>
                        <div style={{ 
                            width: "100%", 
                            background: "#def", 
                            padding: 20,
                            textAlign: "center"
                        }}>Left Side</div>
                    </Content>
                }
                rightContent={
                    <Content>
                        <div style={{ 
                            width: "100%", 
                            background: "#fed", 
                            padding: 20,
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
                            padding: 20,
                            textAlign: "center"
                        }}>Shrink Left</div>
                    </Content>
                }
                rightContent={
                    <Content>
                        <div style={{ 
                            width: "100%", 
                            background: "#efd", 
                            padding: 20,
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
                            padding: 20,
                            textAlign: "center"
                        }}>Expand Left</div>
                    </Content>
                }
                rightContent={
                    <Content>
                        <div style={{ 
                            width: "100%", 
                            background: "#fde", 
                            padding: 20,
                            textAlign: "center"
                        }}>Shrink Right</div>
                    </Content>
                }
                shrinkRight
            />

            <hr style={{ width: "100%" }}/>

            <LeftRightContent
                leftContent={<Content><p>This is the right text content with some description.</p></Content>}
                rightContent={<Content><img src="https://placehold.co/600x400/EEE/31343C" alt="Placeholder Left" /></Content>}
                className="custom-container-class"
                shrinkLeft
            />
        </>
    );
}