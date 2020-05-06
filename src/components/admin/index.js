import React, { useState, Fragment } from "react"
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
import moment from "moment";
import { store } from "react-notifications-component"

const MembersList = () => {
  const [isSent, setIsSent] = useState(false)
  const res = useFetch(APIS.membersList, {})

  const handleAction = (userId) => {
    const payload = {
      start_date : moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss'),
      end_date : moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss'),
      status :  'INACTIVE'
    }
    const options = {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }
    fetch(APIS.updateUserMembershipByUserUuid(userId), options)
      .then(() => store.addNotification({
        title: "Deny Membership",
        message: "You just Denied membeship successfully !",
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
      .catch(() => alert("There was an error, please try again"))
  }

  const handleAdminApproval = (userId, status) => {
    const payload = {
      start_date : moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss'),
      end_date : moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss'),
      status :  'ACTIVE'
    }
    const options = {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res =  fetch(APIS.updateUserMembershipByUserUuid(userId), options)
      .then(() => store.addNotification({
        title: "Approve Membership",
        message: "You just approved membeship  successfully !",
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
      )
      .catch(() => alert("There was an error, please try again"))
  }

  const onSignOut = (e) => {
    e.preventDefault()
    cognitoUtils.signOutCognitoSession()
  }

  const columns = [
    {
      label: "Full Name ",
      field: "user_full_name",
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
        user_full_name: user.first_name.concat(" ",user.last_name),
        status: user.status,
        startDate: user.start_date,
        endDate: user.end_date,
      }


      if (user.status === "ACTIVE" || user.status === "active") {
        rows = {
          ...rows,
          action: (
            <MDBBtn color="red" size="sm" onClick={() => handleAction(user.uuid)}>
              Deny
            </MDBBtn>
          ),
        }
      } else if (user.status === "PENDING" || user.status === "pending"){
        rows = {
          ...rows,
          action: (
            <Fragment>
          <MDBBtn color="green" size="sm" onClick={() => handleAdminApproval(user.user_uuid, user.status)}>
            Approve
          </MDBBtn>
            <MDBBtn color="red" size="sm" onClick={() => handleAction(user.uuid)}>
              Deny
            </MDBBtn>
              </Fragment>
          ),
        }
      }
      else {
        rows = {
          ...rows,
          action: (
            <MDBBtn color="green" size="sm" onClick={() => handleAdminApproval(user.uuid, user.status)}>
              Approve
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
                  href={"/admin/membershipUpdate"}
                  size="sm"
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
                <MDBBtn
                  color="indigo"
                  href={"/admin/addLocation"}
                  mdbWavesEffect
                  size="sm"
                >
                  locations
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
