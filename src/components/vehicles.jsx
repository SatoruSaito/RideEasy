import React, { useState, useEffect } from "react"
import { APIS } from "../requests/api-helper.js"
import useFetch from "../hooks/hooks"
import ReactDatePicker from "react-datepicker";
import { useForm, ErrorMessage, Controller } from "react-hook-form"
import { addDays } from 'date-fns';
import cognitoUtils from "../utils/cognitoUtils"
import {
  Link
} from "react-router-dom"
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBIcon,
  MDBBadge,
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavItem,
  MDBCollapse,
  MDBView,
  MDBNavbarNav,
  MDBFormInline,
} from "mdbreact"
import "../css/vehicles.css"
import logo from "../images/rideeasy.png"
import { makeStyles } from "@material-ui/core/styles"
import "react-datepicker/dist/react-datepicker.css";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([])
  const [vehicleTypes, setVehicleTypes] = useState([])
  const [locations, setLocations] = useState([])
  const [startDate, setStartDate] = useState([''])
  const [endDate, setEndDate] = useState([''])
  const userName = sessionStorage.getItem("userName")

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    const vehicleTypesRes = await fetch(APIS.vehicleTypes, {})
    const vehicleTypes = await vehicleTypesRes.json()
    setVehicleTypes(vehicleTypes)

    const vehicles = await fetch(APIS.vehicles, {})
    const vehiclesRes = await vehicles.json()
    setVehicles(vehiclesRes)

    const locationsRes = await fetch(APIS.locations, {})
    const locations = await locationsRes.json()
    setLocations(locations)
  }

  const [location, setLocation] = useState("")
  const [vehicleType, setVehicleType] = useState("")

  const handleChangeLocation = (event) => {
    setLocation(event.target.value)
  }
  const handleChangeCarType = (event) => {
    setVehicleType(event.target.value)
  }

  const { handleSubmit, control, errors, register } = useForm({
    mode: "onChanges",
    reValidateMode: "onChange"
  });

  const onSubmit = async (form) => {
    const start_date = new Date(form.reservation_start_time).toISOString();
    const end_date = new Date(form.reservation_end_time).toISOString()
    const vehicles= await fetch(`${APIS.vehicles}?vehicle_type_uuid=${form.vehicle_type_uuid}&location_uuid=${form.location_uuid}&reservation_start_time=${start_date}&reservation_end_time=${end_date}`, {})
    const vehiclesRes = await vehicles.json()
    setVehicles(vehiclesRes)
  }

  const onSignOut = (e) => {
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
  }


  return (
    <div>
      <MDBNavbar color="indigo" dark expand="md">
        <MDBContainer>
          <MDBNavbarBrand>
            <img
              src={logo}
              href={"/*"}
              className="rounded float-left"
              alt="aligment"
              height="70"
              width="100"
            />
          </MDBNavbarBrand>
          <MDBCollapse navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <h6 class="user-name">Hi {userName}</h6>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn
                  size="sm"
                  color="indigo"
                  href={"/user/profile"}
                  mdbWavesEffect
                >
                  Profile
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
      <MDBView>
        <div class="container mt-10">
          <form class="form-inline border border-info ml-10" onSubmit={handleSubmit(onSubmit)}>
            <div class="input-group mb-2 mr-sm-2">
              <select
                ref={register({ required: true })}
                name="location_uuid"
                className="custom-select"
                onChange={handleChangeLocation}
              >
                <option value="">Locations</option>
                {locations &&
                  locations.map((location) => (
                    <option value={location.uuid}>{location.name}</option>
                  ))}
              </select>
            </div>
            <div class="input-group mb-2 mr-sm-2">
              <select
                ref={register}
                name="vehicle_type_uuid"
                className="custom-select"
                onChange={handleChangeCarType}
              >
                <option value="">Vehicle Types</option>
                {vehicleTypes &&
                  vehicleTypes.map((type) => (
                    <option value={type.uuid}>{type.type}</option>
                  ))}
              </select>
            </div>
            <div class="input-group mb-2 mr-sm-2">
              <Controller
                as={
                  <ReactDatePicker
                    dateFormat="MMMM d, yyyy h:mm aa"
                    todayButton="Today"
                    dropdownMode="select"
                    isClearable
                    placeholderText="Click to select  start time"
                    shouldCloseOnSelect
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    onChange={date => setStartDate(date)}
                  />
                }
                control={control}
                register={register({ required: true })}
                name="reservation_start_time"
                valueName="selected" // DateSelect value's name is selected
                onChange={([selected]) => {
                  setStartDate(selected)
                  return selected;
                }}
                rules={{
                  required: true
                }}
              />
            </div>
            <div class="input-group mb-2 mr-sm-2">
              <Controller
                as={
                  <ReactDatePicker
                    dateFormat="MMMM d, yyyy h:mm aa"
                    todayButton="Today"
                    dropdownMode="select"
                    isClearable
                    placeholderText="Click to select time"
                    shouldCloseOnSelect
                    showTimeSelect
                    minDate={startDate}
                    maxDate={addDays(startDate, 3)}
                  />
                }
                control={control}
                register={register({ required: true })}
                name="reservation_end_time"
                valueName="selected"
                onChange={([selected]) => {
                  setEndDate(selected)
                  return selected;
                }}
                rules={{
                  required: true
                }}
              />
            </div>
            <div class="input-group mb-2 mr-sm-2">
              <MDBBtn color="info" size="sm" type="submit" className="mr-auto">
                Search
              </MDBBtn>
            </div>
          </form>
        </div>
        <ul class="vehicle-wrapper margin-top-50">
          {vehicles &&
            vehicles.map((vehicle) => (
              <MDBCol style={{ maxWidth: "22rem", minWidth: "13em" }}>
                <MDBCard class="padding-20">
                  <MDBCardBody>
                    <MDBCardTitle class="margin-top-15">
                      {vehicle.model}
                    </MDBCardTitle>
                    <MDBCardText>
                      <label>Make: </label>
                      {vehicle.make}
                    </MDBCardText>
                    <Link to ={{
                      pathname: `/user/vehicle/${vehicle.uuid}`,
                      state: {
                      startDate,
                      endDate
                    }
                    }}>
                    <MDBBtn
                      href={`/user/vehicle/${vehicle.uuid}`}
                      outline
                      color="primary"
                      size="sm"
                    >
                      Details
                    </MDBBtn>
                      </Link>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
        </ul>
      </MDBView>
    </div>
  )
}

export default Vehicles
