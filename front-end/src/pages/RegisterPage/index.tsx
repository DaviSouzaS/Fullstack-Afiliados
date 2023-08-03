import { Form } from "../../components/Form";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, iRegister } from "../../schemas/user.schemas";
import { Button } from "../../components/Button";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { AutoLogin } from "../../components/AutoLogin/Index";
import { EmailAlreadyExistsModal } from "../../components/EmailAlreadyExistsModal";

export const RegisterPage = () => {

    const { registerUser, emailAlreadyExistsModal } = useContext(UserContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<iRegister>({
        mode: "onSubmit",
        resolver: zodResolver(createUserSchema),
    });

    return (
        <>
        {emailAlreadyExistsModal && <EmailAlreadyExistsModal/>}
        <AutoLogin/>
        <main className="h-[100vh] flex justify-center items-center">
            <div className="w-[400px] h-[590px] bg-white rounded-[10px] flex justify-center items-center flex-col">

                <div className="w-[90%]">
                    
                    <div className="flex justify-between mb-[15px]">
                        <h1 className="font-inter text-lg font-bold">Register</h1>
                        <a className="font-inter text-base text-brand3 hover:underline" href="/">Fazer login</a>
                    </div>

                    <Form onSubmit={handleSubmit(registerUser)} inputCSS="flex justify-center items-center flex-col">

                        <Input children={"Nome"} css="w-[100%]" id="name" inputCSS="h-[50px] border-[2px] border-[grey1] rounded-[5px] mt-[10px]" type="text" placeHolder="Digite seu nome aqui" register={register("name")}/>
                        <div className="h-[10px] text-xs text-alert1 mb-[5px]"> {errors.name && <p>{errors.name.message}</p>} </div>

                        <Input children={"Email"} css="w-[100%]" id="email" inputCSS="h-[50px] border-[2px] border-[grey1] rounded-[5px] mt-[10px]" type="email" placeHolder="Digite seu email aqui" register={register("email")}/>
                        <div className="h-[10px] text-xs text-alert1 mb-[5px]"> {errors.email && <p>{errors.email.message}</p>} </div>

                        <Input children={"Password"} css="w-[100%]" id="senha" inputCSS="h-[50px] border-[2px] border-[grey1] rounded-[5px] mt-[10px]" type="password" placeHolder="Digite sua senha aqui" register={register("password")}/>
                        <div className="h-[10px] text-xs text-alert1 mb-[5px]"> {errors.password && <p>{errors.password.message}</p>} </div>

                        <Input children={"Confirmar senha"} css="w-[100%]" id="confirmPassword" inputCSS="h-[50px] border-[2px] border-[grey1] rounded-[5px] mt-[10px]" type="password" placeHolder="Digite novamente sua senha" register={register("confirmPassword")}/>
                        <div className="h-[10px] text-xs text-alert1 mb-[5px]"> {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>} </div>

                        <Button children={"Criar conta"} css="w-[200px] h-[50px] bg-brand1 text-white font-inter mt-[30px] rounded-[5px] hover:bg-random12 transition" type="submit"/>
                    </Form>
                </div>
            </div>
        </main>
        </>
    )
}
