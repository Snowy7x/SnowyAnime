import {Navbar, Link, Text, Avatar, Dropdown, Input, Button} from "@nextui-org/react";
import {useHistory, useLocation} from "react-router-dom";
import {useRef, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import logo from "../logo.svg"

const SearchIcon = () => {
    return (
        <svg className="svg-icon search-icon" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 19.9 19.7"><title id="title">Search Icon</title>
            <desc id="desc">A magnifying glass icon.</desc>
            <g className="search-path" fill="none" stroke="#848F91">
                <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4"/>
                <circle cx="8" cy="8" r="7"/>
            </g>
        </svg>
    )
}

export {SearchIcon}
export default function Nav() {

    const location = useLocation()
    const history = useHistory()
    const [search, setSearch] = useState()

    const {currentUser, logout} = useAuth()

    function takeAction(actionKey) {
        switch (actionKey) {
            case "logout":
                logout()
                break
            case "fav":
                history.push("/favourites")
                break
        }
    }

    return (
        <Navbar isBordered maxWidth="fluid" borderWeight="light" variant="static">
            <Navbar.Toggle showIn="xs"/>
            <Navbar.Brand hideIn="xs" style={{height: "100%"}} css={{
                "@xs": {
                    w: "12%",
                },
            }}>
                <img className="logo" src={logo}/>
                <Text b color="inherit" hideIn="xs">
                    Snowy<Text color='error' as="i">Anime</Text>
                </Text>
            </Navbar.Brand>
            <Navbar.Content
                enableCursorHighlight
                activeColor="error"
                hideIn="xs"
                variant="default"
                css={{
                    "@xs": {
                        w: "12%",
                        jc: "flex-end",
                    },
                }}
            >
                <Navbar.Link isActive={location.pathname === "/"}
                             href={location.pathname === "/" ? "#" : "/"}>Home</Navbar.Link>
                <Navbar.Link isActive={location.pathname.includes("/anime") || location.pathname.includes("/watch")}
                             href={(location.pathname.includes("/anime") || location.pathname.includes("/watch")) ? "#" : "/anime"}>Animes</Navbar.Link>
                <Navbar.Link isActive={location.pathname === "/schedule"}
                             href={location.pathname === "/schedule" ? "#" : "/schedule"}>Schedule</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content
                css={{
                    "@xs": {
                        w: "8%",
                        jc: "flex-end",
                    },
                }}
            >
                <Input size="md" css={{
                    minWidth: "250px  !important",
                }} placeholder="Write anime name"
                       contentRight={<SearchIcon/>}
                       value={search}
                       enterKeyHint="enter"
                       onChange={(e) => setSearch(e.target.value)}
                       onKeyPress={(e) => {
                           if (e.key === "Enter") {
                               history.push("/search/" + search)
                           }
                       }}
                />
                {
                    currentUser ? (
                        <Navbar.Content css={{
                            "@xs": {
                                w: "100%",
                                jc: "flex-end",
                            },
                        }}>
                            <Dropdown placement="bottom-right">
                                <Navbar.Item>
                                    <Dropdown.Trigger>
                                        <Avatar
                                            bordered
                                            as="button"
                                            color="error"
                                            size="md"
                                            src={currentUser.photoURL}
                                        />
                                    </Dropdown.Trigger>
                                </Navbar.Item>
                                <Dropdown.Menu
                                    aria-label="User menu actions"
                                    color="warning"
                                    onAction={(actionKey) => takeAction(actionKey)}
                                >
                                    <Dropdown.Item key="profile" css={{height: "$18"}}>
                                        <Text b color="inherit" css={{d: "flex"}}>
                                            اسم المستخدم
                                        </Text>
                                        <Text b color="inherit" css={{d: "flex"}}>
                                            {currentUser.displayName}
                                        </Text>
                                    </Dropdown.Item>
                                    <Dropdown.Item key="fav" withDivider>
                                        الأنميات المفضلة
                                    </Dropdown.Item>
                                    {/*<Dropdown.Item key="configurations">تم مشاهدتها</Dropdown.Item>
                                    <Dropdown.Item key="settings" withDivider>
                                        الاعدادات
                                    </Dropdown.Item>*/}
                                    {/*<Dropdown.Item key="help_and_feedback" withDivider>
                                    Help & Feedback
                                </Dropdown.Item>*/}
                                    <Dropdown.Item key="logout" withDivider color="error">
                                        تسجيل خروج
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Navbar.Content>
                    ) : (
                        <Navbar.Content hideIn="xs" css={{
                            "@xs": {
                                w: "100%",
                                jc: "flex-end",
                            },
                        }}>
                            <Button onClick={() => {
                                history.push("/login")
                            }} auto shadow ghost color="gradient">تسجيل دخول</Button>
                        </Navbar.Content>
                    )
                }
            </Navbar.Content>

            <Navbar.Collapse>
                <Navbar.CollapseItem
                    activeColor="error"
                    isActive={location.pathname === "/"}
                >
                    <Link
                        color="inherit"
                        css={{
                            minWidth: "100%",
                        }}
                        href={location.pathname === "/" ? "#" : "/"}
                    >
                        Home
                    </Link>
                </Navbar.CollapseItem>
                <Navbar.CollapseItem
                    activeColor="error"
                    isActive={location.pathname.includes("/anime") || location.pathname.includes("/watch")}
                >
                    <Link
                        color="inherit"
                        css={{
                            minWidth: "100%",
                        }}
                        href={(location.pathname.includes("/anime") || location.pathname.includes("/watch")) ? "#" : "/anime"}
                    >
                        Anime
                    </Link>
                </Navbar.CollapseItem>
                <Navbar.CollapseItem
                    activeColor="error"
                    isActive={location.pathname === "/schedule"}
                >
                    <Link
                        color="inherit"
                        css={{
                            minWidth: "100%",
                        }}
                        href={location.pathname === "/schedule" ? "#" : "/schedule"}
                    >
                        Schedule
                    </Link>
                </Navbar.CollapseItem>
                {!currentUser && (
                    <Navbar.CollapseItem
                        activeColor="error"
                        isActive={location.pathname === "/login"}
                    >
                        <Link
                            color="inherit"
                            css={{
                                minWidth: "100%",
                            }}
                            href={location.pathname === "/login" ? "#" : "/login"}
                        >
                            Login
                        </Link>
                    </Navbar.CollapseItem>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}
