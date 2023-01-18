import {useHistory, useParams} from "react-router-dom";
import {Button, Card, Checkbox, Input, Loading, Modal, Spacer, Text} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {getAnime} from "../api";
import {HeartIcon} from "./Home";
import {useAuth} from "../contexts/AuthContext";
const Seasons = {
    Winter: "شتاء",
    Summer: "صيف",
    Fall: "خريف",
    Spring: "ربيع",
    "": ""
}

const Status = {
    "Currently Airing": "مسستمر",
    "Finished Airing": "مكتمل",
    "Not Yet Aired": "لم يتم العرض"
}

const Sources = {
    Manga: "مانجا",
    "Light novel": "رواية خفيفة",
    "Novel": "رواية",
    "Original": "اصلي"
}
function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    var abbrev = [ "K", "M", "B", "T" ];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
            // Here, we multiply by decPlaces, round, and then divide by decPlaces.
            // This gives us nice rounding to a particular decimal place.
            number = Math.round(number*decPlaces/size)/decPlaces;

            // Handle special case where we round up to the next abbreviation
            if((number == 1000) && (i < abbrev.length - 1)) {
                number = 1;
                i++;
            }

            // Add the letter for the abbreviation
            number += abbrev[i];

            // We are done... stop
            break;
        }
    }

    return number;
}

function Anime(){
    let { animeId } = useParams();
    const [details, setDetails] = useState(null);
    const [search, setSearch] = useState("");
    const [visible, setVisible] = useState(true);
    const [showFiller, setShowFiller] = useState(true);
    const history = useHistory()

    const {addFavouriteAnime, currentUser, favourites} = useAuth()

    useEffect(() => {
        setVisible(true)
        getAnime(animeId).then(res => {
            if (res === null){

            }else{
                console.log(res)
                setDetails(res)
            }
            setVisible(false)
        })
    }, [animeId])

    const Genres = () => {
        let genres = [];
        if(details.anime_genres){
            details.anime_genres.split(", ").map((genre, index) => {
                    genres.push( <Button key={index} color="warning" light rounded shadow auto>{genre}</Button>)
                }
            )
        }
        return genres;
    }
    const Episodes = () => {
        let episodes = [];
        if(details.episodes.data){
            details.episodes.data.map((episode, index) => {
                const click = () => {
                    history.push(`/watch/${details.anime_id}/${episode.episode_id}`)
                }
                if (!showFiller && episode.episode_name.includes("فلر")) return;
                if (search.length >= 1) {
                    if (episode.episode_name.includes(search)) {
                        episodes.push(<Button onClick={click} key={index} color="gradient" bordered
                                              auto>{episode.episode_name}</Button>)
                    }
                } else {
                    episodes.push(<Button onClick={click} key={index} color="gradient" bordered
                                          auto>{episode.episode_name}</Button>)
                }
            })
        }else{
            episodes = <Text>لا توجد حلقات</Text>
        }
        return episodes;
    }

    const addToFav = () => {
        if (currentUser){
            addFavouriteAnime(details.anime_id, details.anime_name, details.anime_cover_image_url, details.anime_genres ?? "", details.anime_release_year)
        }else {
            history.push("/signup")
        }
    }

    return (
        <div className="container">
            {details && (
                <div className="row header anime_container">
                    <div className="cover_img" style={{
                        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0) 20%, rgba(255,255,255,1)), url(${details.anime_banner_image_url ?? details.anime_cover_image_url})`
                    }}/>
                    <div className="desc_container">
                        <Spacer/>
                        <div className="row">
                            <Text h3>{details.anime_name}</Text>
                            <Spacer y={0} x={2}/>
                            <div className="row">
                                <Button color="error" auto light shadow>عدد الحلقات: {details.episodes.count ?? "0"}</Button>
                                <Spacer y={0} x={1}/>
                                <Button color="error" auto light css={{fontWeight: "bolder"}} shadow>مترجم</Button>
                            </div>
                           </div>
                        <div className="rating">
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star checked"></span>
                            <span className="fa fa-star"></span>
                            <span className="fa fa-star"></span>
                            <Text as="div">المتوسط: {details.more_info_result.score/2} ({abbrNum(details.more_info_result.scored_by, 2)})</Text>
                        </div>
                        <Spacer y={2}/>
                        <Button as="a" target="_" href={details.more_info_result.trailer_url} light dir="ltr" shadow color="gradient" color="success" auto icon={<HeartIcon/>} style={{width: "fit-content"}}>العرض الدعائي</Button>
                        <Spacer/>
                        <Text dir="rtl" color="$gray800" as="p">{details.anime_description}</Text>
                        <Spacer y={1}/>
                        <div className="row genres">
                            <Genres/>
                        </div>
                        <Spacer y={1}/>
                        <div className="row">
                            {
                                !favourites.hasOwnProperty(details.anime_id) && (
                                    <>
                                        <Button color="gradient" auto onClick={() => {
                                            addToFav()
                                        }}>أضف الي المفضلة</Button>
                                        <Spacer x={1}/>
                                    </>
                                )
                            }
                            <Button color="gradient" ghost shadow auto>تمت المشاهدة</Button>
                        </div>
                        <Spacer y={1} css={{
                            backgroundColor: "$gray100",
                            width: "100%",
                            height: "2px",
                            borderRadius: "100%",
                        }}/>
                        <Spacer y={2}/>
                        <div className="row header">
                            <Text h2>الحلقات</Text>
                            <Checkbox dir="ltr" isSelected={showFiller} color="error" onChange={setShowFiller}>
                                اظهار حلقات الفلر
                            </Checkbox>
                            <Input type="number" bordered placeholder="اكتب رقم الحلقة" value={search} onChange={(e) => setSearch(e.target.value)}/>
                        </div>
                        <div className="row genres wrap scrollable">
                            <Episodes/>
                        </div>
                    </div>
                    <div className="details_container">
                        <Card className="w_card red_shadow">
                            <Card.Image css={{borderRadius: "$md"}} src={details.anime_cover_image_url}/>

                            <div className="anime_desc">
                                <Spacer y={1} css={{
                                    backgroundColor: "$gray100",
                                    width: "100%",
                                    height: "2px",
                                    borderRadius: "100%",
                                }}/>
                                <Card.Body>
                                    <div className="column">
                                        <Text h4>الحالة</Text>
                                        <Spacer y={-0.5}/>
                                        <Text auto css={{color: "$gray800"}}>{Status[details.anime_status]}</Text>
                                        <Spacer y={0.5}/>
                                        <Text h4>المصدر</Text>
                                        <Spacer y={-0.5}/>
                                        <Text auto css={{color: "$gray800"}}>{Sources[details.more_info_result.source]}</Text>
                                        <Spacer y={0.5}/>
                                        <Text h4>الموسم</Text>
                                        <Spacer y={-0.5}/>
                                        <Text auto css={{color: "$gray800"}}>{Seasons[details.anime_season] + " " + details.anime_release_year}</Text>
                                        <Spacer y={0.5}/>
                                        <Text h4>الاستوديو</Text>
                                        <Spacer y={-0.5}/>
                                        <Text auto css={{color: "$gray800"}}>{details.more_info_result.anime_studios}</Text>
                                    </div>
                                </Card.Body>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
            <Modal
                preventClose
                aria-labelledby="modal-title"
                open={visible}
                blur
            >
                <Modal.Body>
                    <Loading color="error" size="xl" />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Anime