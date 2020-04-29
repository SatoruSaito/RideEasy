import React, { Fragment, useState } from "react"
import { APIS } from "../requests/api-helper.js"
import useFetch from "../hooks/hooks"
import { store } from "react-notifications-component"

import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavItem,
  MDBCollapse,
  MDBNavbarNav,
} from "mdbreact"
import DatePicker from "react-datetime-picker"
import { useForm } from "react-hook-form"
import logo from "../images/rideeasy.png"
import "../css/vehicles.css"

const VehicleDetails = (props) => {
  const vehicleId = props.match.params.id
  const today = new Date()
  const [isSent, setIsSent] = useState(false)
  const data = useFetch(APIS.vehicleDetails(vehicleId), {})

  const handleReserveCar = async (e, startDate, endDate) => {
    e.preventDefault()
    const options = {
      body: JSON.stringify({
        user_uuid: sessionStorage.getItem("userId"),
        vehicle_uuid: vehicleId,
        start_date: startDate,
        end_date: endDate,
      }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }

    try {
      const response = await fetch(APIS.reserveACar, options)
      store.addNotification({
        title: "Vehicle Registration",
        message: "Vehicle has been reserved successfully !!",
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
    } catch {
      store.addNotification({
        title: "Vehicle reservation",
        message: "Enable to reserve a vehicle",
        showIcon: true,
        type: "error",
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
  }

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

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
              <MDBNavItem active>
                <MDBBtn color="indigo" href={"/user/profile"} mdbWavesEffect>
                  Profile
                </MDBBtn>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <MDBContainer className="margin-top-50">
        <MDBRow>
          <MDBCol md="5">
            <MDBCard>
              <MDBCardBody>
                <form>
                  <p className="h4 text-center py-4 grey-text">Vehicle Details</p>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Year</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={data.response && data.response.year}
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Car</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={
                          data.response &&
                          `${data.response.model} (${data.response.make})`
                        }
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Milage</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={data.response && data.response.current_mileage}
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Condition</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={data.response && data.response.vehicle_condition}
                      />
                    </div>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="7">
            <MDBCard>
              <MDBCardBody>
                <form>
                  <p className="h4 text-center py-4 grey-text">Reserve A Car</p>
                  <div class="form-group row">
                    <label class="col-sm-5">Start Date & Time</label>
                    <div class="col-sm-7">
                      <DatePicker
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        format="yyyy-MM-dd hh:mm:ss"
                        minDate={today}
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-5">End Date & Time</label>
                    <div class="col-sm-7">
                      <DatePicker
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        format="yyyy-MM-dd hh:mm"
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-5">Price/hr</label>
                    <div class="col-sm-7">$129 / hr</div>
                  </div>
                  <div className="text-center py-4 mt- o3">
                    <MDBBtn
                      color="cyan"
                      type="submit"
                      onClick={(e) => handleReserveCar(e, startDate, endDate)}
                    >
                      Reserve
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}

export default VehicleDetails
