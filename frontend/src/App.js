import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
// import 'dotenv/config'

const defaultTheme = createTheme();
const BACKEND_PORT = 9876;

export default function IssueManager() {
  const [issues, setIssues] = React.useState([]);
  const [issue, setIssue] = React.useState({ id: '', title: '', description: '' });
  const [search, setSearch] = React.useState('');

  const fetchIssues = async () => {
    try {
      const response = await axios.get(`http://localhost:${BACKEND_PORT}/read`);
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues", error);
    }
  };

  const createIssue = async () => {
    try {
      const response = await axios.post(`http://localhost:${BACKEND_PORT}/create`, issue);
      setIssues([...issues, response.data]);
      setIssue({ id: '', title: '', description: '' });
    } catch (error) {
      console.error("Error creating issue", error);
    }
  };

  const updateIssue = async () => {
    try {
      const response = await axios.put(`http://localhost:${BACKEND_PORT}/update`, issue);
      setIssues(issues.map(i => (i.id === issue.id ? response.data : i)));
      setIssue({ id: '', title: '', description: '' });
    } catch (error) {
      console.error("Error updating issue", error);
    }
  };

  const deleteIssue = async (id) => {
    try {
      await axios.delete(`http://localhost:${BACKEND_PORT}/delete/${id}`);
      setIssues(issues.filter(i => i.id !== id));
    } catch (error) {
      console.error("Error deleting issue", error);
    }
  };

  React.useEffect(() => {
    fetchIssues();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (issue.id) {
      updateIssue();
    } else {
      createIssue();
    }
  };

  const handleSearch = async () => {
    if (search) {
      try {
        const response = await axios.get(`http://localhost:${BACKEND_PORT}/read/${search}`);
        setIssues([response.data]);
      } catch (error) {
        console.error("Error searching issue", error);
        setIssues([]);
      }
    } else {
      fetchIssues();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Issue Manager
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="id"
                  label="ID (leave empty to create new)"
                  fullWidth
                  value={issue.id}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  label="Title"
                  fullWidth
                  value={issue.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  fullWidth
                  value={issue.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Search Issues by ID"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                >
                  Search
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => issue.id && deleteIssue(issue.id)}
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                >
                  {issue.id ? 'Update Issue' : 'Create Issue'}
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2}>
            {issues.map((issue) => (
              <Grid item key={issue.id} xs={12}>
                <Box sx={{ border: '1px solid gray', padding: 2, borderRadius: 2 }}>
                  <Typography variant="h6">{issue.title}</Typography>
                  <Typography>{issue.description}</Typography>
                  <Button variant="contained" color="primary" onClick={() => setIssue(issue)}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteIssue(issue.id)}
                    sx={{ ml: 2 }}
                  >
                    Delete
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
