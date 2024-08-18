import { Container,Row,Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import  header  from '../assets/img/header-img.svg';
import { useState,useEffect } from "react";
export const Banner = () => {
    const [loopNum,setLoopNum] = useState(0);
    const toRotate = ["Full-stack developer","Machine Learning Expert","Web designer"];
    const [text,setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const period = 2000;
    const [delta,setDelta] = useState(300-Math.random()*100);

    useEffect(()=>{
      let ticker = setInterval(
        () => {
          tick();
        },delta);
        return () => clearInterval(ticker);
    },[text]
    );
    const tick = () => {
      let i = loopNum % toRotate.length;
      let fullText = toRotate[i];
      let updatedText = isDeleting ? fullText.substring(0,text.length-1) : fullText.substring(0,text.length+1);

      setText(updatedText);
      if(isDeleting){
        setDelta(prevDelta => prevDelta/2);
      }
      if(!isDeleting && fullText === updatedText){
        setIsDeleting(true);
        setDelta(period);
      }else if(isDeleting && updatedText===""){
        setIsDeleting(false);
        setLoopNum(loopNum+1);
        setDelta(500)
      }
    }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline"> Welcome to this website</span>
            <h1>
              {"Hi,I am Junior "}
              <span className="wrap">{text}</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
              error ut rerum, aliquid quam eius, consectetur dolore temporibus
              voluptas molestias, enim officia fuga. Provident iste, ullam quod
              maxime numquam excepturi.
            </p>
            <button onClick={()=>console.log("Everything will be best!")}>
                Let's connect <ArrowRightCircle size={25}/></button>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img src={header} alt="Header Image"/>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
