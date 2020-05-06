/**
 * Created by dhwani on 5/5/20.
 */
import React, { useState, useEffect } from "react"
import Autocomplete from "react-google-autocomplete"
import { useForm } from "react-hook-form"
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
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
} from "mdbreact"
import { store } from "react-notifications-component";
import cognitoUtils from "../../utils/cognitoUtils.js"

import useFetch from "../../hooks/hooks"
import { getZipcode, getState, getCity } from "../../utils/common"
import { appConfig } from "../../config/app-config"
import { APIS } from "../../requests/api-helper.js"
import logo from "../../images/rideeasy.png"

const UpdateMembership = () => {
  const [vehicleTypes, setVehicleTypes] = useState([])

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    const vehicleTypesRes = await fetch(APIS.vehicleTypes, {})
    const vehicleTypes = await vehicleTypesRes.json()
    setVehicleTypes(vehicleTypes)

  }

  const { register, handleSubmit, watch, errors, reset } = useForm()
  const onSubmit = (payload) => {

    const options = {
      method: "POST",
      body : JSON.stringify({...payload, is_expired : false}),
      headers: {
        "Content-Type": "application/json",
      }
    }
    const response = fetch(APIS.policy, options)
    response && store.addNotification({
      title: "Membership Updated",
      message: "Membership terms has been updated successfully !",
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
    reset()
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
              className="rounded float-left"
              alt="aligment"
              height="70"
              width="100"
            />
          </MDBNavbarBrand>
          <MDBCollapse navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBBtn color="indigo" href={"/admin"} mdbWavesEffect size="sm">
                  Members List
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn
                  color="indigo"
                  href={"/admin/addVehicle"}
                  mdbWavesEffect
                  size="sm"
                >
                  Add Vehicle
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn color="indigo" href={"/admin/addLocation"} mdbWavesEffect size="sm">
                  Add location
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn
                  color="indigo"
                  href={"/admin/addPriceRange"}
                  mdbWavesEffect
                  size="sm"
                >
                  Add Price Range
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
        <MDBCard className="col-md-7">
          <MDBCardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="h4 text-center py-4 grey-text">Update Membership Terms</p>
              <div class="form-group row">
                <label class="col-sm-5"> duration of membership</label>
                <div class="col-sm-7">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="time in months"
                    ref={register}
                    name="time_in_months"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5">price</label>
                <div class="col-sm-7">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="price"
                    ref={register}
                    name="price"
                  />
                </div>
              </div>
              <div className="text-center py-4 mt- o3">
                <MDBBtn color="cyan" type="submit">
                  Update Membership
                </MDBBtn>
              </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
    </div>
  )
}
export default UpdateMembership;