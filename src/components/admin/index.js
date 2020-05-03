import React, { useState } from "react"
import MaterialTable from "material-table"
import { APIS } from "../../requests/api-helper.js"
import useFetch from "../../hooks/hooks"
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavItem,
  MDBCollapse,
  MDBNavbarNav,
} from "mdbreact"
import logo from "../../images/rideeasy.png"
import cognitoUtils from "../../utils/cognitoUtils.js"

const MembersList = () => {
  const [isSent, setIsSent] = useState(false)
  const res = useFetch(APIS.membersList, {})
  console.log("@res", res)

  const handleAction = (membershipId) => {
    fetch(`${APIS.terminateMembership}/${membershipId}`, { method: "PATCH" })
      .then(() => setIsSent(true))
      .catch(() => alert("There was an error, please try again"))
  }

  const onSignOut = (e) => {
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
  }

  const columns = [
    {
      label: "User ID ",
      field: "user_uuid",
      sort: "asc",
    },
    {
      label: "Membership Status",
      field: "status",
      sort: "asc",
    },
    {
      label: "Start Date",
      field: "start_date",
      sort: "asc",
    },
    {
      label: "End Date",
      field: "end_date",
      sort: "asc",
    },
    {
      label: "Action",
      field: "action",
    },
  ]

  const data =
    res.response &&
    res.response.map((user) => {
      let rows = {
        user_uuid: user.user_uuid,
        status: user.status,
        startDate: user.start_date,
        endDate: user.end_date,
      }

      if (user.status === "ACTIVE" || user.status === "active") {
        console.log("user", user.status)
        rows = {
          ...rows,
          action: (
            <MDBBtn color="red" size="sm" onClick={() => handleAction(user.uuid)}>
              Terminate
            </MDBBtn>
          ),
        }
      } else {
        console.log("else", user.status)
        rows = {
          ...rows,
          action: (
            <MDBBtn color="green" size="sm" onClick={() => handleAction(user.uuid)}>
              Aprove
            </MDBBtn>
          ),
        }
      }
      return rows
    })

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
                <MDBBtn
                  size="sm"
                  color="indigo"
                  href={"/admin"}
                  mdbWavesEffect
                  active
                >
                  Members List
                </MDBBtn>
              </MDBNavItem>
              <MDBNavItem>
                <MDBBtn
                  size="sm"
                  color="indigo"
                  href={"/admin/membershipUpdate"}
                  mdbWavesEffect
                >
                  update membership
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
                <MDBBtn
                  color="indigo"
                  href={"/admin/addLocation"}
                  mdbWavesEffect
                  size="sm"
                >
                  Add location
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
        <MDBTable striped bordered hover>
          <MDBTableHead columns={columns} color="cyan" textWhite bordered />
          <MDBTableBody rows={data} />
        </MDBTable>
      </MDBContainer>
    </div>
  )
}

export default MembersList
