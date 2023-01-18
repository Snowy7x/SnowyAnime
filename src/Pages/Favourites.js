import {useAuth} from "../contexts/AuthContext";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {VerticalCard} from "../Components/AnimeCards";
import {Spacer, Text} from "@nextui-org/react";

export default function Favourites() {

    const {currentUser, favourites} = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (!currentUser) return history.push("/login")
    }, [])

    const List = () => {
        let cards = []
        console.log(favourites)
        if (!favourites) return
        for (let animeId in favourites) {
            let anime = favourites[animeId];
            let data = {
                anime_id: animeId
            }
            cards.push(
                    <VerticalCard key={animeId} history={history} title={anime.animeName} poster={anime.coverUrl} genres={anime.genres} releaseYear={anime.year} {...data} />
            )
        }
        return cards
    }

    return (
        <div className="container">
            <Spacer y={2}/>
            <div className="row header">
                <Text h2>الأنميات المفضلة</Text>
            </div>
            <div className="row">
                <List/>
            </div>
        </div>
    )
}