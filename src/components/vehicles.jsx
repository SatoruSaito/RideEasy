import React, { Fragment } from "react"
import { APIS } from "../requests/api-helper.js"
// import useFetch from "../hooks/hooks"
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
} from "mdbreact"
import "../css/vehicles.css"
import logo from "../images/rideeasy.png"

const Vehicles = () => {
  // const res = useFetch(APIS.vehicles, {})

  const vehicles = [
    {
      uuid: "34W323FDS",
      model: "Model X",
      make: "Tesla",
      is_reserved: 0,
      type: "CAR",
    },
    {
      uuid: "34W323FDS",
      model: "Model  chevrolet",
      make: "Tesla",
      is_reserved: 0,
      type: "truck",
    },
    {
      uuid: "34W323FDS",
      model: "Model X",
      make: "Tesla",
      is_reserved: 0,
      type: "truck",
    },
    {
      uuid: "34W323FDS",
      model: "Model X",
      make: "Tesla",
      is_reserved: 0,
      type: "truck",
    },
    {
      uuid: "34W323FDS",
      model: "Model X",
      make: "Tesla",
      is_reserved: 0,
      type: "truck",
    },
    {
      uuid: "34W323FDS",
      model: "Model X",
      make: "Tesla",
      is_reserved: 0,
      type: "CAR",
    },
    {
      uuid: "34W323FDS",
      model: "Model  chevrolet",
      make: "Tesla",
      is_reserved: 0,
      type: "truck",
    },
    {
      uuid: "34W323FDS",
      model: "Model X",
      make: "Tesla",
      is_reserved: 0,
      type: "truck",
    },
    {
      uuid: "34W323FDS",
      model: "Model X",
      make: "Tesla",
      is_reserved: 0,
      type: "truck",
    },
    {
      uuid: "34W323FDS",
      model: "Model X",
      make: "Tesla",
      is_reserved: 0,
      type: "truck",
    },
  ]
  // if (!res.response) {
  //   return (
  //     <Fragment>
  //       <MDBIcon icon="spinner" spin size="3x" fixed />
  //       <span className="sr-only">Loading...</span>
  //     </Fragment>
  //   )
  // }

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
              <MDBNavItem active></MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <MDBView>
        <ul class="vehicle-wrapper margin-top-50">
          {vehicles.map((vehicle) => (
              <MDBCol style={{ maxWidth: "22rem", minWidth: "13em" }}>
                <MDBCard class="padding-20">
                  <MDBBadge color="amber" class="badge">
                    <MDBIcon icon={vehicle.type.toLowerCase()} />
                    {vehicle.type}
                  </MDBBadge>
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
