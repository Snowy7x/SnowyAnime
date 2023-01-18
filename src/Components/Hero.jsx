import {AHorizontalCard, HorizontalCard, VerticalCard} from "./AnimeCards";
import {Button, Card, Spacer, Text} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {getLatest} from "../api";
import {useHistory} from "react-router-dom";
import Carousel from "react-multi-carousel";
import {HeartIcon} from "../Pages/Home";

const mainAnimes = [
    {
        animeName:"Jujutsu Kaisen",
        season: "1",
        year: "2020",
        description: "ينغمس طالب المدرسة الثانوية \"يوجي إيتادوري\" في أنشطة خوارقٍ لا أساس لها من الصحة، ويقضي أيامه إما في غرفة النادي أو المستشفى، حيث يزور جده طريح الفراش. ومع ذلك ، سرعان ما يأخذ نمط الحياة المريح هذا منعطفًا غريبًا عندما يصادف دون علم عنصرًا ملعونًا. أثار سلسلة من الأحداث الخارقة للطبيعة، فوجد يوجي نفسه فجأة مدفوعًا إلى عالم اللعنات - كائنات مروعة تكونت من خبث الإنسان وسلبيته - بعد ابتلاع العنصر المذكور ، وكشف أنه إصبع ينتمي إلى الشيطان \"ريومين سوكونا\"، (ملك اللعنات) يختبر يوجي بشكل مباشر التهديد الذي تشكله هذه اللعنات على المجتمع عندما يكتشف قواه الجديدة.\n",
        rate: "9.31",
        trailer: "https://www.youtube.com/embed/4A_X-Dvl0ws?enablejsapi=1&wmode=opaque&autoplay=1",
        animeUrl: "/anime/2365",
        bannerUrl: "https://c4.wallpaperflare.com/wallpaper/100/696/960/yuji-itadori-jujutsu-kaisen-sukuna-hd-wallpaper-preview.jpg",
        coverUrl: "https://img.anslayer.com/anime/anime/cover-image/anime-cover-e346826c07aecc8fd649173f36694173.jpg"
    },
    {
        animeName: "Blue Lock",
        season: "1",
        year: "2022",
        description: "تدور احداث هذا الانمي عندما تقرر احدى الاعضاء الجدد من الاتحاد الياباني المدعوة \"انري\" بأفتتاح مشروع يدعى ب\"القفل الازرق\" حيث يتم فيه جمع افضل ثلاثمئه مهاجم في كل انحاء اليابان في هذا المكان وجعلهم يكونون فريق كرة قدم ومن بين هؤلاء الثلاثمئه مهاجم سيتم اختيار مهاجم واحد ليمثل المنتخب الياباني ، فيتم اختيار فتى يدعى \"ايساغي يوييتشي\" للانضمام ، فهل سينجح هو وحده من بين الثلاثمئه مهاجم ويمثل المنتخب الياباني ويكون الافضل؟",
        rate: "9.13",
        trailer: "https://www.youtube.com/watch?v=dwHYQ_QOm1s&feature=youtu.be&ab_channel=CrunchyrollFR",
        animeUrl: "/anime/2721",
        bannerUrl: "https://images4.alphacoders.com/116/thumb-1920-1165712.jpg",
        coverUrl: "https://img.anslayer.com/anime/anime/cover-image/anime-cover-ab74feda3d019f301f6fc824ae5a4b35.jpg"
    },
    {
        animeName: "Tokyo Revengers: Seiya Kessen-hen",
        season: "2",
        year: "2023",
        description: "تكملة أحداث الموسم السابق\n",
        rate: "8.82",
        trailer: "https://www.youtube.com/watch?v=FIeBd5NbOWQ&feature=youtu.be&ab_channel=TV%E3%82%A2%E3%83%8B%E3%83%A1%E3%80%8E%E6%9D%B1%E4%BA%AC%E3%83%AA%E3%83%99%E3%83%B3%E3%82%B8%E3%83%A3%E3%83%BC%E3%82%BA%E3%80%8F%E3%83%81%E3%83%A3%E3%83%B3%E3%83%8D%E3%83%AB",
        animeUrl: "/anime/3116",
        bannerUrl: "https://www.xtrafondos.com/wallpapers/resoluciones/21/personajes-de-tokyo-revengers_2560x1440_8137.jpg",
        coverUrl: "https://img.anslayer.com/anime/anime/cover-image/anime-cover-5f48128b3d36653c5165dac18d748535.jpg"
    },
    {
        animeName: "Shinobi no Ittoki",
        season: "1",
        year: "2022",
        description: "يكتشف الفتى العادي إيتوكي ساكورابا أنه الوريث التاسع عشر لنينجا إيغا بعد النجاة من هجوم من عشيرة .كوجا المنافسة. يتعلم إيتوكي أن يصبح نينجا من عشيرة إيغا وينضم إلى الحرب بين قبيلتي إيغا و كوجا",
        rate: "8.82",
        trailer: "https://www.youtube.com/watch?v=ChhpLcr-z58&ab_channel=DMMpictures",
        animeUrl: "/anime/4655",
        bannerUrl: "https://www.theanimedaily.com/wp-content/uploads/2022/10/Shinobi-No-Ittoki-Episode-1.jpg",
        coverUrl: "https://img.anslayer.com/anime/anime/cover-image/anime-cover-8a24558ad0c2d23fed10054b3e0136b3.jpg"
    }
]

const responsive = {
    desktop: {
        breakpoint: { max: 5000, min: 1024 },
        items: 3,
        paritialVisibilityGutter: 60
    },
    tablet: {
        breakpoint: { max: 2024, min: 464 },
        items: 1,
        paritialVisibilityGutter: 50
    },
    mobile: {
        breakpoint: { max: 1000, min: 0 },
        items: 1,
        paritialVisibilityGutter: -10
    }
};

export default function Hero() {

    const [currentH, setCurrentH] = useState(0)
    const history = useHistory()

    return (
        <>
            <div className="mobile_hero">

                <Carousel ssr partialVisbile responsive={responsive} deviceType="mobile" itemClass="image-hero-item">
                    {
                        mainAnimes.map((anime, index) => {
                            return (
                                <Card isPressable={true} onClick={() => history.push(anime.animeUrl)} key={index} className="main_card">
                                    <Card.Body css={{ position: "absolute", zIndex: "1", top: 0, p: "$10" }}>
                                        <a style={{
                                            backgroundColor: "white",
                                            color: "black",
                                            width: "fit-content",
                                            padding: "5px 10px",
                                            fontWeight: "bolder",
                                            fontSize: "16px",
                                            borderRadius: "10px"
                                        }}>الموسم {anime.season}</a>
                                        <Text h3>{anime.animeName}</Text>
                                        <Spacer y={2}/>
                                    </Card.Body>
                                    <Card.Image className="hero_img" src={anime.bannerUrl}/>
                                    <div className="special_cards">
                                        <AHorizontalCard title={anime.animeName} year={anime.year} rating={anime.rate} poster={anime.coverUrl} />
                                    </div>
                                </Card>
                            )
                        })
                    }
                </Carousel>

            </div>
            <div className="hero">
                <Card className="main_card">
                    <Card.Body css={{ position: "absolute", zIndex: "1", bottom: 0, p: "$15" }}>
                        <a style={{
                            backgroundColor: "white",
                            color: "black",
                            width: "fit-content",
                            padding: "10px 30px",
                            fontWeight: "bolder",
                            borderRadius: "10px"
                        }}>الموسم {mainAnimes[currentH].season}</a>
                        <Text h2>{mainAnimes[currentH].animeName}</Text>
                        <Text as="p" className="hero_desc" css={{
                            maxWidth: "30vw",
                        }}>{mainAnimes[currentH].description}</Text>
                        <Spacer y={2}/>
                        <div className="btn_container">
                            <Button isPressable={true} onClick={() => history.push(mainAnimes[currentH].animeUrl)} shadow color="gradient" auto style={{width: "fit-content"}}>مشاهدة الأنمي</Button>
                            <Button as="a" href={mainAnimes[currentH].trailer} target="_" dir="ltr" shadow color="gradient" color="error" auto icon={<HeartIcon/>} style={{width: "fit-content"}}>العرض الدعائي</Button>
                        </div>
                    </Card.Body>
                    <Card.Image className="hero_img" src={mainAnimes[currentH].bannerUrl}/>
                </Card>
                <div className="special_cards">
                    {mainAnimes.map((anime, index) => {
                        let list = currentH !== index ? {disabled: ""} : {}
                        return (
                            <HorizontalCard onClick={() => {
                                setCurrentH(index)
                            }} {...list} key={index} title={anime.animeName} year={anime.year} rating={anime.rate} poster={anime.coverUrl}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}