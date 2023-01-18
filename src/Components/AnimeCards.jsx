import {Button, Card, Container, Spacer, Text} from "@nextui-org/react";
import {useState} from "react";
import anime from "../Pages/Anime";
import {HeartIcon} from "../Pages/Home";

function HorizontalCard({onClick = null, poster, title, rating = 5, isMobile = true,...props}){
    const disabled = props.hasOwnProperty("disabled")
    const [isHovered, setIsHovered] = useState(false)
    let rates = [];
    for (let i = 1; i <= 5; i++){
        rates.push(i <= (rating/2) ? <span key={i} className="fa fa-star checked"></span> : <span key={i} className="fa fa-star"></span>)
    }
    let stl = {
        '&before': {
            boxShadow: 'inset green 0 0 100px'
        }
    }
    return (
        <Card isPressable={true} onClick={onClick} className={"h_card " + (disabled && !isHovered ? "disabled" : "")} onMouseOver={() => {
            setIsHovered(true)
        }} onMouseLeave={() => setIsHovered(false)}>
            <Card.Image css={{borderRadius: "$md"}} src={poster}/>
            <Card.Body className="h_card_body">
                <Text className="h_card_title">{title}</Text>
                <Text color="$gray800">{props.year}</Text>
                <div className="rating">
                    {rates}
                    <Text as="div">{rating/2}</Text>
                </div>
            </Card.Body>
        </Card>
    )
}
function AHorizontalCard({poster, title, rating = 5, isMobile = true,...props}){
    const disabled = props.hasOwnProperty("disabled")
    let rates = [];
    for (let i = 1; i <= 5; i++){
        rates.push(i <= (rating/2) ? <span key={i} className="fa fa-star checked"></span> : <span key={i} className="fa fa-star"></span>)
    }

    return (
        <Card className={"h_card " + (disabled ? "disabled" : "red_shadow")}>
            <Card.Image css={{borderRadius: "$md"}} src={poster}/>
            <Card.Body className="h_card_body">
                <Text className="h_card_title">{title}</Text>
                <Text color="$gray800">{props.year}</Text>
                <div className="rating">
                    {rates}
                    <Text as="div">{rating/2}</Text>
                </div>
            </Card.Body>
        </Card>
    )
}

function VerticalCard({history, poster, title, rating = 8, isEpisode = false, genres, releaseYear = "2015", ...props}){
    const disabled = props.hasOwnProperty("disabled")
    const noRating = props.hasOwnProperty("no-rating")
    const [isHovered, setIsHovered] = useState(false)

    let rates = [];
    for (let i = 1; i <= 5; i++){
        rates.push(i <= (rating/2) ? <span key={i} className="fa fa-star checked"></span> : <span key={i} className="fa fa-star"></span>)
    }
    let stl = {
        '&before': {
            boxShadow: 'inset green 0 0 100px'
        }
    }
    return (
        <Card isPressable={true} className={"w_card active " + (disabled && !isHovered ? "disabled" : "")} onMouseOver={() => {
            setIsHovered(true)
        }} onMouseLeave={() => setIsHovered(false)} onPress={() => {
            if (isEpisode){
                history.push(`/watch/${props.anime_id}/${props.latest_episode_id}`)
            }else{
                history.push("/anime/" + props.anime_id)
            }
        }}>
            <Card.Image css={{borderRadius: "$md"}} src={poster}/>
            {
                props.anime_type && (
                    <Button className="tag" color="error" disabled auto style={{opacity: 0.8, position: "absolute", right: 100}}>{props.anime_type}</Button>
                )
            }
            <Card.Body css={{paddingBottom: "0"}} className="h_card_body">
                <Text className="h_card_title">{title}</Text>
                {
                    isEpisode && (
                        <Text color="$gray800" className="card_desc">{props.episode}</Text>
                    )
                }
                <Text color="$gray800" className="card_desc genres">{genres}</Text>
                <Text color="$gray800" className="card_desc year">{releaseYear}</Text>
                {noRating && (
                    <div className="rating">
                        {rates}
                        <Text as="div">{rating/2}</Text>
                    </div>
                )}
            </Card.Body>
        </Card>
    )
}

function EpisodeCard({history, animeId, episodeId, poster, title, rating = 5, ...props}){
    const disabled = props.hasOwnProperty("disabled")
    const [isHovered, setIsHovered] = useState(false)
    let rates = [];
    for (let i = 1; i <= 5; i++){
        rates.push(i <= rating ? <span key={i} className="fa fa-star checked"></span> : <span key={i} className="fa fa-star"></span>)
    }
    let stl = {
        '&before': {
            boxShadow: 'inset green 0 0 100px'
        }
    }
    return (
        <Card isPressable className={"h_card " + (disabled && !isHovered ? "disabled" : "")} onMouseOver={() => {
            setIsHovered(true)
        }} onMouseLeave={() => setIsHovered(false)} onClick={(e) => {
            history.push(`/watch/${animeId}/${episodeId}`)
        }}>
            <Card.Image css={{borderRadius: "$md"}} src={poster}/>
            <Card.Body className="h_card_body">
                <Text className="h_card_title">{title}</Text>
                <div className="rating">
                    {rates}
                    <Text as="div">5.0</Text>
                    <Text as="div">(10k)</Text>
                </div>
                <Spacer y={1} css={{
                    backgroundColor: "$red700",
                    width: "90%",
                    height: "2px",
                    borderRadius: "100%",
                }}/>
            </Card.Body>
        </Card>
    )
}
export {HorizontalCard, VerticalCard, EpisodeCard, AHorizontalCard}