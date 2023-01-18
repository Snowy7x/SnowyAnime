import {VerticalCard} from "./AnimeCards";
import {Button, Spacer, Text} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {getLatest} from "../api";
import {useHistory} from "react-router-dom";

export default function Latest() {
    const [latest, setLatest] = useState([])
    const history = useHistory()

    useEffect(() => {
        getLatest().then(res => {
            setLatest(res.slice(0, 16))
        })
    }, [])
    return (
        <div className="container">
            <div className="row header">
                <Text h2>اخر الحلقات</Text>
                <Button css={{px: "$13", zIndex: "2"}} auto bordered shadow color="gradient">
                    المزيد
                    <Spacer x={2}/>
                    <i className="fa fa-angle-right f-6"></i>
                </Button>
            </div>
            <div className="latest row wrap" style={{justifyContent: "center"}}>
                {latest && latest.length > 0 ?
                    latest.map((anime, index) => {
                        return (
                            <VerticalCard key={index} history={history} poster={anime.anime_cover_image_url} no-rating
                                          title={anime.anime_name} isEpisode={true} episode={anime.latest_episode_name}
                                          genres={anime.anime_genres}
                                          releaseYear={anime.anime_release_year} {...anime}/>
                        )
                    }) : <></>}
            </div>
        </div>
    )
}