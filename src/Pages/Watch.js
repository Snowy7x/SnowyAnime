import {Button, Card, Container, Dropdown, Input, Loading, Modal, Spacer, Text} from "@nextui-org/react";
import Player from 'griffith'
import {useHistory, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {getAnime, getEpisodeLinks} from "../api";
import {EpisodeCard} from "../Components/AnimeCards";
import {HeartIcon} from "./Home";

const Qualities = {
    "1080p": "fhd",
    "720p": "hd",
    "480p": "sd",
    "av": "sd"
}

function Watch(){
    let { animeId, ep } = useParams();
    const [servers, setServers] = useState(null)
    const [episode, setEpisode] = useState({})
    const [anime, setAnime] = useState(null)
    const [server, setServer] = useState(-1)
    const [sources, setSources] = useState("")
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(true);
    const [selectedServer, setSelectedServer] = useState("");
    const selectedServerStr = useMemo(
        () => Array.from(selectedServer).join(", ").replaceAll("_", " "),
        [selectedServer]
    );

    const history = useHistory()

    const changeServer = (i) => {
        let newSources = {}
        console.log("Changing server...")
        if (!servers || servers.length <= 0) return;
        if (servers !== undefined && servers[i].urls.length <= 0) {
            console.log("Nope")
            if (servers.length > i + 1) {
                return changeServer(i + 1)
            }
            return;
        }
        console.log("Yes")
        for (let s of servers[i].urls) {
            newSources[Qualities[s.label]] = {
                play_url: s.file
            }
        }
        console.log(newSources)
        setSources(newSources)
    }

    useEffect(() => {
        setModal(true)
        getEpisodeLinks(animeId, ep).then(res => {
            setEpisode(res)
            setServers(res.servers)
            setModal(false)
        })
        getAnime(animeId).then(res => {
            setAnime(res)
        })
    }, [animeId, ep])

    useEffect(() => {
        if (servers && servers.length >= 1){
            changeServer(0)
        }
    }, [servers])

    useEffect(() => {
        console.log("Changing..")
        if (servers){
            console.log("Changing.....")
            let serv = servers.findIndex(s => s.shorten === selectedServerStr)
            changeServer(serv)
        }
    }, [selectedServerStr])

    const Episodes = ({max = 5}) => {
        let episodes = [];
        if (search.length >= 1){
            anime.episodes.data.map((episode, index) => {
                let prop = episode.episode_id == ep ? {} : {disabled: ""}
                if (episode.episode_name.includes(search)){
                    episodes.push(
                        <EpisodeCard history={history} animeId={animeId} episodeId={episode.episode_id} title={episode.episode_name} poster={anime.anime_cover_image_url} {...prop}/>
                    )
                }
            })
        }else{
            anime.episodes.data.map((episode, index) => {
                let prop = episode.episode_id == ep ? {} : {disabled: ""}
                episodes.push(
                    <EpisodeCard history={history} animeId={animeId} episodeId={episode.episode_id}  title={episode.episode_name} poster={anime.anime_cover_image_url} {...prop} {...episode}/>
                )
            })
        }
        if (episodes.length > max) episodes = episodes.slice(0, max)
        return episodes;
    }

    return (
        <div className="container">
            {anime && (
                <>
                    <div className="cover_img" style={{
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0) 20%, rgba(255,255,255,1)), url(${anime.anime_banner_image_url ?? anime.anime_cover_image_url})`
                }}/>
                    <Button className="anime_title" onClick={() => {
                        history.push("/anime/" + anime.anime_id)
                    }} color="gradient" ghost auto css={{width: "fit-content", fontSize: "$md"}}>{anime.anime_name + " - " + episode.episode_name}</Button>
                    <Spacer y={1}/>
                    <div className="watch_hero">
                        <Card style={{backgroundColor: "transparent"}} className="main_card">
                            <Player hiddenQualityMenu={false} standalone={true} hideMobileControls={false} title={anime.anime_name + episode.episode_name} dir="ltr" className="hero_img" id="anime_player" cover={anime.anime_banner_image_url ?? anime.anime_cover_image_url} sources={sources}/>
                            <Spacer y={2}/>
                            <div className="row" style={{justifyContent: "space-between"}}>
                                <Button auto color="gradient" shadow ghost>الحلقة التالية</Button>
                                <Dropdown>
                                    <Dropdown.Button shadow color="error" css={{zIndex: "0", tt: "capitalize" }}>
                                        {selectedServerStr === "" ? "اختيار سيرفر" : selectedServerStr}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Single selection actions"
                                        color="error"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={selectedServer}
                                        onSelectionChange={setSelectedServer}
                                    >
                                        {
                                            servers && (
                                                servers.map((server) => {
                                                    return (
                                                        <Dropdown.Item key={server.shorten}>{server.shorten}</Dropdown.Item>
                                                    )
                                                })
                                            )
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>                            <Button auto color="gradient" shadow ghost>الحلقة السابقة</Button>
                            </div>
                        </Card>
                        <div className="special_cards episode_cards">
                            <Input type="number" status="primary" placeholder="اكتب رقم الحلقة" value={search} onChange={(e) => setSearch(e.target.value)}/>
                            <Spacer y={1}/>
                            <Episodes max={5}/>
                        </div>
                    </div>
                </>
            )}
            <Modal
                preventClose
                aria-labelledby="modal-title"
                open={modal}
                blur
            >
                <Modal.Body>
                    <Loading color="error" size="xl" />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Watch