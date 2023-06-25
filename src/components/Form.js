import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';


const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    age: yup.number().positive().integer().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null])
})

const Form = () => {

    const {
        register,
        handleSubmit,
        formState: {errors, isValid}, //isValid -если поля не заполнены, тогда кнопка задизаблена
        reset // очищает поля после отправки сообщения
    } = useForm({
        // resolver: yupResolver(schema),
    });

    const submitForm = (data) => {
        console.log(JSON.stringify(data));
        reset();
    }
    //const submitForm =(data)=>{console.log(data)}

    return (
        // <form onSubmit={handleSubmit((data) => console.log(data))}>
        <form onSubmit={handleSubmit(submitForm)} style={{display: 'flex', flexDirection: 'column', width: '25%'}}>
            <input {...register('firstName', {required: "поле обязательно для заполнения"})} />
            {errors?.firstName && <p>{errors?.firstName?.message || "Error"}</p>}
            <input {...register('lastName', {required: true})} />
            {errors?.lastName && <p>Last name is required.</p>}
            <input {...register('age')} />
            <input {...register('password', {required: true})} />
            {errors?.password && <p>Password is required.</p>}
            {/*<input {...register('passwordConfirm')}/>*/}
            {/*<input type="submit" disabled={!isValid}/>*/}
            <input type="submit"/>
        </form>
    );
};

export default Form;