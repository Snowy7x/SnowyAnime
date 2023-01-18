import {useEffect, useState} from "react";
import {getSchedule} from "../api";
import {Text} from "@nextui-org/react";
import {VerticalCard} from "../Components/AnimeCards";
import {useHistory} from "react-router-dom";

export default function Schedule() {

    const [schedule, setSchedule] = useState();
    const history = useHistory()

    useEffect( () => {
        getSchedule().then(data => {
            setSchedule(data)
        })
    }, [])

    return (
        <div className="container">
            { schedule && (
                <>
                    <div className="row header">
                        <Text h2>السبت</Text>
                    </div>
                    <div className="row wrap">
                        {
                            schedule.hasOwnProperty("Saturday") && (
                                schedule["Saturday"].map((anime, index) => {
                                    return (
                                        <VerticalCard key={index} history={history} title={anime.anime_name} poster={anime.anime_cover_image_url} genres={anime.anime_type} releaseYear={anime.anime_release_year} {...anime} />
                                    )
                                })
                            )
                        }

                    </div>

                    <div className="row header">
                        <Text h2>الأحد</Text>
                    </div>
                    <div className="row wrap">
                        {
                            schedule.hasOwnProperty("Sunday") && (
                                schedule["Sunday"].map((anime, index) => {
                                    return (
                                        <VerticalCard key={index} history={history} title={anime.anime_name} poster={anime.anime_cover_image_url} genres={anime.anime_type} releaseYear={anime.anime_release_year} {...anime} />
                                    )
                                })
                            )
                        }
                    </div>

                    <div className="row header">
                        <Text h2>الاثنين</Text>
                    </div>
                    <div className="row wrap">
                        {
                            schedule.hasOwnProperty("Monday") && (
                                schedule["Monday"].map((anime, index) => {
                                    return (
                                        <VerticalCard key={index} history={history} title={anime.anime_name} poster={anime.anime_cover_image_url} genres={anime.anime_type} releaseYear={anime.anime_release_year} {...anime} />
                                    )
                                })
                            )
                        }

                    </div>

                    <div className="row header">
                        <Text h2>الثلاثاء</Text>
                    </div>
                    <div className="row wrap">
                        {
                            schedule.hasOwnProperty("Tuesday") && (
                                schedule["Tuesday"].map((anime, index) => {
                                    return (
                                        <VerticalCard key={index} history={history} title={anime.anime_name} poster={anime.anime_cover_image_url} genres={anime.anime_type} releaseYear={anime.anime_release_year} {...anime} />
                                    )
                                })
                            )
                        }

                    </div>

                    <div className="row header">
                        <Text h2>الأربعاء</Text>
                    </div>
                    <div className="row wrap">
                        {
                            schedule.hasOwnProperty("Wednesday") && (
                                schedule["Wednesday"].map((anime, index) => {
                                    return (
                                        <VerticalCard key={index} history={history} title={anime.anime_name} poster={anime.anime_cover_image_url} genres={anime.anime_type} releaseYear={anime.anime_release_year} {...anime} />
                                    )
                                })
                            )
                        }

                    </div>

                    <div className="row header">
                        <Text h2>الخميس</Text>
                    </div>
                    <div className="row wrap">
                        {
                            schedule.hasOwnProperty("Thursday") && (
                                schedule["Thursday"].map((anime, index) => {
                                    return (
                                        <VerticalCard key={index} history={history} title={anime.anime_name} poster={anime.anime_cover_image_url} genres={anime.anime_type} releaseYear={anime.anime_release_year} {...anime} />
                                    )
                                })
                            )
                        }

                    </div>

                    <div className="row header">
                        <Text h2>الجمعة</Text>
                    </div>
                    <div className="row wrap">
                        {
                            schedule.hasOwnProperty("Friday") && (
                                schedule["Friday"].map((anime, index) => {
                                    return (
                                        <VerticalCard key={index} history={history} title={anime.anime_name} poster={anime.anime_cover_image_url} genres={anime.anime_type} releaseYear={anime.anime_release_year} {...anime} />
                                    )
                                })
                            )
                        }

                    </div>
                </>
            )}
        </div>
    )
}