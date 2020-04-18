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
                    ref={register}
                    onPlaceSelected={(place) => handleChangeAddress(place)}
                    types={["address"]}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-5">Location Name</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" placeholder="Name" ref={register} name ="name"/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5">Capacity</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" placeholder="Capacity" ref={register} name ="capacity"/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5">No Of Vehicles</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" placeholder="No Of Vehicles" ref={register} name="no_of_vehicles" />
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
