import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom"
import { useRoutes, useRedirect } from "hookrouter"
import useFetch from "../hooks/hooks"
import { setCookie, getCookie } from "../utils/common"
import { APIS } from "../requests/api-helper"
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBFormInline,
  MDBAnimation,
  MDBAlert,
} from "mdbreact"
import { connect } from "react-redux"
import cognitoUtils from "../utils/cognitoUtils.js"
import Admin from "./admin"
import car from "../images/car-img.png"
import logo from "../images/rideeasy.png"

import "../css/home.css"

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState("")
  const [userStatus, setUserStatus] = useState("")

  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [isAuthenticated, userHasAuthenticated] = useState(false)

  useEffect(() => {
    onLoad()
  }, [])

  useEffect(() => {
    getUserStatus()
  }, [userId])

  function onLoad() {
    try {
      userHasAuthenticated(false)
      if (window.location.href.includes("id_token")) {
        var curUrl = window.location.href
        cognitoUtils.parseCognitoWebResponse(curUrl).then((result) => {
          cognitoUtils.getCognitoSession().then((result) => {
            if (result !== null) {
              console.log("result",result);
              sessionStorage.setItem("userEmail", result.user.email)
              sessionStorage.setItem("userName", result.user.userName)
              sessionStorage.setItem("isAdmin", result.user.isAdmin)
              sessionStorage.setItem("userId", result.user.userId)
              setUserId(result.user.userId)
              setIsAdmin(result.user.isAdmin)
            }
          })
        })
        userHasAuthenticated(true)
      }
    } catch (err) {
      if (err !== "No current user") {
        alert(err)
      }
    }
    setIsAuthenticating(false)
  }

  async function getUserStatus() {
    if (sessionStorage.getItem("userId")) {
      console.log("getUserStatus", userId)
      const response = await fetch(APIS.userStatus(userId), {})
      const { status } = await response.json()
      setUserStatus(status)
      sessionStorage.setItem("userStatus", status)
    }
  }

  const [isCollapsed, setIsCollapsed] = useState(false)

  if (userId) {
    if (isAdmin) {
      return <Redirect to="/admin" />
    } else {
      switch (userStatus) {
        case "INCOMPLETE":
          return (
            <Redirect
              to={{ pathname: "/user/profile", state: { userId, userStatus } }}
            />
          )
        case "PENDING":
          return (
            <MDBAlert color="info" dismiss>
              <strong>User status is pending... </strong> You need Admin's approval.
            </MDBAlert>
          )
        case "INACTIVE":
          return (
            <MDBAlert color="info" dismiss>
              <strong>Your membership has been cancelled </strong>
            </MDBAlert>
          )
        case "ACTIVE":
          return <Redirect to="/user/vehicles" />
      }
    }
  } else {
  }

  const overlay = (
    <div
      id="sidenav-overlay"
      style={{ backgroundColor: "transparent" }}
      onClick={() => setIsCollapsed(!isCollapsed)}
    />
  )
  return (
    <div id="apppage">
      <div>
        <MDBNavbar
          color="unique-color"
          dark
          expand="md"
          fixed="top"
          scrolling
          transparent
        >
          <MDBContainer>
            <MDBNavbarBrand>
              <img
                src={logo}
                className="rounded float-left"
                alt="aligment"
                height="70"
                width="100"
              />
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={() => setIsCollapsed(!isCollapsed)} />
            <MDBCollapse isOpen={isCollapsed} navbar>
              <MDBNavbarNav right>
                <MDBNavItem active>
                  <MDBBtn
                    color="indigo"
                    href={cognitoUtils.getCognitoSignInUri()}
                    mdbWavesEffect
                  >
                    Login
                  </MDBBtn>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        {isCollapsed && overlay}
      </div>
      <MDBView>
        <MDBMask className="d-flex justify-content-center align-items-center gradient">
          <MDBContainer>
            <MDBRow>
              <MDBCol
                md="6"
                className="white-text text-center text-md-left mt-xl-5 mb-5"
              >
                <MDBAnimation type="fadeInLeft" delay=".3s">
                  <h1 className="h1-responsive font-weight-bold mt-sm-5">
                    We make your drive memorable
                  </h1>
                  <hr className="hr-light" />
                  <h6 className="mb-4">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text
                    ever since the 1500s. It was popularised in the 1960s with the
                    release of Letraset sheets containing Lorem Ipsum passages, and
                    more recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum
                  </h6>
                </MDBAnimation>
              </MDBCol>

              <MDBCol md="6" xl="5" className="mt-xl-5">
                <MDBAnimation type="fadeInRight" delay=".3s">
                  <img src={car} alt="" className="img-fluid" />
                </MDBAnimation>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBMask>
      </MDBView>
    </div>
  )
}

export default Home
