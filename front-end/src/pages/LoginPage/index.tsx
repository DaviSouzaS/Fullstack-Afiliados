import { Form } from "../../components/Form"
import { Input } from "../../components/Input"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { iLogin, userLoginSchema } from "../../schemas/user.schemas";
import { Button } from "../../components/Button";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

export const LoginPage = () => {

    const { login } = useContext(UserContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<iLogin>({
        mode: "onBlur",
        resolver: zodResolver(userLoginSchema),
    });

    return (
        <>
            <h1>Fazer login</h1>

            <Form onSubmit={handleSubmit(login)} inputCSS="">
                <Input children={"Email"} css="" id="email" inputCSS="" type="email" placeHolder="Digite seu email aqui" register={register("email")}/>
                <span> {errors?.email ? errors.email.message : null} </span>

                <Input children={"Password"} css="" id="senha" inputCSS="" type="password" placeHolder="Digite sua senha aqui" register={register("password")}/>
                <span> {errors?.password ? errors.password.message : null} </span>

                <Button children={"Fazer login"} css="" type="submit"/>
            </Form>
        </>
    )
}