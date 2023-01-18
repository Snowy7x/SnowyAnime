import {Button, Card, Input, Loading, Spacer, Text} from "@nextui-org/react";
import {useEffect, useRef, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {useHistory} from "react-router-dom";

export default function Login() {

    const history = useHistory()

    const [loading, setLoading] = useState()
    const [error, setError] = useState("")

    const emailRef = useRef()
    const passwordRef = useRef()


    const {login, currentUser, loginPopup} = useAuth()

    async function signInWithPopup(provider = "google"){
        setLoading(true)
        try {
            await loginPopup(provider)
        } catch (e) {
            console.log(e)
            setError("Failed to log in")
        }
        setLoading(false)
    }

    async function handleSubmit(e) {
        //e.preventDefault()
        if (emailRef.current.value.length <= 0)
            return setError("الرجاء ادخال البريد الالكتروني")
        if (passwordRef.current.value.length <= 0)
            return setError("الرجاء ادخال كلمة مرور")

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch (e) {
            console.log(e)
            setError("Failed to log in")
        }
        setLoading(false)
    }

    useEffect(() => {
        if (currentUser){
            history.push("/")
        }
    }, [currentUser])

    return (
        <div className="container sign_container">
            <Card shadow className="sign_card">
                <Card.Header className="sign_img_container">
                    <Card.Image src="https://www.whatspaper.com/wp-content/uploads/2022/12/hd-blue-lock-wallpaper-whatspaper-11.jpg"/>
                </Card.Header>
                <Card.Body className="sign_form">
                    <Text h2>تسجيل الدخول</Text>
                    {
                        error && (
                            <Text
                                h5
                                css={{
                                    textGradient: "45deg, $blue800 -20%, $red600 50%",
                                }}
                                weight="bold"
                            >
                                {error}
                            </Text>
                        )
                    }
                    <div className="form">
                        <div className="container">
                            <Input ref={emailRef} type="email" width="100%" placeholder="الايميل"/>
                            <Spacer/>
                            <Input.Password ref={passwordRef} width="100%" placeholder="كلمة السر" />
                            <Spacer/>
                            <Button light onClick={() => history.push("/signup")}>ليس لديك حساب؟ انشاء حساب</Button>
                            <Spacer/>
                            {
                                loading ? (
                                    <Button disabled auto bordered color="success" css={{ px: "$13" }}>
                                        <Loading type="points" color="currentColor" size="sm" />
                                    </Button>
                                ) : (
                                    <Button shadow color="gradient" ghost onClick={(e) => {
                                        handleSubmit(e)
                                    }}>تسجيل الدخول</Button>
                                )
                            }
                            <Spacer/>
                            <Spacer y={1} css={{
                                backgroundColor: "$gray100",
                                width: "100%",
                                height: "2px",
                                borderRadius: "100%",
                            }}/>
                            <Spacer/>
                            <div className="row" style={{justifyContent: "space-between"}}>
                                {
                                    loading ? (
                                        <>
                                            <Button disabled auto bordered color="success" css={{ px: "$13" }}>
                                                <Loading type="points" color="currentColor" size="sm" />
                                            </Button>
                                            <Spacer x={2}/>
                                            <Button disabled auto bordered color="success" css={{ px: "$13" }}>
                                                <Loading type="points" color="currentColor" size="sm" />
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button dir="ltr" auto shadow color="s" ghost
                                                    icon={<i className="fa fa-google" aria-hidden="true"></i>}
                                                    onClick={() => signInWithPopup("google")}
                                            >
                                                قوقل
                                            </Button>
                                            <Spacer x={2}/>
                                            <Button dir="ltr" auto shadow color="primary" ghost
                                                    icon={<i className="fa fa-facebook" aria-hidden="true"></i>}
                                                    onClick={() => signInWithPopup("facebook")}
                                            >
                                                فيسبوك
                                            </Button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}