import "@fontsource/roboto/500.css";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonIcon from "@mui/icons-material/Person";
import {Button, FormControl, InputAdornment, MenuItem, Stack, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {loadAllCustomers, loadCustomer} from "./data/fetchData";


const Form = () => {
    const [customerList, setCustomerList] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [customer, setCustomer] = useState("");
    const [project, setProject] = useState("");
    const [eventDate, setEventDate] = useState(moment());
    const [description, setDescription] = useState("");
    const [eventStart, setEventStart] = useState(moment());
    const [eventEnd, setEventEnd] = useState(moment(eventStart)
        .add(1, "minutes"));

    useEffect(() => {
        loadAllCustomers()
            .then((customers) => {
                customers &&
                setCustomerList(customers);
                customerChange(customers[0].id);
            });
    }, []);

    const customerChange = (id) => {
        setCustomer(id);
        loadCustomer(id)
            .then((customer) => {
                setProjectList(customer.projects);
                setProject(customer.projects[0].id);
            });
    };

    const changeEventDate = (date) => {
        const event = moment(date);

        const data = {
            'year': event.year(),
            'month': event.month(),
            'day': event.day()
        };

        eventStart.set(data);
        eventEnd.set(data);
    }

    const changeEventStartTime = (date) => {
        setEventStart(date);
        setEventEnd(date);
        console.log(eventStart);
        console.log(eventEnd);
    };

    const submitTimeRegistration = (e) => {
        e.preventDefault();

        const timeRegister = {
            "customerId": customer,
            "projectId": project,
            "eventStart": eventStart.toISOString(),
            "eventEnd": eventEnd.toISOString(),
            "description": description
        };

        const url = "http://api.kippeves.com:3000/timeregistrations";

        fetch(url, {
            body: JSON.stringify(timeRegister),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((result) => result.json())
            .then((json) => {
                console.log(json);
            });

    };


    return (
        <>
            <FormControl fullWidth>
                <Stack spacing={3} paddingX={1} paddingY={3}>
                    <TextField id="description"
                               placeholder={"Lägg till titel"}
                               variant="standard"
                               InputProps={{style: {fontSize: 30}}}
                               InputLabelProps={{style: {fontSize: 25}}}
                               value={description}
                               onChange={(e) => setDescription(e.target.value)}
                               sx={{marginBottom: 2}}
                    />
                    <TextField
                        select
                        id="select-customer"
                        value={customer}
                        defaultValue={""}
                        label="Välj Kund"
                        onChange={(e) => customerChange(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon/>
                                </InputAdornment>
                            )
                        }}>
                        {
                            customerList.map(result => <MenuItem key={result.id}
                                                                 value={result.id}>{result.name}</MenuItem>)}
                    </TextField>
                    {customer
                        &&
                        <TextField
                            select
                            id="select-project"
                            value={project}
                            defaultValue={""}
                            label="Välj Projekt"
                            onChange={(e) => setProject(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountTreeRoundedIcon/>
                                    </InputAdornment>
                                )
                            }}>
                            {projectList.map(result => <MenuItem key={result.id}
                                                                 value={result.id}>{result.name}</MenuItem>)}
                        </TextField>
                    }

                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label="Valt Datum"
                            value={eventDate}
                            onChange={(date) => changeEventDate(date)}
                            renderInput={(params) => <TextField {...params} />}
                            disableFuture={true}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CalendarMonthRoundedIcon/>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <TimePicker label={"Började"}
                                    ampm={false}
                                    onChange={(time) => changeEventStartTime(moment(time))}
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
            </FormControl>
            <Button variant={"contained"} color="success" onClick={submitTimeRegistration}>Lägg Till</Button>
        </>
    );
};

export default Form;