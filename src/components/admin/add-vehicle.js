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
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact"
import { store } from "react-notifications-component";
import cognitoUtils from "../../utils/cognitoUtils.js";
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useFetch from "../../hooks/hooks"
import { getZipcode, getState, getCity } from "../../utils/common"
import { appConfig } from "../../config/app-config"
import { APIS } from "../../requests/api-helper.js"
import logo from "../../images/rideeasy.png"

const AddVehicle = () => {
  const [vehicleTypes, setVehicleTypes] = useState([])
  const [locations, setLocations] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [displayData,setDisplayData] = useState([])

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    const vehicleTypesRes = await fetch(APIS.vehicleTypes, {})
    const vehicleTypes = await vehicleTypesRes.json()
    setVehicleTypes(vehicleTypes)


    const locationsRes = await fetch(APIS.locations, {})
    const locations = await locationsRes.json()
    setLocations(locations)

    const vehiclesRes = await fetch(APIS.vehicles, {})
    const vehicles = await vehiclesRes.json()
    vehicles && !!vehicles.length &&  setVehicles(vehicles)
    vehicles && !!vehicles.length &&  prepareTable(vehicles)

  }

  function prepareTable(vehicles){
    const data =
      vehicles &&
      vehicles.map(({uuid, current_mileage, registration_number, year, make, model}) => {
        // is_deleted = 1
        let rows = {
          uuid, model, make , year, registration_number, current_mileage,
          action: (
            <MDBBtn color="red" size="sm" onClick={() => handleDeleteVehicle(uuid)}>
              Delete
            </MDBBtn>
          )
        }
        return rows

      });
    setDisplayData(data)
    return data
  }
  const columns = [
    {
      label: "Vehicle Id ",
      field: "uuid",
      sort: "asc",
    },
    {
      label: "Model",
      field: "model",
      sort: "asc",
    },
    {
      label: "make",
      field: "make",
      sort: "asc",
    },
    {
      label: "year",
      field: "year",
      sort: "asc",
    },
    {
      label: "Registration",
      field: "registration_number",
      sort: "asc",
    },
    {
      label: "Current Mileage",
      field: "current_mileage",
      sort: "asc",
    },
    {
      label: "Action",
      field: "action",
    },
  ]


  const handleDeleteVehicle = async(id) => {
    const options = {
      method: "DELETE"
    }

     const deleteVehicle = await fetch(APIS.deleteVehicle(id), options)
    const deletedVehicle = await deleteVehicle.json()
    deletedVehicle &&  store.addNotification({
      title: "Delete vehicle",
      message: "Vehicle has been deleted successfully !",
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
  const onSignOut = (e) => {
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
  }


  const { register, handleSubmit, watch, errors, reset } = useForm()

  const onSubmit = async(payload) => {
    const options = {
      method: "POST",
      body : JSON.stringify({...payload, is_reserved : false}),
      headers: {
        "Content-Type": "application/json",
      }
    }

    const response =  await fetch(APIS.vehicles, options)
    const {id, ...other} = await response.json();
    setVehicles([...vehicles, other])
    prepareTable([...vehicles, other])

    other && store.addNotification({
      title: "vehicle Added",
      message: "vehicle has been added  successfully !!",
      showIcon: true,
      type: "success",
      insert: "bottom",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      }
    })
    reset()
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
                  href={"/admin/membershipUpdate"}
                  mdbWavesEffect
                  size="sm"
                >
                  update membership
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn
                  color="indigo"
                  href={"/admin/addVehicle"}
                  mdbWavesEffect
                  active
                  size="sm"
                >
                  Vehicles
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn color="indigo" href={"/admin/addLocation"} mdbWavesEffect size="sm">
                  locations
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn
                  color="indigo"
                  href={"/admin/addPriceRange"}
                  mdbWavesEffect
                  size="sm"
                >
                  Price Range
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
            <Typography>Vehicles</Typography>
          </ExpansionPanelSummary>

          <MDBTable striped bordered hover>
            <MDBTableHead columns={columns} color="cyan" textWhite bordered />
            <MDBTableBody rows={displayData} />
          </MDBTable>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Add Vehicle</Typography>
          </ExpansionPanelSummary>
        <MDBCard className="col-md-7">
          <MDBCardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="h4 text-center py-4 grey-text">Add New Vehicle</p>

              <div class="form-group row">
                <label class="col-sm-5">Location</label>
                <div class="col-sm-7">
                  <div class="input-group">
                    <select
                      ref={register({ required: true })}
                      name="location_uuid"
                      className="custom-select"
                    >
                      <option value="">Locations</option>
                      {locations &&
                      locations.map((location) => (
                        <option value={location.uuid}>{location.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5">Vehicle Type</label>
                <div class="col-sm-7">
                  <div class="input-group">
                    <select
                      ref={register}
                      name="vehicle_type_uuid"
                      className="custom-select"
                    >
                      <option value="">Vehicle Types</option>
                      {vehicleTypes &&
                      vehicleTypes.map((type) => (
                        <option value={type.uuid}>{type.type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-5">Model</label>
                <div class="col-sm-7">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Make"
                    ref={register}
                    name="model"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-5">Year</label>
                <div class="col-sm-7">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="year"
                    ref={register}
                    name="year"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5">Make</label>
                <div class="col-sm-7">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Make"
                    ref={register}
                    name="make"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5">Registration Number</label>
                <div class="col-sm-7">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="registration number"
                    ref={register}
                    name="registration_number"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5">Current Mileage</label>
                <div class="col-sm-7">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Current Mileage"
                    ref={register}
                    name="current_mileage"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5">Last Serviced Date</label>
                <div class="col-sm-7">
                  <input
                    type="datetime-local"
                    ref={register}
                    name="last_serviced_date"
                    class="form-control" />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5">Condition</label>
                <div class="col-sm-7">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Vehicle condition"
                    ref={register}
                    name="vehicle_condition"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5">Next Available time</label>
                <div class="col-sm-7">
                  <input
                    type="datetime-local"
                         ref={register}
                         name="next_available_time"
                         class="form-control" />
                </div>
              </div>


              <div className="text-center py-4 mt- o3">
                <MDBBtn color="cyan" type="submit">
                  Add Vehicle
                </MDBBtn>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
          </ExpansionPanel>
      </MDBContainer>
    </div>
  )
}
export default AddVehicle
