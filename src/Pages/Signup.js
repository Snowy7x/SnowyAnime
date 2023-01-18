import "../styles/Auth.css"
import {Button, Card, Input, Loading, Spacer, Text} from "@nextui-org/react";
import {useEffect, useRef, useState} from "react";
import {useAuth} from "../contexts/AuthContext";
import {useHistory} from "react-router-dom";

export default function Signup() {

    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const emailRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const {signup, setDefault, currentUser, loginPopup} = useAuth()

    async function signInWithPopup(provider = "google"){
        setLoading(true)
        try {
            await loginPopup(provider)
        } catch (e) {
            console.log(e)
            setError("Could not sign up")
        }
        setLoading(false)
    }

    async function handleSubmit(e) {
        //e.preventDefault()
        if (emailRef.current.value.length <= 6)
            return setError("الرجاء ادخال بريد الكترني صالح")
        if (usernameRef.current.value.length <= 3)
            return setError("اسم المستخدم لا يمكن اي يكون اقصر من 3 احرف")
        if (passwordRef.current.value.length <= 6)
            return setError("كلمة المرور لا يمكن ان تكون اقصر من 6 احرف")
        if (passwordRef.current.value !== passwordConfirmRef.current.value)
            return setError("كلمات السر غير متطابقة")

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            await setDefault(usernameRef.current.value)
            history.push("/")
        } catch (e) {
            setError("Failed to create an account")
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
                    <Text h2>انشاء حساب</Text>
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
                            <Input ref={usernameRef} width="100%" placeholder="اسم المستخدم (حروف انجليزية)"/>
                            <Spacer/>
                            <Input ref={emailRef} type="email" width="100%" placeholder="الايميل"/>
                            <Spacer/>
                            <Input.Password ref={passwordRef} width="100%" placeholder="كلمة السر" />
                            <Spacer/>
                            <Input.Password ref={passwordConfirmRef} width="100%" placeholder="أكد كلمة السر" />
                            <Spacer/>
                            <Button light onClick={() => history.push("/login")}>لديك حساب؟ سجل دخول</Button>
                            <Spacer/>
                            {
                                loading ? (
                                    <Button disabled auto bordered color="success" css={{ px: "$13" }}>
                                        <Loading type="points" color="currentColor" size="sm" />
                                    </Button>
                                ) : (
                                    <Button shadow color="gradient" ghost onClick={(e) => {
                                        handleSubmit(e)
                                    }}>انشاء الحساب</Button>
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