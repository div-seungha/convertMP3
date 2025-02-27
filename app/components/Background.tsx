import { background, box_container, hover_box } from "./styles.css";
import Title from "./Title";

const Background = () => {
  return (
    <div className={background}>
      <Title />
      {/* <div className={box_container}>
        {Array.from({ length: 100 }).map((v, i) => {
          return <div className={hover_box} key={i}></div>;
        })}
      </div> */}
    </div>
  );
};

export default Background;
