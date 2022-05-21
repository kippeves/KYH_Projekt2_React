import Form from "./Components/Form";
import {Paper, Stack} from "@mui/material";
import EventCalendar from "./Components/EventCalendar";

function App() {

  return (
      <Paper elevation={3} sx={{padding:"2rem",minHeight:"85vh"}}>
          <Stack spacing={2} alignContent={'stretch'}>
              <Form/>
              <EventCalendar/>
          </Stack>
      </Paper>
  );
}

export default App;
