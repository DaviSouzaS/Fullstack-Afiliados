import { Form } from "../../components/Form"
import { Input } from "../../components/Input"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { iLogin, userLoginSchema } from "../../schemas/user.schemas";
import { Button } from "../../components/Button";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { AutoLogin } from "../../components/AutoLogin/Index";

export const LoginPage = () => {

    const { login } = useContext(UserContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<iLogin>({
        mode: "onSubmit",
        resolver: zodResolver(userLoginSchema),
    });

    return (
        <>
        <AutoLogin/>
        <main className="h-[100vh] flex justify-center items-center">
            <div className="w-[400px] h-[450px] bg-white rounded-[10px] flex items-center flex-col">

                <div className="w-[90%]">
                    <div className="flex justify-between mt-[20px] mb-[30px]">
                        <h1 className="font-inter text-lg font-bold">Fazer login</h1>
                        <a className="font-inter text-base text-brand3 hover:underline" href="/register">Criar conta</a>
                    </div>

                    <Form onSubmit={handleSubmit(login)} inputCSS="flex justify-center items-center flex-col">
                        <Input children={"Email"} css="w-[100%]" id="email" inputCSS="h-[50px] border-[2px] border-[grey1] rounded-[5px] mt-[10px]" type="email" placeHolder="Digite seu email aqui" register={register("email")}/>
                        <div className="h-[10px] text-xs text-alert1 mb-[5px]"> {errors.email && <p>{errors.email.message}</p>} </div>

                        <Input children={"Password"} css="w-[100%]" id="senha" inputCSS="h-[50px] border-[2px] border-[grey1] rounded-[5px] mt-[10px]" type="password" placeHolder="Digite sua senha aqui" register={register("password")}/>
                        <div className="h-[10px] text-xs text-alert1 mb-[5px]"> {errors.password && <p>{errors.password.message}</p>} </div>

                        <Button children={"Fazer login"} css="w-[200px] h-[50px] bg-brand1 text-white font-inter mt-[30px] rounded-[5px] hover:bg-random12 transition" type="submit"/>
                    </Form>
                </div>

            </div>
        </main>
        </>
    )
}