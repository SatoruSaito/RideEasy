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

import { getZipcode, getState, getCity } from "../../utils/common"
import appConfig from "../../config/app-config"
import { APIS } from "../../requests/api-helper.js"
import logo from "../../images/rideeasy.png"

const AddRentalLocation = () => {
  const [address, setAddress] = useState();

  const handleChangeAddress = (place) => {
    console.log(place);
    setAddress(place)
  }
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = ({capacity,name,number_of_vehicles}) => {
    console.log("data",address)
    console.log("address", address && getZipcode(address.address_components))
    console.log("state",address && getState(address.address_components))

    const payload = {
      name,
      capacity,
      number_of_vehicles,
      address: address && address.formatted_address,
      zip_code: address && getZipcode(address.address_components),
      state: address && getState(address.address_components),
      city: address && getCity(address.address_components)
    }


    const options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = fetch(APIS.addLocation, options).then(res => console.log(res))
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
  <MDBBtn color="indigo" href={"/admin/addVehicle"} mdbWavesEffect active>
  Add Vehicle
  </MDBBtn>
  </MDBNavItem>
  <MDBNavItem>
  <MDBBtn color="indigo" href={"/admin/addLocation"} mdbWavesEffect>
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
    <p className="h4 text-center py-4 grey-text">Add New Vehicle</p>
    <div class="form-group row">
    <label class="col-sm-5">Year</label>
    <div class="col-sm-7">
    <input type="text" class="form-control" placeholder="year" ref={register} name ="year"/>
    </div>
    </div>

    <div class="form-group row">
    <label class="col-sm-5">Make</label>
  <div class="col-sm-7">
    <input type="text" class="form-control" placeholder="Make" ref={register}  name="make"/>
    </div>
    </div>

    <div class="form-group row">
    <label class="col-sm-5">Model</label>
  <div class="col-sm-7">
    <input type="text" class="form-control" placeholder="Make" ref={register}  name="model"/>
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
