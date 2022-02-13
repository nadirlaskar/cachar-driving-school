import { CopyAll, Delete, UploadFile } from "@mui/icons-material"
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import DatePicker from "@mui/lab/DatePicker"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip, CircularProgress, DialogContent, DialogContentText, Link, List,
  ListItem,
  ListItemText,
  Snackbar,
  Typography,
  useMediaQuery
} from "@mui/material"
import AppBar from '@mui/material/AppBar'
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Dialog from '@mui/material/Dialog'
import FormControl from "@mui/material/FormControl"
import IconButton from '@mui/material/IconButton'
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Paper from "@mui/material/Paper"
import Select from "@mui/material/Select"
import Slide from '@mui/material/Slide'
import Stack from "@mui/material/Stack"
import Step from "@mui/material/Step"
import StepContent from "@mui/material/StepContent"
import StepLabel from "@mui/material/StepLabel"
import Stepper from "@mui/material/Stepper"
import { styled } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Toolbar from '@mui/material/Toolbar'
import classNames from "classnames"
import copy from 'copy-to-clipboard'
import { navigate } from "gatsby"
import Upload from "rc-upload"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { ToWords } from 'to-words'
import xhr from 'xhr'
import Layout from "../components/layout"
import Seo from "../components/seo"
import data from "../states"

const EDUCATION_QALIFICATION = [
  {
    name: "Below 10th",
    value: "below_10"
  },
  {
    name: "High School",
    value: "above_10"
  },
  {
    name: "Under graduate",
    value: "under_graduate"
  },
  {
    name: "Graduated",
    value: "graduated"
  },
  {
    name: "Others",
    value: "others"
  }
]
const STATE = data.states.map(x => ({ name: x.state, value: x.state }))
const DTO_OFFICE = [{ name: "Cachar", value: "Cachar" }]
const COURSES = [
  {
    id: "HMV",
    title: "HMV Driving Course",
    subtitle: "Learn to drive heavy motor vehicals",
    courseDuration: "45 days",
    features: [
      {
        name: "Simulator",
        duration: "20mins"
      },
      {
        name: "Practical",
        duration: "20mins"
      },
      {
        name: "Theory",
        duration: "20mins"
      }
    ],
    price: "7,000 INR"
  },
  {
    id: "LMV",
    title: "LMV Driving Course",
    subtitle: "Learn to drive light motor vehicals",
    courseDuration: "45 days",
    features: [
      {
        name: "Simulator",
        duration: "20mins"
      },
      {
        name: "Practical",
        duration: "20mins"
      },
      {
        name: "Theory",
        duration: "20mins"
      }
    ],
    price: "6,000 INR"
  },
  {
    id: "BIKE",
    title: "Bike Driving Course",
    subtitle: "Learn to drive two wheeler vehicals",
    courseDuration: "45 days",
    features: [
      {
        name: "Simulator",
        duration: "20 mins"
      },
      {
        name: "Practical",
        duration: "20 mins"
      },
      {
        name: "Theory",
        duration: "20 mins"
      }
    ],
    price: "4,000 INR"
  }
]
const steps = [
  {
    id: "course",
    label: "Select Course",
    description: `Please select a course`
  },
  {
    id: "personal",
    label: "Personal Information",
    description: `Enter details about you.`
  },
  {
    id: "documents",
    label: "Upload Documents",
    description: `Upload supporting documents.`
  },
  {
    id: "payment",
    label: "Make Payment",
    description: `Make payment and upload payment proof.`
  }
]

const CourseItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  maxWidth: "100%",
  borderWidth: 2,
  "&:hover,&.selected": {
    borderColor: theme.palette.primary.main,
    color: theme.palette.text.primary
  },
  "&.selected": {
    borderColor: theme.palette.secondary.main
  }
}))
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const toWords = new ToWords();
const AlertDialog = ({show, error, onClose}) => {
  return (
    <div>
      <Dialog
        open={show}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Typography variant="caption" sx={{mx:2,mt:2}}>
          {"Please fill required fields"}
        </Typography>
        <DialogContent sx={{pt:1}}>
          <DialogContentText id="alert-dialog-description">
            <Box flexDirection={"column"} mb={1}>
              {Object.keys(error).map(key => (
                <Box sx={{my:1}}>
                  <Typography variant="caption" color="error">
                    {key.replace(/[_]/g, ' ').toUpperCase()}
                  </Typography>
                </Box>
              ))}
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
const BankDetailsDialog = ({ show, handleClose, amountToPay }) => {
  const matches = useMediaQuery('(max-width:500px)');
  return (<Dialog
    fullScreen={matches}
    open={show}
    onClose={handleClose}
    TransitionComponent={Transition}
  >
    <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          Bank details
        </Typography>
      </Toolbar>
    </AppBar>
    <List>
      <ListItem button>
        <ListItemText primary="Bank Name" secondary="Punjab National Bank, Arunachal" />
      </ListItem>
      <ListItem
        button
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <CopyAll />
          </IconButton>
        }
        onClick={() => copy('0743050013925')}>
        <ListItemText secondary="Account number" primary="0743050013925" />
      </ListItem>
      <ListItem
        button
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <CopyAll />
          </IconButton>
        }
        onClick={() => copy('PUNB0074320')}>
        <ListItemText
          secondary="IFSC"
          primary="PUNB0074320"
        />
      </ListItem>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <CopyAll />
          </IconButton>
        }
        button
        onClick={() => copy(amountToPay.replace(/[^.\d]/g, ''))}>
        <ListItemText
          primary={amountToPay}
          secondary={toWords.convert(Number(amountToPay.replace(/[^.\d]/g, '')), { currency: true })}
        />
      </ListItem>
    </List>
    <Typography sx={{mb:2, mx: 2}}variant="subtitle2">NOTE: Please deposit money and upload payment reciept</Typography>
  </Dialog>)
}
const CourseList = ({ list, onSelect = () => { }, selectedCourse, showPaymentModes }) => {
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery('(max-width:500px)');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Stack direction={matches ? "column" : "row"} spacing={2}>
      {list.map(({ title, id, subtitle, features, courseDuration, price }) => (
        <CourseItem
          key={id}
          onClick={() => onSelect(id)}
          variant="outlined"
          className={classNames({ selected: selectedCourse === id })}
        >
          <CardHeader
            title={title}
            subheader={subtitle}
            titleTypographyProps={{
              variant: "button"
            }}
            subheaderTypographyProps={{
              variant: "caption"
            }}
          />
          <CardContent sx={{ py: 0 }}>
            <Typography variant="caption">Fees &nbsp;</Typography>
            <Typography
              sx={{ display: "inline-block", fontWeight: 600 }}
              color="primary"
            >
              {price}
            </Typography>
            {showPaymentModes && (
              <Box flexDirection={'row'}>
                <Link href={`upi://pay?pa=nadirlaskar@icici&amp;pn=CDS&amp;am=${price.replace(/[^.\d]/g, '')}&amp;cu=INR`}>
                  <Typography sx={{my:1}} variant="caption" component={"div"} color="primary">
                   Pay using UPI (works on phone)
                  </Typography>
                </Link>
                <Link href="#" onClick={handleClickOpen}>
                  <Typography variant="caption" component={"div"}>
                    Show bank details
                  </Typography>
                </Link>
              </Box>
            )}
            <BankDetailsDialog show={open} handleClose={handleClose} amountToPay={price}/>
            <Accordion sx={{ my: 2 }} disableGutters>
              <AccordionSummary
                sx={{ flexDirection: "row" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box>
                  <Typography component="div" variant="subtitle2">
                    Duration - {courseDuration}
                  </Typography>
                  <Typography component="div" variant="caption">
                    1 hour session per day
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List dense disablePadding>
                  {features.map(feature => (
                    <ListItem sx={{ mb: 0, px: 0 }}>
                      <ListItemText
                        secondary={`${feature.name} - ${feature.duration}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
            <Stack direction="row" spacing={1} variant="outlined">
              {features.map(({ name }) => (
                <Chip label={`${name}`} size="small" color="secondary" />
              ))}
            </Stack>
          </CardContent>
        </CourseItem>
      ))}
    </Stack>
  )
}
const stepFields = [
  ["course"],
  [
    "name",
    "dob",
    "education_qualification",
    "email",
    "mobile",
    "father_or_spouse_name",
    "present_address",
    "permanent_address",
    "state",
    "district",
    "dto_office"
  ],
  ["address_proof", "id_proof"],
  ["payment_receipt"]
]
const checkError = (errors, index) => {
  return stepFields[index].filter(key => Boolean(errors[key])).length > 0
}

function getBase64(file){
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort();
            reject(new DOMException("Problem parsing input file."));
        };
        reader.onload = () => {
            resolve(reader.result.split(',').pop());
        };
        reader.readAsDataURL(file);
    });
  }
const submitForm = async (data) => {
  const { address_proof, id_proof, payment_receipt, ...rest } = data;
  const formData = {
    ...rest,
    address_proof: {
      ext: address_proof.name.split('.').pop(),
      content: await getBase64(address_proof)
    },
    id_proof: {
      ext: id_proof.name.split('.').pop(),
      content: await getBase64(id_proof)
    },
    payment_receipt: {
      ext: payment_receipt.name.split('.').pop(),
      content: await getBase64(payment_receipt),
    } 
      
  }
  console.log(formData);
  return new Promise((resolve, reject) => { 
    xhr({
      method: "post",
      body: JSON.stringify(formData),
      uri: "https://us-central1-cachar-driving-school.cloudfunctions.net/submitDrivingApplicationForm",
      headers: {
          "Content-Type": "application/json"
      }
      }, function (err, resp, body) {
        if (err) reject(err)
        else resolve(resp, body)
      })
  })
}
const filetypes = "image/jpeg,image/gif,image/png,application/pdf"
const AddressPage = () => {
  let eighteenYearsAgo = new Date()
  eighteenYearsAgo = eighteenYearsAgo.setFullYear(
    eighteenYearsAgo.getFullYear() - 18
  )
  const [activeStep, setActiveStep] = React.useState(0)
  const [showErrors, setShowErrors] = React.useState(0)
  const [isFormSubmitted, setFormSubmitted] = React.useState(0)
  const [showSnackAlert, setSnackAlert] = React.useState(false)

  const {
    trigger,
    watch,
    reset,
    control,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      state: "Assam",
      district: "Cachar",
      dto_office: "Cachar",
      dob: eighteenYearsAgo
    }
  })
  const state = watch("state")
  const course = watch("course")
  const DISTRICT = (
    data.states.find(s => s.state === state)?.districts || []
  ).map(d => ({
    name: d,
    value: d
  }))

  const handleNext = React.useCallback(() => {
    trigger(stepFields.slice(0,activeStep+1).flat())
    setShowErrors(Object.keys(errors).length !== 0)
    if (activeStep === steps.length - 1) {
      if (Object.keys(errors).length === 0) {
        setFormSubmitted(1)
        submitForm(getValues()).then(() => {
          setFormSubmitted(2);
        }).catch(err => {
          console.log(err);
          setSnackAlert('Something went wrong!');
          setFormSubmitted(0)
        })
      }
    } else setActiveStep(prevActiveStep => prevActiveStep + 1)
  }, [trigger, errors, setActiveStep, activeStep, getValues])

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const STEPPER = {
    course: (
      <Controller
        name="course"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CourseList
            list={COURSES}
            onSelect={course => field.onChange(course)}
            selectedCourse={field.value}
          />
        )}
      />
    ),
    personal: (
      <>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField id="name" label="Name" variant="outlined" {...field} />
          )}
        />
        <Controller
          name="dob"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of birth"
                renderInput={params => <TextField {...params} />}
                maxDate={eighteenYearsAgo}
                {...field}
              />
            </LocalizationProvider>
          )}
        />
        <FormControl fullWidth>
          <InputLabel id="education_qualification_label">
            Education Qualification
          </InputLabel>
          <Controller
            name="education_qualification"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                labelId="education_qualification_label"
                id="education_qualification"
                label="Education qualification"
                {...field}
              >
                {EDUCATION_QALIFICATION.map(({ value, name }) => (
                  <MenuItem value={value}>{name}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField id="email" label="Email" variant="outlined" {...field} />
          )}
        />
        <Controller
          name="mobile"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="mobile"
              label="Mobile"
              variant="outlined"
              {...field}
            />
          )}
        />
        <Controller
          name="father_or_spouse_name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="father_or_spouse_name"
              label="Father's name / Spouse name"
              variant="outlined"
              {...field}
            />
          )}
        />
        <Controller
          name="present_address"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="present_address_id"
              label="Present Address"
              multiline
              rows={4}
              variant="filled"
              {...field}
            />
          )}
        />
        <Controller
          name="permanent_address"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="permanent_address_id"
              label="Permanent Address"
              multiline
              rows={4}
              variant="filled"
              {...field}
            />
          )}
        />
        <FormControl fullWidth>
          <InputLabel id="state_label">State</InputLabel>
          <Controller
            name="state"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select labelId="state_label" id="state" label="State" {...field}>
                {STATE.map(({ value, name }) => (
                  <MenuItem value={value}>{name}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="">District</InputLabel>
          <Controller
            name="district"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                labelId="district_label"
                id="district"
                label="District"
                {...field}
              >
                {DISTRICT.map(({ value, name }) => (
                  <MenuItem value={value}>{name}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="dto_office_label">DTO Office</InputLabel>
          <Controller
            name="dto_office"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                disabled
                labelId="dto_office_label"
                id="dto_office"
                label="DTO Office"
                {...field}
              >
                {DTO_OFFICE.map(({ value, name }) => (
                  <MenuItem value={value}>{name}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </>
    ),
    documents: (
      <Box mb={1}>
        <Box mr={1}>
          <Controller
            name="id_proof"
            control={control}
            rules={{ required: true }}
            render={({ field }) =>
              field.value ? (
                <Card>
                  <CardHeader
                    sx={{ py: 0 }}
                    title="ID proof"
                    titleTypographyProps={{ variant: "overline" }}
                  />
                  <CardContent sx={{ py: 1 }}>
                    <Typography variant="caption">
                      {field.value.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      startIcon={<Delete />}
                      type="text"
                      size="small"
                      fullWidth
                      color="error"
                      onClick={() => {
                        setValue("id_proof", undefined, {
                          shouldValidate: true
                        })
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ) : (
                <Upload type="drag" onStart={field.onChange} accept={filetypes}>
                  <Button
                    startIcon={<UploadFile />}
                    variant="contained"
                    component="span"
                  >
                    ID Proof
                  </Button>
                </Upload>
              )
            }
          />
        </Box>
        <Box>
          <Controller
            name="address_proof"
            control={control}
            rules={{ required: true }}
            render={({ field }) =>
              field.value ? (
                <Card>
                  <CardHeader
                    sx={{ py: 0 }}
                    title="Address proof"
                    titleTypographyProps={{ variant: "overline" }}
                  />
                  <CardContent sx={{ py: 1 }}>
                    <Typography variant="caption">
                      {field.value.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      startIcon={<Delete />}
                      type="text"
                      size="small"
                      fullWidth
                      color="error"
                      onClick={() => {
                        setValue("address_proof", undefined, {
                          shouldValidate: true
                        })
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ) : (
                <Upload type="drag" onStart={field.onChange} accept={filetypes}>
                  <Button
                    startIcon={<UploadFile />}
                    variant="contained"
                    component="span"
                  >
                    Address Proof
                  </Button>
                </Upload>
              )
            }
          />
        </Box>
      </Box>
    ),
    payment: (
      <Box flexDirection={"column"}>
        <Typography sx={{ mb: 1 }} variant="subtitle1">
          {!Boolean(course) ? "Please select a course to make payment" : "Your selected course"}
        </Typography>
        <CourseList
          showPaymentModes={true}
          list={COURSES.filter(x => x.id === course)}
          selectedCourse={course}
        />
        <Box mt={1} display="flex">
          <Controller
            name="payment_receipt"
            control={control}
            rules={{ required: true }}
            render={({ field }) =>
              field.value ? (
                <Card>
                  <CardHeader
                    sx={{ py: 0 }}
                    title="Payment Receipt"
                    titleTypographyProps={{ variant: "overline" }}
                  />
                  <CardContent sx={{ py: 1 }}>
                    <Typography variant="caption">
                      {field.value.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      startIcon={<Delete />}
                      type="text"
                      size="small"
                      fullWidth
                      color="error"
                      onClick={() => {
                        setValue("payment_receipt", undefined, {
                          shouldValidate: true
                        })
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ) : (
                  <Upload type="drag" onStart={field.onChange} accept={filetypes} disabled={!Boolean(course)}>
                    <Button
                      disabled={!Boolean(course)}
                      startIcon={<UploadFile />}
                      variant="contained"
                      component="span"
                    >
                    Upload Payment Receipt
                  </Button>
                </Upload>
              )
            }
          />
        </Box>
      </Box>
    )
  }

  return (
    <Layout>
      <Seo title="Admission Form" />
      <Box sx={{ mt: 2 }}>
        {isFormSubmitted === 2 ? (<>
          <Typography variant="h5">Form submitted successfully!</Typography>
          <Box sx={{ mt: 4 }}>
            <Button sx={{mr:1}} variant="outlined" onClick={() => {
              reset();
              setActiveStep(0);
              setFormSubmitted(false)
            }}>
              Submit Another Form
            </Button>
            <Button variant="outlined" onClick={() => {
              navigate('/')
            }}>
              GO TO HOME
            </Button>
          </Box>
          </>
        ):(
        <>
          <Typography variant="h5">Admission form</Typography>
          <Typography variant="caption">
            Fill up the following details to book your slot
          </Typography>
          <Box></Box>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel error={checkError(errors, index)} onClick={()=> isFormSubmitted===0&&setActiveStep(index)}>
                  {step.label}
                  <Typography
                    component="div"
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {step.description}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Box
                    component="form"
                    sx={{
                      my: 2,
                      "& > :not(style)": {
                        my: 2,
                        width: "50ch",
                        maxWidth: "100%",
                        display: "flex"
                      }
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    {STEPPER[step.id]}
                    <div>
                      <Button
                        variant="outlined"
                        size="small"
                        disabled={isFormSubmitted!==0}
                        onClick={handleNext}
                        startIcon={isFormSubmitted === 1 && <CircularProgress size={15}/>}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        size="small"
                        disabled={index === 0 || isFormSubmitted!==0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          
          <AlertDialog show={showErrors} error={errors} onClose={() => setShowErrors(false)} />
              <Snackbar
                open={Boolean(showSnackAlert)}
                autoHideDuration={6000}
                onClose={() => { setSnackAlert(false) }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
              >
              <Alert  severity="error" sx={{ width: '100%' }}>
                {showSnackAlert}
              </Alert>
          </Snackbar>
        </>
    )
}
      </Box>
    </Layout>
  )
}

export default AddressPage
