import {Button, Card, Container, Spacer, Text} from "@nextui-org/react";
import "../styles/Home.css"
import {AHorizontalCard, HorizontalCard, VerticalCard} from "../Components/AnimeCards";
import Latest from "../Components/Latest"
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import Hero from "../Components/Hero";

export const HeartIcon = ({
    fill = 'currentColor',
    filled,
    size,
    height,
    width,
    label,
    ...props
  }) => {
    return (
        <i className="fa fa-play-circle fa-6" aria-hidden="true"></i>
    );
  };

function Home(){
    return (
        <div className="container">
            <Hero/>
            <Spacer y={3}/>
            <Latest/>
        </div>
    )
}

export default Home