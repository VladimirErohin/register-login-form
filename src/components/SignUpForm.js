import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import {useForm} from 'react-hook-form';
import * as yup from 'yup';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {' © '}
            {new Date().getFullYear()}
            {' '}
            <Link color="inherit" href="https://vpolprod.com/" style={{textDecoration: 'none'}}>
                vpolprod.com
            </Link>{' '}
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
                <CssBaseline/>
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
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(handleSubmitForm)} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {/*<Grid item xs={12} sm={6}>  // это когда два поля в одной строке(каждое поле занимает половину строки)*/}
                                <TextField
                                    //autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Имя"
                                    autoFocus

                                    {...register('firstName', {
                                            required: {
                                                value: true,
                                                message:"поле обязательно для заполнения",
                                            },
                                            maxLength: {
                                                value: 10,
                                                message: 'не более 10 букв'
                                            },
                                        pattern: {
                                            value:/^[A-Za-zА-Яа-яЁё]+$/,
                                            message: "вводите только буквы латиницы/кириллицы",
                                        },
                                        },
                                    )}

                                    //error //дает стиль красного цвета для подсказак при ошибке
                                    // id="outlined-error-helper-text"
                                    // label="Error"
                                    //defaultValue="Hello World"
                                    helperText={errors?.firstName?.message}
                                />
                            </Grid>
                            {/*<Grid item xs={12} sm={6}>*/}
                            {/*    <TextField*/}
                            {/*        required*/}
                            {/*        fullWidth*/}
                            {/*        id="lastName"*/}
                            {/*        label="Фамилия"*/}
                            {/*        //label="Last Name"*/}
                            {/*        name="lastName"*/}
                            {/*        autoComplete="family-name"*/}

                            {/*        {...register('lastName', {required: true})}*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="адрес эл.почты"
                                    name="email"
                                    autoComplete="email"

                                    {...register('email', {
                                        required:  {
                                            value: true,
                                            message:"поле обязательно для заполнения",
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: "введите валидный email формат",
                                        },
                                        validate:{
                                        notAdmin: (fieldValue)=>{
                                        return(
                                        fieldValue !=="admin@example.com" || "Введите другой адрес электронной почты"
                                        );
                                    },
                                        }
                                    })}

                                    //error
                                    helperText={errors?.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="пароль"
                                    type="password"
                                    id="password"
                                    //autoComplete="new-password"

                                    {...register('password', {
                                        required:{
                                        value: true,
                                        message:"поле обязательно для заполнения",
                                    },
                                        pattern: {
                                            //value:/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
                                            //    value:/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
                                            //re.test('qwerty'); // false
                                            // re.test('qwertyuiop'); // false
                                            // re.test('abcABC123$'); // true
                                             value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}.$/,
                                            // "cтрочные и прописные латинские буквы, цифры, спецсимволы, минимум 8 символов"
                                            // (?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$
                                            // /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
                                            // Регулярное выражение для пароля от 6 символов с использованием цифр,
                                            // спец. символов, латиницы, наличием строчных и прописных символов
                                            message: "cтрочные и прописные латинские буквы, цифры, спецсимволы, минимум 8 символов",
                                        },
                                    })}

                                    //error
                                    helperText={errors?.password?.message}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}

                            //type="submit" disabled={!isValid}
                        >
                            ЗАРЕГИСТРИРОВАТЬСЯ
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    У Вас есть аккаунт? Логин
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}