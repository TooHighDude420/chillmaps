import { useState } from "react";
import databaseCallList from "../api";
import { Navigate, redirect, useNavigate } from "react-router";

function Login() {
    const [register, setRegister] = useState(false);
    const navigate = useNavigate();

    function handleLogin() {
        if (!document.getElementById("login").hasAttribute('disabled')) {
            if (register) {
                let username = document.getElementById("username").value;
                let email = document.getElementById("email").value;
                let password = document.getElementById("password").value;

                databaseCallList.signUpEP(email, password, username).catch(() => {
                    navigate('/login');
                });
            } else {
                let email = document.getElementById("email").value;
                let password = document.getElementById("password").value;

                databaseCallList.signInEP(email, password).then((mess) => {
                    navigate('/')
                });
            }
        }
    }

    function handleGH(){
        databaseCallList.signInGH().then((mess) =>{
        });
    }

    function handleRegister() {
        register ? setRegister(false) : setRegister(true)
    }

    function checkInput() {
        if (register) {
            if (document.getElementById("username").value == "" || document.getElementById("password").value == "") {
                document.getElementById("login").textContent = "nope";
                document.getElementById("login").setAttribute('disabled', '')
            } else {
                document.getElementById("login").textContent = "register";
                document.getElementById("login").removeAttribute('disabled')
            }
        } else {
            if (document.getElementById("username").value == "" || document.getElementById("password").value == "") {
                document.getElementById("login").textContent = "nope";
                document.getElementById("login").setAttribute('disabled', '')
            } else {
                document.getElementById("login").textContent = "login";
                document.getElementById("login").removeAttribute('disabled')
            }
        }

    }

    return (
        <div className="flex justify-center items-center h-[80vh] w-full" >
            <div className="h-full w-[80%] flex flex-col p-5 items-center rounded-4xl bg-blue-800">
                <div>
                    <p className="text-5xl font-title">Chillmaps</p>
                </div>
                {
                    register ?
                        <div className="w-[80%] mx-auto">
                            <div className="relative z-0 w-full mb-5 group">
                                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                    htmlFor="username">email:</label>
                                <input className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                                    type="text" name="email" id="email" placeholder="example@test.com"></input>
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                    htmlFor="username">Usename:</label>
                                <input className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                                    type="text" name="username" id="username" placeholder="Username"></input>
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                    htmlFor="password">Password:</label>
                                <input className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                                    type="password" name="password" id="password" placeholder="password"></input>
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                    htmlFor="password">Repeat pasword:</label>
                                <input className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                                    type="password" name="passwordre" id="passwordre" placeholder="password"></input>
                            </div>
                        </div>
                        : <div className="w-[80%] mx-auto">
                            <div className="relative z-0 w-full mb-5 group">
                                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                    htmlFor="email">Email:</label>
                                <input className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                                    type="text" name="email" id="email" placeholder="email"></input>
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <label className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                    htmlFor="password">Password:</label>
                                <input className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                                    type="password" name="password" id="password" placeholder="password"></input>
                            </div>
                        </div>}
                <div className="w-full flex justify-center gap-x-5">
                    <button className="w-[20%] rounded-2xl bg-blue-700 hover:bg-blue-900"
                        onClick={() => {
                            handleLogin();
                        }}

                        onMouseOver={() => {
                            checkInput();
                        }}

                        id="login">{register ? "register" : "login"}</button>

                    <button className="w-[20%] rounded-2xl bg-blue-700 hover:bg-blue-900"
                        onClick={() => {
                            handleRegister();
                        }}

                        id="register">{register ? "login" : "register"}</button>

                    <button onClick={() => {
                        handleGH()
                    }}> GitHub </button>

                    <button onClick={() => {
                        databaseCallList.getUser().then((mess) => {
                        })
                    }}> print user </button>
                </div>
            </div>
        </div>
    );
}

export default Login