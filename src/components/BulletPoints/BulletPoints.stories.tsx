import { CenterDisplay } from "../StoryUtils/CenterDisplay";
import { BulletPoints } from "./BulletPoints";

export const World = () => {
    return (
        <CenterDisplay>
            <div 
                style={{
                    border: "solid 1px black"
                }}>
                <BulletPoints
                    listType="ul"
                     bulletList={
                        [
                            "This is regular text.",
                            "<i>This is italicized.</i>",
                            "<b>This is bold.</b>",
                            {
                                text: "Sub points:",
                                listStyleType: "disc",
                                subBulletList: [
                                    "abc",
                                    "123",
                                    "xyz",
                                    {
                                        text: "More points:",
                                        listStyleType: "square",
                                        subBulletList: [
                                            "abc",
                                            "123",
                                            "xyz",
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                    listStyleType="circle"
                />
            </div>

            <div 
                style={{
                    border: "solid 1px black"
                }}>
                <BulletPoints
                    listType="ol"
                    listStyleType="decimal"
                    bulletList={
                        [
                            "This is regular text.",
                            "<i>This is italicized.</i>",
                            "<b>This is bold.</b>",
                            {
                                text: "Sub points:",
                                listStyleType: "lower-alpha",
                                subBulletList: [
                                    "abc",
                                    "123",
                                    "xyz"
                                ]
                            }
                        ]
                    }
                />
            </div>
            <BulletPoints
                listType="ul"
                    bulletList={
                    [
                        "This is regular text.",
                        "<i>This is italicized.</i>",
                        "<b>This is bold.</b>",
                        {
                            text: "Sub points:",
                            listStyleType: "disc",
                            subBulletList: [
                                "abc",
                                "123",
                                "xyz",
                                {
                                    text: "More points:",
                                    listStyleType: "circle",
                                    subBulletList: [
                                        "abc",
                                        "123",
                                        "xyz",
                                        {
                                            text: "Even more points:",
                                            listStyleType: "square",
                                            subBulletList: [
                                                "This is regular text.",
                                                "<i>This is italicized.</i>",
                                                "<b>This is bold.</b>"
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
                listStyleType="circle"
            />
        </CenterDisplay>

    );
}