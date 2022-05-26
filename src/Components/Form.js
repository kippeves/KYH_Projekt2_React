import "@fontsource/roboto/500.css";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonIcon from "@mui/icons-material/Person";
import {Button, FormControl, InputAdornment, MenuItem, Stack, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {addMinutes, format, getHours, getMinutes, set} from "date-fns";
import React, {useEffect, useState} from "react";
import {loadAllCustomers, loadCustomer, loadProjectsForCustomer} from "./data/fetchData";


const Form = ({toast, setToast}) => {
    const [customerList, setCustomerList] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [customer, setCustomer] = useState("");
    const [project, setProject] = useState("");
    const [description, setDescription] = useState("");
    const [eventStart, setEventStart] = useState(new Date());
    const [eventEnd, setEventEnd] = useState(addMinutes(eventStart, 1));


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
            .then(customer => {
                loadProjectsForCustomer(customer.id)
                    .then((projects) => {
                            setProjectList(projects);
                            setProject(projects[0].id);
                        }
                    );
            });
    };

    const changeEventDate = (date) => {
        const newStart = set(eventStart, {
            year: parseInt(format(date, "yyyy")),
            month: parseInt(format(date, "L")) - 1,
            date: parseInt(format(date, "dd")),
            hours: getHours(eventStart),
            minutes: getMinutes(eventStart)
        });
        const newEnd = set(eventStart, {
            year: parseInt(format(date, "yyyy")),
            month: parseInt(format(date, "L")) - 1,
            date: parseInt(format(date, "dd")),
            hours: getHours(eventEnd),
            minutes: getMinutes(eventEnd)
        });
        setEventStart(newStart);
        setEventEnd(newEnd);
    };

    const changeEventTime = (date) => {
        const newStartTime = set(eventStart, {hours: getHours(date), minutes: getMinutes(date)});
        const startCopy = set(eventEnd, {hours: getHours(date), minutes: getMinutes(date)});
        const newEndTime = addMinutes(startCopy, 1);
        setEventStart(newStartTime);
        setEventEnd(newEndTime);
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

        const url = "https://localhost:7248/timereg";
        console.log("i am registering");
        fetch(url, {
            body: JSON.stringify(timeRegister),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "location": "same-origin"
            }
        })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    setToast({message: "Registrering lyckad.", status: "success", show: true});
                } else {
                    setToast({message: "Någonting gick fel", status: "error", show: true});
                }
            });
    };


    return (
        <FormControl fullWidth>
            <Stack spacing={3} paddingX={1} paddingY={3}>
                <TextField id="description"
                           placeholder={"Lägg till titel"}
                           variant="standard"
                           InputProps={{style: {fontSize: 30}}}
                           InputLabelProps={{style: {fontSize: 25}}}
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Valt Datum"
                        value={eventStart}
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
                                onChange={(time) => changeEventTime(time)}
                                value={eventStart}
                                renderInput={(params) => <TextField {...params} />}/>

                    <TimePicker label={"Slutade"}
                                minTime={eventStart}
                                ampm={false}
                                onChange={(time) => setEventEnd(time)}
                                value={eventEnd}
                                renderInput={(params) => <TextField {...params} />}/>
                </LocalizationProvider>
            </Stack>
            <Button variant={"contained"} color={"success"} sx={{alignSelf: "center", paddingX: 3, paddingY: 2}}
                    onClick={submitTimeRegistration}>Lägg till</Button>
        </FormControl>
    );
};

export default Form;