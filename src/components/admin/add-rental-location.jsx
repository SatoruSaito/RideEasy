import React, { useState, useEffect } from "react"
import Autocomplete from "react-google-autocomplete"
import { useForm } from "react-hook-form"
import _map from "lodash/map";
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
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import cognitoUtils from "../../utils/cognitoUtils.js";
import { getZipcode, getState, getCity } from "../../utils/common"
import { appConfig } from "../../config/app-config"
import { APIS } from "../../requests/api-helper.js"
import logo from "../../images/rideeasy.png";
import { store } from "react-notifications-component";

const AddRentalLocation = () => {
  const [address, setAddress] = useState()
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    onLoad()
  },[])

  const onLoad = async() => {


    const locationsRes = await fetch(APIS.locations, {})
    const locations = await locationsRes.json()

   const vehicles =await Promise.all(
      locations.map(location =>
        fetch(APIS.vehiclesByLocationId(location.uuid)).then(res => res.json())
      )
    )
   const reservedVehicles = vehicles.reduce((memo,vehicle) => {
      if(vehicle.reserved_vehicles && vehicle.reserved_vehicles.length >0) {
        const filtered = _map(vehicle.reserved_vehicles, 'location_uuid')
        memo = [...memo, ...filtered]
      }
      return memo

    },[]);
    console.log(reservedVehicles)


    const data =
      locations &&
      locations.map(({uuid, name, address, state, zip_code, capacity,number_of_vehicles }) => {

        let isDisabled = reservedVehicles.includes(uuid)
        let rows = {
          uuid, name, address, state, zip_code, capacity,number_of_vehicles,
          action: (

            <MDBBtn color={isDisabled ? "grey": "red"} size="sm" onClick={() => handleDeleteLocation(uuid)} disabled={isDisabled}>
              Delete
            </MDBBtn>
          )
        }
        return rows

      });
    setLocations(data)

  }
  const handleDeleteLocation = (locationId) =>{
    const options = {
      method: "DELETE"
    }
    const deleteLocation = fetch(APIS.deleteLocation(locationId), options).then (res =>  store.addNotification({
      title: "Delete Loaction",
      message: "Location has been deleted successfully !!",
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
    }))
  }

  const handleChangeAddress = (place) => {
    setAddress(place)
  }
  const { register, handleSubmit, watch, errors, reset } = useForm()
  const onSubmit = ({ capacity, name, number_of_vehicles }) => {

    const payload = {
      name,
      capacity,
      number_of_vehicles,
      address: address && address.formatted_address,
      zip_code: address && getZipcode(address.address_components),
      state: address && getState(address.address_components),
      city: address && getCity(address.address_components),
    }

    const options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = fetch(APIS.addLocation, options).then((res) =>    store.addNotification({
      title: "Add Location",
      message: "New Location has been added successfully !",
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
    }))

    reset();
  }
  const onSignOut = (e) => {
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
  }

  const columns = [
    {
      label: "Location Id ",
      field: "uuid",
      sort: "asc",
    },
    {
      label: "Name",
      field: "name",
      sort: "asc",
    },
    {
      label: "Address",
      field: "address",
      sort: "asc",
    },
    {
      label: "State",
      field: "state",
      sort: "asc",
    },
    {
      label: "zipcode",
      field: "zip_code",
      sort: "asc",
    },
    {
      label: "capacity",
      field: "capacity",
      sort: "asc",
    },
    {
      label: "Number Of vehicles",
      field: "number_of_vehicles",
      sort: "asc",
    },
    {
      label: "Action",
      field: "action",
    },
  ]

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
                <MDBBtn color="indigo" href={"/admin/addVehicle"} mdbWavesEffect size="sm">
                  Vehicles
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
            <Typography>Locations</Typography>
          </ExpansionPanelSummary>

          <MDBTable striped bordered hover>
            <MDBTableHead  color="cyan" textWhite bordered  columns= {columns}/>
            <MDBTableBody rows={locations} />
          </MDBTable>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Add Location</Typography>
          </ExpansionPanelSummary>
        <MDBCard className="col-md-7">
          <MDBCardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="h4 text-center py-4 grey-text">Add Location</p>
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
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    ref={register}
                    name="name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5">Capacity</label>
                <div class="col-sm-7">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Capacity"
                    ref={register}
                    name="capacity"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5">No Of Vehicles</label>
                <div class="col-sm-7">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="No Of Vehicles"
                    ref={register}
                    name="number_of_vehicles"
                  />
                </div>
              </div>
              <div className="text-center py-4 mt- o3">
                <MDBBtn color="cyan" type="submit">
                  ADD LOCATION
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
export default AddRentalLocation
