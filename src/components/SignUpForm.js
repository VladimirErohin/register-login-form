import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {useForm} from 'react-hook-form';
import * as yup from 'yup';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://vpolprod.com/">
                vpolprod.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    age: yup.number().positive().integer().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null])
})

const defaultTheme = createTheme();

export default function SignUpForm() {

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}, //isValid -если поля не заполнены, тогда кнопка задизаблена
        reset // очищает поля после отправки сообщения
    } = useForm({
        // resolver: yupResolver(schema),
    });

    const handleSubmitForm = (event) => {
        // event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        //     firstName:data.get('firstName'),
        //     lastName:data.get('lastName'),
        // });

        console.log(JSON.stringify(event));
        reset();
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        РЕГИСТРАЦИЯ
                        {/*Sign up*/}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(handleSubmitForm)}  sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus

                                    {...register('firstName', {required: "поле обязательно для заполнения"})}

                                    //error
                                    // id="outlined-error-helper-text"
                                    // label="Error"
                                    //defaultValue="Hello World"
                                   // helperText="Incorrect entry."
                                    helperText={errors?.firstName &&  "поле обязательно для заполнения" }
                                    />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"

                                    {...register('lastName', {required: true})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"

                                    {...register('email', {required: "поле обязательно для заполнения"})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"

                                    {...register('password', {required: true})}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}

                            type="submit"
                            // type="submit" disabled={!isValid}
                        >
                            ЗАРЕГИСТРИРОВАТЬСЯ
                            {/*Sign Up*/}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    У Вас есть аккаунт? Логин
                                   {/*Already have an account?Sign in*/}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}