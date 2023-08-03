import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, iRegister } from "../../schemas/user.schemas";
import { Button } from "../../components/Button";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

export const RegisterPage = () => {

    const { registerUser } = useContext(UserContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<iRegister>({
        mode: "onBlur",
        resolver: zodResolver(createUserSchema),
    });

    return (
        <>
            <h1>Register</h1>

            <Form onSubmit={handleSubmit(registerUser)} inputCSS="">
                <Input children={"Nome"} css="" id="name" inputCSS="" type="text" placeHolder="Digite seu nome aqui" register={register("name")}/>
                <span> {errors?.name ? errors.name.message : null} </span>

                <Input children={"Email"} css="" id="email" inputCSS="" type="email" placeHolder="Digite seu email aqui" register={register("email")}/>
                <span> {errors?.email ? errors.email.message : null} </span>

                <Input children={"Password"} css="" id="senha" inputCSS="" type="password" placeHolder="Digite sua senha aqui" register={register("password")}/>
                <span> {errors?.password ? errors.password.message : null} </span>

                <Input children={"Confirmar Senha"} css="" id="confirmPassword" inputCSS="" type="password" placeHolder="Digite novamente sua senha" register={register("confirmPassword")}/>
                <span> {errors?.confirmPassword ? errors.confirmPassword.message : null} </span>

                <Button children={"Criar conta"} css="" type="submit"/>
            </Form>
        </>
    )
}
