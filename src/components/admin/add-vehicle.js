import React, { useState, useEffect } from "react"
import Autocomplete from "react-google-autocomplete";
import { useForm } from 'react-hook-form';
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
  MDBNavbarNav
} from "mdbreact"

import { getZipcode } from "../../utils/common"
import appConfig from "../../config/app-config"
import { APIS } from "../../requests/api-helper.js"
import logo from "../../images/rideeasy.png"

const AddRentalLocation = () => {
  const [city, setCity] = useState("")
  const [zipCode, setZipcode] = useState("")
  const [state, setStates] = useState("")

  const handleChangeAddress = (place) => {
    console.log("place", place)

    // const pickupZipcode = getZipcode(place.address_components);
    // this.setState({ pickupZipcode: pickupZipcode, pickupAddress:place.address_components[0].long_name });
  }
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => { console.log("data",data) }

  const handleSubmitLocation = () => {
    // const payload = {
    //   name,
    //   address,
    //   city,
    //   zip_code,
    //   capacity,
    //   number_of_vehicles,
    // }

    const options = {
      method: "POST",
      body: JSON.stringify(""),
    }
    const response = fetch(APIS.getLocation, options)
  }

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
  <MDBBtn color="indigo" href={"/admin"} mdbWavesEffect>
  Members List
  </MDBBtn>
  </MDBNavItem>
  <MDBNavItem>
  <MDBBtn
  color="indigo"
  href={"/admin/membershipUpdate"}
  mdbWavesEffect>
  update membership
  </MDBBtn>
  </MDBNavItem>
  <MDBNavItem>
  <MDBBtn color="indigo" href={"/admin/addVehicle"} mdbWavesEffect>
  Add Vehicle
  </MDBBtn>
  </MDBNavItem>
  <MDBNavItem>
  <MDBBtn color="indigo" href={"/admin/addLocation"} mdbWavesEffect active>
  Add location
  </MDBBtn>
  </MDBNavItem>
  </MDBNavbarNav>
  </MDBCollapse>
  </MDBContainer>
  </MDBNavbar>
  <MDBContainer className="margin-top-50">
    <MDBCard className="col-md-7">
    <MDBCardBody>
    <form onSubmit={handleSubmit(onSubmit)} >
    <p className="h4 text-center py-4 grey-text">Add a new Location</p>
  <div class="form-group row">
    <label class="col-sm-5">Location</label>
    <div class="col-sm-7">
    <Autocomplete
  className="form-control form-inputs"
  name="address"
  placeholder="New Rental Location"
  onPlaceSelected={(place) => handleChangeAddress(place)}
  types={["address"]}
    />
    </div>
    </div>

    <div class="form-group row">
    <label class="col-sm-5">Capacity</label>
    <div class="col-sm-7">
    <input type="text" class="form-control" placeholder="Capacity" ref={register} name =""/>
    </div>
    </div>

    <div class="form-group row">
    <label class="col-sm-5">No Of Vehicles</label>
  <div class="col-sm-7">
    <input type="text" class="form-control" placeholder="No Of Vehicles" ref={register} />
    </div>
    </div>
    <div className="text-center py-4 mt- o3">
    <MDBBtn
  color="cyan"
  type="submit">
    ADD LOCATION
  </MDBBtn>
  </div>
  </form>
  </MDBCardBody>
  </MDBCard>
  </MDBContainer>
  </div>
)
}
export default AddRentalLocation
