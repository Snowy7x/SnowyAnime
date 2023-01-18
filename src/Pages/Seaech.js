import {
    Button,
    Card,
    Container,
    Dropdown,
    Input,
    Loading,
    Modal,
    Pagination,
    Popover,
    Spacer,
    Text
} from "@nextui-org/react";
import "../styles/Home.css"
import {HorizontalCard, VerticalCard} from "../Components/AnimeCards";
import Latest from "../Components/Latest"
import {useEffect, useMemo, useState} from "react";
import {getSearchResults, PageLimit} from "../api";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {SearchIcon} from "../Components/Nav";

const ids_genres ={
    'اكشن': '1',
    'مغامرات': '2',
    'سيارات': '3',
    'كوميديا': '4',
    'جنون': '5',
    'شياطين': '6',
    'غموض': '7',
    'دراما': '8',
    'ايتشي': '9',
    'خيال': '10',
    'العاب': '11',
    'تاريخي': '12',
    'رعب': '13',
    'اطفال': '14',
    'سحر': '15',
    'فنون قتالية': '16',
    'ميكا': '17',
    'موسيقى': '18',
    'محاكاة ساخرة': '19',
    'ساموراي': '20',
    'رومانسي': '21',
    'مدرسي': '22',
    'خيال علمي': '23',
    'شوجو': '24',
    'شونين': '25',
    'فضاء': '26',
    'رياضي': '27',
    'قوى خارقة': '28',
    'مصاص دماء': '29',
    'حريم': '30',
    'شريحة من الحياة': '31',
    'خارق للطبيعة': '32',
    'عسكري': '33',
    'بوليس': '34',
    'نفسي': '35',
    'اثارة': '36',
    'سينين': '37',
    'جوسي': '38',
    'ايسيكاي': '39'
}
const genres = [
    'اكشن',            'مغامرات',      'سيارات',
    'كوميديا',         'جنون',         'شياطين',
    'غموض',            'دراما',        'ايتشي',
    'خيال',            'العاب',        'تاريخي',
    'رعب',             'اطفال',        'سحر',
    'فنون قتالية',     'ميكا',         'موسيقى',
    'محاكاة ساخرة',    'ساموراي',      'رومانسي',
    'مدرسي',           'خيال علمي',    'شوجو',
    'شونين',           'فضاء',         'رياضي',
    'قوى خارقة',       'مصاص دماء',    'حريم',
    'شريحة من الحياة', 'خارق للطبيعة', 'عسكري',
    'بوليس',           'نفسي',         'اثارة',
    'سينين',           'جوسي',         'ايسيكاي'
]
const years = [
    2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
    2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004,
    2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994,
    1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984,
    1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974,
    1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964,
    1963, 1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954,
    1953, 1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944,
    1943, 1942, 1941, 1940, 1939, 1938, 1937, 1936, 1935, 1934,
    1933, 1932, 1931, 1930, 1929, 1928, 1927, 1926, 1925, 1924,
    1923, 1922, 1921, 1920
    ]
const Seasons = {
    "الشتاء": "Winter",
    "الخريف": "Fall",
    "الربيع": "Spring",
    "الصيف": "Summer"
}
const Types = {
    "مسلسل": "TV",
    "فلم": "Movie",
    "اوفا": "OVA",
    "اونا": "ONA",
    "خاصة": "Special"
}

function Search({isSearch = false}){
    const history = useHistory()
    const location = useLocation()

    const [animes, setAnimes] = useState([])
    const [pages, setPages] = useState(1)
    const [page, setPage] = useState(1)
    const [selectedGenres, setSelectedGenre] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedSeason, setSelectedSeason] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(true);

    let {query_} = useParams()

    const Search = (q = null) => {
        setVisible(true)
        setAnimes([])
        let ids = ""
        console.log("IsSearch: ", isSearch)
        Array.from(selectedGenres).map((gen, index) => {
            ids += ids_genres[gen] + ", "
        })
        if (ids.length >= 2){
            ids = ids.slice(0, ids.length-2)
        }

        getSearchResults({
            query: isSearch ? query_ : query,
            type: Types[selectedTypeStr],
            years: selectedYearStr,
            season: Seasons[selectedSeasonStr],
            genres: ids

        }, page).then(res => {
            if (isSearch){
                setQuery(query_)
                history.replace(location.pathname.substring(0, location.pathname.lastIndexOf('/')))
                isSearch = false
            }
            if (res){
                if (res.length > PageLimit && page >= pages) {
                    setPages(pages + (pages - page + 1))
                }
            }else {
                setPages(pages-1)
            }
            setAnimes(res ? res.slice(0, PageLimit) : [])
            setVisible(false)
        })
    }
    useEffect(() => {
        Search()
    }, [page])

    useEffect(() => {
        if (query_ && query_.length >= 2) {
            isSearch = true;
            Search()
        }
    }, [query_])

    const selectedSeasonStr = useMemo(
        () => Array.from(selectedSeason).join(", ").replaceAll("_", " "),
        [selectedSeason]
    );

    const selectedYearStr = useMemo(
        () => Array.from(selectedYear).join(", ").replaceAll("_", " "),
        [selectedYear]
    );

    const selectedGenreStr = useMemo(
        () => Array.from(selectedGenres).join(", ").replaceAll("_", " "),
        [selectedGenres]
    );
    const selectedGenreIdStr = useMemo(
        () => Array.from(selectedGenres).join(", ").replaceAll("_", " "),
        [selectedGenres]
    );

    let selectedTypeStr = useMemo(
        () => Array.from(selectedType).join(", ").replaceAll("_", " "),
        [selectedType]
    );
    return (
        <div className="container">
            <Spacer y={1}/>
            <div dir="ltr" className="row wrap" style={{justifyContent: "space-evenly"}}>
                <Input size="md" css={{
                    minWidth: "250px"
                }} placeholder="Write anime name"
                       className="search_bar"
                       contentRight={<SearchIcon/>}
                       autoComplete="true"
                       value={query}
                       onChange={(e) => {
                           setQuery(e.target.value)
                       }}
                />
                <Dropdown>
                    <Dropdown.Button className="search_btn" shadow color="error" css={{zIndex: "0", tt: "capitalize" }}>
                        {selectedTypeStr === "" ? "نوع الأنمي" : selectedTypeStr}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="error"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedType}
                        onSelectionChange={setSelectedType}
                    >
                        <Dropdown.Item key="مسلسل">مسلسل</Dropdown.Item>
                        <Dropdown.Item key="فلم">فلم</Dropdown.Item>
                        <Dropdown.Item key="اونا">اونا</Dropdown.Item>
                        <Dropdown.Item key="اوفا">اوفا</Dropdown.Item>
                        <Dropdown.Item key="خاصة">خاصة</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Button className="search_btn" shadow color="error" css={{zIndex: "0", tt: "capitalize" }}>
                        {selectedSeasonStr === "" ? "الموسم" : selectedSeasonStr}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="error"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedSeason}
                        onSelectionChange={setSelectedSeason}
                    >
                        <Dropdown.Item key="الشتاء">الشتاء</Dropdown.Item>
                        <Dropdown.Item key="الصيف">الصيف</Dropdown.Item>
                        <Dropdown.Item key="الخريف">الخريف</Dropdown.Item>
                        <Dropdown.Item key="الربيع">الربيع</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Button className="search_btn card_desc" shadow color="error" css={{zIndex: "0", tt: "capitalize" }}>
                        {selectedYearStr === "" ? "السنة" : selectedYearStr}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Multiple selection actions"
                        color="error"
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={selectedYear}
                        onSelectionChange={setSelectedYear}
                    >
                        {years.map((year) => {
                            return (
                                <Dropdown.Item key={year}>{year}</Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Button className="search_btn card_desc" shadow color="error" css={{zIndex:"0", tt: "capitalize" }}>
                        {selectedGenreStr === "" ? "النوع" : selectedGenreStr}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Multiple selection actions"
                        color="error"
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={selectedGenres}
                        onSelectionChange={setSelectedGenre}
                    >
                        {genres.map((genre, index) => {
                            return (
                                <Dropdown.Item key={genre}>{genre}</Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <Spacer y={1}/>
            <div className="row wrap" style={{justifyContent: "center"}}>
                <Button shadow ghost color="error" auto css={{mx: "10px"}} onClick={() => {
                    setSelectedGenre("")
                    setSelectedType("")
                    setSelectedYear("")
                    setSelectedSeason("")
                    setQuery("")
                    selectedYearStr = selectedGenreStr = selectedTypeStr = selectedSeasonStr = ""
                }}>اعادة</Button>
                <Button shadow ghost auto color="success" css={{mx: "10px"}} onClick={() => {
                    Search()
                }}>بحث</Button>
            </div>
            <Spacer y={3}/>
            <div className="row wrap">
            {animes && (
                animes.map((anime, index) => {
                    return (
                        <VerticalCard key={index} history={history} title={anime.anime_name} poster={anime.anime_cover_image_url} genres={anime.anime_genres} releaseYear={anime.anime_release_year} {...anime} />
                    )
                })
            )}
            </div>
            <div style={{display: "flex", justifyContent: "center"}}    >
                <Pagination dir="ltr" color="error" total={pages} initialPage={1} onChange={(num) => {
                    setPage(num)
                }}/>
            </div>
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

export default Search