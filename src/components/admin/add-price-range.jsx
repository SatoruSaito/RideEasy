import React, { useState, useEffect } from "react"
import Autocomplete from "react-google-autocomplete"
import { useForm } from "react-hook-form";
import sortBy from "lodash/sortBy";
import find from "lodash/find";
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
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useFetch from "../../hooks/hooks"
import { appConfig } from "../../config/app-config"
import { APIS } from "../../requests/api-helper.js"
import logo from "../../images/rideeasy.png"
import cognitoUtils from "../../utils/cognitoUtils.js"

const AddPriceRange = () => {
  const [vehicleTypes, setVehicleTypes] = useState([])
  const [selectedvehicleType, setSelectedvehicleType] = useState([])
  const [priceRangeDataForDisplay, setPriceRangeDataForDisplay]= useState([])
  const [priceRangeData, setPriceRangeData] = useState([])
  const [dataIsSent, setDataIsSent] = useState(false)
  const [rangeId,setRangeId]= useState('')
  const { register, handleSubmit, watch, errors, reset } = useForm()

  useEffect(() => {
    onLoad()
  },[])

  useEffect(() => {
  },dataIsSent)

  async function onLoad() {
    const vehicleTypesRes = await fetch(APIS.vehicleTypes, {})
    const vehicleTypes = await vehicleTypesRes.json()
    setVehicleTypes(vehicleTypes)

  }
  const onSubmit = async(payload) => {
    const uuid = payload.uuid
    setRangeId(uuid);
    const rangeData = find(priceRangeData, ['uuid', payload.uuid])

    const data= {
      uuid: payload.uuid,
      vehicle_type_uuid: rangeData.vehicle_type_uuid,
      late_fee: payload.late_fee,
      price: payload.price,
      min_hours: rangeData.min_hours,
      max_hours: rangeData.max_hours
    }
    const options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    }

    const res = await fetch(APIS.addVehicleRange(uuid),options)
    reset()
    store.addNotification({
      title: "Vehicle type Price range update",
      message: "Vehicle type price range  has been updated",
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

  const loadPriceRange = async(id) =>{
    const res = await fetch(APIS.priceRangeByVehicleType(id), {})
    const priceRange = await res.json();
    const sortedData= sortBy(priceRange, ['min_hours']);
    setPriceRangeData(sortedData)

    const data =
      sortedData &&
      sortedData.map((range) =>  {
        let rows = {
          hourly_range: `${range.min_hours}-${range.max_hours}`,
          fees: range.late_fee,
          price: range.price
        }
        return rows;
      });
    setPriceRangeDataForDisplay(data)
    setDataIsSent(true)

  }

  const handleVehicleOnchange = async(event) => {
    const vehicleTypeId =event.target.value
    setSelectedvehicleType(vehicleTypeId);
    loadPriceRange(vehicleTypeId)

  }

  const columns = [
    {
      label: "Range in (hour)",
      field: "hourly_range",
      sort: "asc",
    },
    {
      label: " Late fee",
      field: "late_fee",
      sort: "asc",
    },
    {
      label: "Price",
      field: "price",
      sort: "asc",
    }
  ]

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
                   href={"/admin/membershipUpdate"}
                   mdbWavesEffect
                   size ="sm"
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
                 <MDBBtn color="indigo" href={"/admin/addLocation"} mdbWavesEffect size="sm">
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
         <MDBCol md="7">
         <div class="form-group row">
           <label class="col-sm-5">Vehicle Type</label>
           <div class="col-sm-7">
             <div class="input-group">
               <select
                 onChange={handleVehicleOnchange}
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
           </MDBCol>
         <ExpansionPanel>
           <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
           >
             <Typography>Show Price Range</Typography>
           </ExpansionPanelSummary>

           <MDBTable striped bordered hover>
             <MDBTableHead columns={columns} color="cyan" textWhite bordered />
             <MDBTableBody rows={priceRangeDataForDisplay && !!priceRangeDataForDisplay.length && priceRangeDataForDisplay} />
           </MDBTable>
           </ExpansionPanel>

           <ExpansionPanel>
             <ExpansionPanelSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls="panel1a-content"
               id="panel1a-header"
             >
               <Typography>Update Price Range</Typography>
             </ExpansionPanelSummary>
           <MDBCol md="7">
             <MDBCard>
               <MDBCardBody>
                 <form onSubmit={handleSubmit(onSubmit)}>
                   <p className="h4 text-center py-4 grey-text">Update Price Range</p>
                   <div class="form-group row">
                     <label class="col-sm-5">Hourly Range</label>
                   <div class="input-group col-sm-7">
                     <select
                       ref={register()}
                       name="uuid"
                       className="custom-select"
                     >
                       <option value="" >Range in Hour</option>
                       {priceRangeData &&
                       priceRangeData.map((range) => (
                         <option value={range.uuid}>{`${range.min_hours}-${range.max_hours}`}</option>
                       ))}
                     </select>
                   </div>
                     </div>
                   <div class="form-group row">
                     <label class="col-sm-5"> price</label>
                     <div class="col-sm-7">
                       <input
                         type="text"
                         class="form-control"
                         ref={register}
                         name="price"
                       />
                     </div>
                   </div>
                   <div class="form-group row">
                     <label class="col-sm-5"> Late fee</label>
                     <div class="col-sm-7">
                       <input
                         type="text"
                         class="form-control"
                         ref={register}
                         name="late_fee"
                       />
                     </div>
                   </div>

                   <div className="text-center py-4 mt- o3">
                     <MDBBtn
                       color="cyan"
                       type="submit"
                       size="sm"
                     >
                       Update Price Range
                     </MDBBtn>
                   </div>
                 </form>
               </MDBCardBody>
             </MDBCard>
           </MDBCol>
       </ExpansionPanel>

       </MDBContainer>
     </div>
   )
}
 export default AddPriceRange;