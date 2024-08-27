import { useState } from "react";
import { Container,Col,Row } from "react-bootstrap";
import contact from "../assets/img/contact-img.svg"

export const Contact = () =>{
    const detailForm = {
        lastName:"",
        firstName: "",
        email: "",
        phone:"",
        message: "",
    }
    const [detail, setDetail] = useState(detailForm);
    const [button, setButton] = useState("Send");
    const [status, setStatus] = useState({});

    const onTimeUpdate = (category,value)=>{
            setDetail({...detail,[category]:value})
    }
    const handleSubmit =async (e) =>{
        e.preventDefault();
        setButton('Sending...');
        let response = await fetch("http://localhost:5000/contact",{
            method: "POST",
            headers:{
                "Content-Type":"Application/json;charset=utf-8",
            },
            body:JSON.stringify(detail),
        });
        setButton("Send");
        let result = response.json();
        setDetail(detailForm);
        if(result.code===200){
            setStatus({success:true,message:"Message sent successfully"})
        }else{
            setStatus({success:false,message:"Error at sending message"})
        }
    }

    return(
        <section className="contact" id="connect">
            <Container>
                <Row>
                    <Col md={6}>
                    <img src={contact} alt="Contact us"/>
                    </Col>
                    <Col md={6}>
                    <h2>Get in Touch</h2>
                    <form onSubmit={handleSubmit} className="align-items-center">
                    <Row>
                    <Col sm={6} className="px-1">
                        <input type="text" value={detailForm.firstName} placeholder="First Name" onChange={(e)=> onTimeUpdate("firstName",e.target.value)}></input>
                    </Col>
                    <Col sm={6} className="px-1">
                        <input type="text" value={detailForm.lastName} placeholder="Last Name" onChange={(e)=> onTimeUpdate("lastName",e.target.value)}></input>
                    </Col>
                    <Col sm={6} className="px-1">
                        <input type="email" value={detailForm.email} placeholder="Email" onChange={(e)=> onTimeUpdate("email",e.target.value)}></input>
                    </Col>
                    <Col sm={6} className="px-1">
                        <input type="tel" value={detailForm.phone} placeholder="Phone No." onChange={(e)=> onTimeUpdate("phone",e.target.value)}></input>
                    </Col>
                    <Col>
                        <textarea rows={6} value={detailForm.message} placeholder="Enter your message..." onChange={(e)=> onTimeUpdate("message",e.target.value)}></textarea>
                        <button type="submit"><span>{button}</span></button>
                    </Col>
                    </Row>
                    {
                        status.message && <Col>
                        <p className={status.success===false ? "danger":"success"}>{status.message}</p>
                        </Col>
                    }
                    </form> 
                    </Col>
                </Row>
            </Container>
        </section>
    )
}