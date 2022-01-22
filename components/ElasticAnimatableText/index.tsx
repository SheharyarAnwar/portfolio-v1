import React from "react";
interface Props {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}
const Index: React.FC<Props> = ({ text, level }) => {
  let commonClasses = "inline-block hover:text-green";
  const animationKeyframes = (
    keyFrames: number,
    xAmp: number,
    yAmp: number,
    holdKeyFrame = 0
  ) => {
    let arr = [];
    let holdKeyframesSnapshot = holdKeyFrame;
    for (let i = 1; i <= keyFrames; i++) {
      let matrix = `matrix(1,0,0,1,0,0)`;
      if (i % 2 !== 0) {
        // let decayX = 1 + Math.abs(xAmp - 1) / (1 + i - holdKeyframesSnapshot);
        let decayX = 1 + Math.abs(xAmp - 1) / (i - holdKeyframesSnapshot);
        // let decayY = 1 - Math.abs(yAmp - 1) / (1 + i - holdKeyframesSnapshot);
        let decayY = 1 - Math.abs(yAmp - 1) / (i - holdKeyframesSnapshot);
        matrix = `matrix(${decayX},0,0,${decayY},0,0)`;
      }
      if (holdKeyFrame > 0) {
        matrix = `matrix(${xAmp},0,0,${yAmp},0,0)`;
        arr.push({
          transform: matrix,
          offset: holdKeyFrame / keyFrames,
        });
        holdKeyFrame = 0;
      } else {
        console.log("hold", holdKeyframesSnapshot);
        if (i >= holdKeyframesSnapshot) {
          arr.push({
            transform: matrix,
          });
        }
      }
    }
    return arr;
  };

  console.log("animationKeyfreames", animationKeyframes(8, 1.5, 0.5, 2));
  const handleMouseEnter = (event: MouseEvent) => {
    const element = event.target;
    //@ts-ignore
    element.animate(animationKeyframes(8, 1.3, 0.8, 2), {
      duration: 800,
    });
  };
  let createHeading = (string: string) => {
    return React.createElement(
      `h${level}`,
      { className: commonClasses, onMouseEnter: handleMouseEnter },
      string
    );
  };
  const destructureString = (string: string) => {
    return string.split("").map((val) => {
      return createHeading(val);
    });
  };

  return <>{destructureString(text)}</>;
};
export default Index;
