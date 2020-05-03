import React, { useState, useEffect } from "react"
import { APIS } from "../requests/api-helper.js"
import useFetch from "../hooks/hooks"
import DatePicker from "react-datetime-picker"
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

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([])
  const [vehicleTypes, setVehicleTypes] = useState([])
  const [locations, setLocations] = useState([])

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    const vehicleTypesRes = await fetch(APIS.vehicleTypes, {})
    const vehicleTypes = await vehicleTypesRes.json()
    setVehicleTypes(vehicleTypes)
    console.log("vehicleTypes", vehicleTypes)

    const vehicles = await fetch(APIS.vehicles, {})
    const vehiclesRes = await vehicles.json()
    console.log("vehicles", vehiclesRes)
    setVehicles(vehiclesRes)

    const locationsRes = await fetch(APIS.locations, {})
    const locations = await locationsRes.json()
    setLocations(locations)
    console.log("loactions", locations)
  }

  const [location, setLocation] = useState("")
  const [vehicleType, setVehicleType] = useState("")

  const handleChangeLocation = (event) => {
    console.log("location", event.target.value)
    setLocation(event.target.value)
  }
  const handleChangeCarType = (event) => {
    console.log("type", event.target.value)
    setVehicleType(event.target.value)
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
              <MDBFormInline className="md-form mr-auto m-0">
                <select
                  className="browser-default custom-select mr-auto ml-5"
                  onChange={handleChangeLocation}
                >
                  <option disable>Locations</option>
                  {locations &&
                    locations.map((location) => (
                      <option value={location.uuid}>{location.name}</option>
                    ))}
                </select>
                <select
                  className="browser-default custom-select mr-auto ml-5"
                  onChange={handleChangeCarType}
                >
                  <option>Car Types</option>
                  {vehicleTypes &&
                    vehicleTypes.map((type) => (
                      <option value={type.uuid}>{type.type}</option>
                    ))}
                </select>

                <MDBBtn
                  outline
                  color="white"
                  size="sm"
                  type="submit"
                  className="mr-auto"
                >
                  Search
                </MDBBtn>
              </MDBFormInline>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <MDBView>
        <ul class="vehicle-wrapper margin-top-50">
          {vehicles &&
            vehicles.map((vehicle) => (
              <MDBCol style={{ maxWidth: "22rem", minWidth: "13em" }}>
                <MDBCard class="padding-20">
                  {/*<MDBBadge color="amber" class="badge">*/}
                  {/*<MDBIcon icon={vehicle.type.toLowerCase()} />*/}
                  {/*{vehicle.type}*/}
                  {/*</MDBBadge>*/}
                  <MDBCardBody>
                    <MDBCardTitle class="margin-top-15">
                      {vehicle.model}
                    </MDBCardTitle>
                    <MDBCardText>
                      <label>Make: </label>
                      {vehicle.make}
                    </MDBCardText>
                    <MDBBtn
                      href={`/user/vehicle/${vehicle.uuid}`}
                      outline
                      color="primary"
                      size="sm"
                    >
                      Details
                    </MDBBtn>
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
