import React, { useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
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
} from "mdbreact"
import { connect } from "react-redux"
import cognitoUtils from "../utils/cognitoUtils.js"
import car from "../images/car-img.png"
import logo from "../images/rideeasy.png"

import "../css/home.css"

const Home = () => {
  var curUrl = window.location.href
  cognitoUtils.parseCognitoWebResponse(curUrl).then((result) => {
    //console.log("web response ::",result); // "Stuff worked!"
    cognitoUtils.getCognitoSession().then((result) => {
      console.log("set1", result.user.email)
      sessionStorage.setItem("userEmail", result.user.email)
      sessionStorage.setItem("userName", result.user.userName)
    })
  })

  const [isCollapsed, setIsCollapsed] = useState(false)

  const overlay = (
    <div
      id="sidenav-overlay"
      style={{ backgroundColor: "transparent" }}
      onClick={() => setIsCollapsed(!isCollapsed)}
    />
  )
  return (
    <div id="apppage">
      <Router>
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
      </Router>
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
