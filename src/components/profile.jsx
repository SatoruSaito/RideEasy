import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  useHistory,
} from "react-router-dom"
import { useForm } from "react-hook-form"
import { useRoutes, useRedirect } from "hookrouter"
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
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdbreact"
import { APIS } from "../requests/api-helper"
import logo from "../images/rideeasy.png"
import cognitoUtils from "../utils/cognitoUtils"
import useFetch from "../hooks/hooks"
import { store } from "react-notifications-component"
import { makeStyles } from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const Profile = (props) => {
  const [userInfo, setUserInfo] = useState({})
  const [membershipInfo, setMembershipInfo] = useState({})
  const [reservationInfo, setReservationInfo] = useState([])
  const [vehicleInfo, setVehicleInfo] = useState({})

  const userId = sessionStorage.getItem("userId")
  const userStatus = sessionStorage.getItem("userStatus")
  const isMembershipShow = userStatus === "ACTIVE"
  const isReservationShow = userStatus === "ACTIVE"

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    const response = await fetch(APIS.userDetails(userId), {})
    const payload = await response.json()
    setUserInfo(payload)

    const res = await fetch(APIS.userStatus(userId), {})
    const membershipRes = await res.json()
    setMembershipInfo(membershipRes)

    const reservation = await fetch(APIS.getReservation(userId), {})
    const reservationRes = await reservation.json()
    setReservationInfo(reservationRes)
    console.log("reservationRes", reservationRes)

    const vehicleDetails =
      reservationRes &&
      (await fetch(APIS.vehicleDetails(reservationRes.vehicle_uuid), {}))
    const vehicleDetailsRes = await vehicleDetails.json()
    setVehicleInfo(vehicleDetailsRes)

    const currentMembershipPrice = await fetch(APIS.policy,{})
    const policy = await currentMembershipPrice.json();
    console.log("policy",currentMembershipPrice);
  }

  const { register, handleSubmit, watch, errors } = useForm()
  const onSignOut = (e) => {
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
  }

  const onSubmit = ({
    first_name,
    last_name,
    driver_license_number,
    license_state,
    email_address,
    address,
    credit_card_number,
    user_name,
  }) => {
    const payload = {
      first_name,
      last_name,
      driver_license_number,
      license_state,
      email_address,
      address,
      credit_card_number,
      user_name,
    }

    const options = {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }
    const userId = sessionStorage.getItem("userId")
    const response = fetch(APIS.userDetails(userId, userStatus), options).then(
      (res) =>
        store.addNotification({
          title: "User profile",
          message: "Profile details have been changed Suceessfully !!",
          showIcon: true,
          type: "success",
          insert: "bottom",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        })
    )
  }

  const updateMembership = async (status) => {
    const { start_date, end_date } = membershipInfo

    const options = {
      method: "PUT",
      body: JSON.stringify({ start_date, end_date, status }),
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await fetch(APIS.terminateMembership(userId), options)
  }

  const cancelReservation = async () => {
    const reservationId = reservationInfo.uuid
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await fetch(APIS.deleteReservation(reservationId), options)
  }

  const pickupVehicle = async () => {
    const reservationId = reservationInfo.uuid
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await fetch(APIS.pickupVehicle(reservationId), options)
    const pickupRes = await res.json()
    console.log("re", res)
    pickupRes &&
      store.addNotification({
        title: "Pickup",
        message: "Thanks forpicking up the vehicle",
        showIcon: true,
        type: "success",
        insert: "bottom",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      })
  }

  const returnVehicle = async () => {
    const reservationId = reservationInfo.uuid
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await fetch(APIS.pickupVehicle(reservationId), options)
  }

  const membershipComponent = (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Membership</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {membershipInfo.status === "ACTIVE" ? (
          <Typography>
            Your membership is valid till{" "}
            {membershipInfo.end_date &&
              new Date(membershipInfo.end_date).toLocaleDateString()}
            You can cancel Membership anytime.
            <p>
              <MDBBtn
                color="cyan"
                type="submit"
                onClick={() => updateMembership("INACTIVE")}
              >
                Cancel Membership
              </MDBBtn>
            </p>
          </Typography>
        ) : (
          <Typography>
            You don't have active membership. Please click below if you want to be
            member
            <p>
              <MDBBtn
                color="cyan"
                type="submit"
                onClick={() => updateMembership("ACTIVE")}
              >
                Activate Membership
              </MDBBtn>
            </p>
          </Typography>
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )

  const reservationComponent = (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Reservation</Typography>
      </ExpansionPanelSummary>

        {reservationInfo.map((reservation) =>
          <MDBCard className="col-md-7 col-md-offset-2">
        <MDBCardBody>
          <form>
            <p className="h4 text-center py-4 grey-text">Reservation Details</p>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Start Date</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={
                    reservationInfo.start_date &&
                    new Date(reservationInfo.start_date).toLocaleDateString()
                  }
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label">End Date</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={
                    reservationInfo.end_date &&
                    new Date(reservationInfo.end_date).toLocaleDateString()
                  }
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Vehicle</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  value={vehicleInfo.model && vehicleInfo.model}
                />
              </div>
            </div>
          </form>
          <MDBBtn color="cyan" type="submit" onClick={cancelReservation}>
            Cancel Reservation
          </MDBBtn>
          {reservationInfo.is_pickedUp === 0 && reservationInfo.is_car_returned === 0 &&
          <MDBBtn color="cyan" type="submit" onClick={pickupVehicle}>
            PickUp Vehicle
            </MDBBtn>
          }

          {reservationInfo.is_pickedUp === 1 && reservationInfo.is_car_returned === 0 &&
          <MDBBtn color="cyan" type="submit" onClick={returnVehicle}>
            Return Vehicle
          </MDBBtn>
          }
        </MDBCardBody>
          </MDBCard>
        )}

    </ExpansionPanel>
  )
  console.log("reservationInfo",reservationInfo)

  return (
    <div>
      <MDBNavbar color="indigo" dark expand="md">
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
          <MDBCollapse navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBBtn
                  size="sm"
                  color="indigo"
                  href={"/user/vehicles"}
                  mdbWavesEffect
                >
                  Search Vehicles
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn size="sm" color="indigo" onClick={onSignOut} mdbWavesEffect>
                  Log Out
                </MDBBtn>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <MDBContainer className="margin-top-50">
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>User Profile Details</Typography>
          </ExpansionPanelSummary>
          <MDBCard className="col-md-7 col-md-offset-2">
            <MDBCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="h4 text-center py-4 grey-text">User Profile</p>

                <div class="form-group row">
                  <label class="col-sm-5">First Name</label>
                  <div class="col-sm-7">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="First Name"
                      ref={register}
                      name="first_name"
                      defaultValue={userInfo.first_name ? userInfo.first_name : ""}
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-5">Last Name</label>
                  <div class="col-sm-7">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last Name"
                      ref={register}
                      name="last_name"
                      defaultValue={userInfo.last_name ? userInfo.last_name : ""}
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-5">User Name</label>
                  <div class="col-sm-7">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="User Name"
                      ref={register}
                      name="first_name"
                      defaultValue={userInfo.user_name ? userInfo.user_name : ""}
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-5">Email</label>
                  <div class="col-sm-7">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      ref={register}
                      name="email_address"
                      defaultValue={
                        userInfo.email_address ? userInfo.email_address : ""
                      }
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-5">Driver's License Number</label>
                  <div class="col-sm-7">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="license number"
                      ref={register}
                      name="driver_license_number"
                      defaultValue={
                        userInfo.driver_license_number
                          ? userInfo.driver_license_number
                          : ""
                      }
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-5">Driver's License issued State</label>
                  <div class="col-sm-7">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="license state"
                      ref={register}
                      name="license_state"
                      defaultValue={
                        userInfo.license_state ? userInfo.license_state : ""
                      }
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-5">Address</label>
                  <div class="col-sm-7">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Address"
                      ref={register}
                      name="address"
                      defaultValue={userInfo.address ? userInfo.address : ""}
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-5">Credit Card Number</label>
                  <div class="col-sm-7">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Credit card number"
                      ref={register}
                      name="credit_card_number"
                      defaultValue={
                        userInfo.credit_card_number
                          ? userInfo.credit_card_number
                          : ""
                      }
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-sm-5">Current Membership Price</label>
                  <div class="col-sm-7">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Credit card number"
                      ref={register}
                      name="credit_card_number"
                      defaultValue={
                        userInfo.credit_card_number
                          ? userInfo.credit_card_number
                          : ""
                      }
                    />
                  </div>
                </div>

                <div className="text-center py-4 mt- o3">
                  <MDBBtn color="cyan" type="submit">
                    Update Profile
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </ExpansionPanel>
        {isMembershipShow && membershipComponent}
        {isReservationShow && reservationInfo && reservationComponent}
      </MDBContainer>
    </div>
  )
}

export default Profile
