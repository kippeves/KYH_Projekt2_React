import "@fontsource/roboto/500.css";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonIcon from "@mui/icons-material/Person";
import {FormControl, InputAdornment, MenuItem, Stack, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import React, {useEffect, useState} from "react";


const Form = (props) => {
    const [customerList, setCustomerList] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [customer, setCustomer] = useState(0);
    const [project, setProject] = useState(0);
    const [eventDate, setEventDate] = useState(moment())
    const [eventStart, setEventStart] = useState(moment())
    const [eventEnd, setEventEnd] = useState(moment(eventStart).add(1,'minutes'))

    useEffect(() => {
        return () => {
            console.log('hi')
            loadAllCustomers().then((result)=>
            {
                console.log(result)
                setCustomerList(result);
                setCustomer(result[0].id);
            })
        }}, []);

    const changeEventStartDate = (date) => {
        setEventStart(date);
        setEventEnd(date);
    }

    const loadAllCustomers = async () => {
        console.log('I am here as well')
        const url = "http://localhost:5018/customer";
        const response = await fetch(url);
        return await response.json();
    }

    const loadProjectsForCustomer = async(id) => {
        const url = `https://localhost:7248/project/customer/{id}`;
        fetch(url,{'credentials': 'same-origin'})
            .then(response => response.json())
            .then(result => {return result});
    }


    return (
        <Stack spacing={3} marginBottom={3}>
            <TextField id="description"
                       label="Lägg till titel"
                       variant="standard"
                       InputProps={{style: {fontSize: 30}}}
                       InputLabelProps={{style: {fontSize: 30}}}/>

            <FormControl fullWidth>
                <TextField
                    select
                    id="select-customer"
                    value={customer}
                    label="Välj Kund"
                    onChange={(e) => setCustomer(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon/>
                            </InputAdornment>
                        ),
                    }}>
                    {customerList.map(result => <MenuItem key={result} value={result.id}>{result.name}</MenuItem>)}
                </TextField>
            </FormControl>
            {customer
                &&
                <FormControl fullWidth>
                    <TextField
                        select
                        id="select-project"
                        value={''}
                        label="Välj Projekt"
                        onChange={(e) => setProject(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountTreeRoundedIcon/>
                                </InputAdornment>
                            ),
                        }}>
                        <MenuItem value={0}>Projekt 1</MenuItem>
                        <MenuItem value={1}>Projekt 2</MenuItem>
                        <MenuItem value={2}>Projekt 3</MenuItem>
                    </TextField>
                </FormControl>
            }

            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    orientation="portrait"
                    label="Valt Datum"
                    value={eventDate}
                    onChange={(date) => setEventDate(moment(date))}
                    renderInput={(params) => <TextField {...params} />}
                    disableFuture={true}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CalendarMonthRoundedIcon/>
                            </InputAdornment>
                        ),
                    }}
                />

                <TimePicker label={"Började"}
                            ampm={false}
                            onChange={(time) => changeEventStartDate(moment(time))}
                            value={eventStart}
                            renderInput={(params) => <TextField {...params} />}/>

                <TimePicker label={"Slutade"}
                            minTime={eventStart}
                            ampm={false}
                            onChange={(time) => setEventEnd(moment(time))}
                            value={eventEnd}
                            renderInput={(params) => <TextField {...params} />}/>
            </LocalizationProvider>

        </Stack>
);
}

export default Form;