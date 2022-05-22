import "@fontsource/roboto/500.css";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonIcon from "@mui/icons-material/Person";
import {FormControl, InputAdornment, MenuItem, Stack, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import React, {useEffect, useState} from "react";


const Form = () => {
    const [customerList, setCustomerList] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [customer, setCustomer] = useState("");
    const [project, setProject] = useState("");
    const [eventDate, setEventDate] = useState(moment());
    const [eventStart, setEventStart] = useState(moment());
    const [eventEnd, setEventEnd] = useState(moment(eventStart)
        .add(1, "minutes"));

    useEffect(() => {
        loadAllCustomers()
            .then((result) => {
                result &&
                setCustomerList(result);
                customerChange(result[0].id);
            });
    }, []);

    const customerChange = (id) => {
        setCustomer(id);
        loadProjectsForCustomer(id)
            .then((projects) => {
                setProjectList(projects);
                setProject(projects[0].id);
            });
    };

    const changeEventStartDate = (date) => {
        setEventStart(date);
        setEventEnd(date);
    };

    const loadAllCustomers = async () => {
        const url = "http://localhost:5018/customer";
        return await fetch(url, {
            "location": "same-origin"
        }).then(response =>  response.json());
    };

    const loadProjectsForCustomer = async (id) => {
        const url = `http://localhost:5018/project/customer/${id}`;
        return await fetch(url)
            .then(response => response.json());
    };


    return (
        <FormControl fullWidth>
            <Stack spacing={3} paddingX={1} paddingY={3}>
                <TextField id="description"
                           placeholder={"Lägg till titel"}
                           variant="standard"
                           InputProps={{style: {fontSize: 30}}}
                           InputLabelProps={{style: {fontSize: 25}}}
                           sx={{marginBottom:2}}
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
                        onChange={(date) => setEventDate(moment(date))}
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
        </FormControl>
    );
};

export default Form;