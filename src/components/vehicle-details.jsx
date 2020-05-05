import React, { Fragment, useState, useEffect } from "react"
import { APIS } from "../requests/api-helper.js"
import useFetch from "../hooks/hooks"
import { store } from "react-notifications-component";
import isEmpty from "lodash/isEmpty";
import formatDateToISO from '../utils/common'
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
import { useForm } from "react-hook-form"
import logo from "../images/rideeasy.png"
import "../css/vehicles.css"

const VehicleDetails = (props) => {

  const [vehicle,setVehicle]= useState([]);
  const [priceRange, setPriceRange] = useState([]);

  const startDate = props.location.state.startDate;
  const endDate = props.location.state.endDate;
  const vehicleId = props.match.params.id

  useEffect(() => {
    onLoad()
  }, [])

   async function onLoad(){
    const res = await fetch(APIS.vehicleDetails(vehicleId), {})
    const data = await res.json()
    console.log("data", data);
    setVehicle(data);
    const vehicle_type_id = data  && data.vehicle_type_uuid
    const ISOStartDate = formatDateToISO(startDate);
    const ISOEndDate= formatDateToISO(endDate);
    const pricerange =  await fetch(`${APIS.priceRange(vehicle_type_id)}?start_date=${ISOStartDate}&end_date=${ISOEndDate}`, {})

    const pricerangeData = await pricerange.json()
     console.log("pricerange",pricerangeData);
     setPriceRange(pricerangeData);


   }

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
   console.log("vehicles",vehicle && vehicle)

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
              <MDBNavItem >
                <MDBBtn color="indigo" href={"/user/profile"} mdbWavesEffect>
                  Profile
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem >
                <MDBBtn color="indigo" href={"/user/vehicles"} mdbWavesEffect>
                  Vehicles
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
                        value={vehicle && vehicle.year}
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
                          vehicle &&
                          `${vehicle.model} (${vehicle.make})`
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
                        value={vehicle && vehicle.current_mileage}
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
                        value={vehicle && vehicle.vehicle_condition}
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
                  <label class="col-sm-4 col-form-label">Start Date and Time</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={startDate}
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                  <label class="col-sm-4 col-form-label">End Date and Time</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        readonly
                        class="form-control-plaintext"
                        value={endDate}
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-5">Price </label>
                    <div class="col-sm-7">{priceRange}</div>
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
