import { useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { api } from "../../service/axios";
import { AxiosError } from "axios";
import { iLoginReturn } from "../../schemas/user.schemas";
import { Header } from "../../components/Header";
import { Form } from "../../components/Form";
import { iTransaction } from "./types";
import { TransactionLine } from "../../components/TransactionLine";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { SubmitHandler } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { UserContext } from "../../contexts/userContext";
import { RegisterTransactionsWithSuccessModal } from "../../components/RegisterTransactionsWithSuccessModal";

export const DashboardPage = () => {

    const navigate: NavigateFunction = useNavigate()
    const [transactions, setTransactions] = useState<iTransaction[]>([])

    const { registerTransactionsWithSuccessModal, openOrCloseTransactionsWithSuccessModal } = useContext(UserContext);

    const userInfosString: string = localStorage.getItem("@INFOS") || ""

    const {
        register,
        handleSubmit
    } = useForm()

    const createTransactions: SubmitHandler<FieldValues> = async (data) => {
        const formData = new FormData();
        formData.append('file', data.file[0])

        const userInfos: iLoginReturn = JSON.parse(userInfosString)

        const token: string = userInfos.token

        try {
            await api.post("/transactions", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }});

            openOrCloseTransactionsWithSuccessModal()
            
        } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
        }
    }

    useEffect(() => {
        if (userInfosString.length === 0 || !userInfosString) {
            localStorage.clear()
            navigate("/")

            return
        }
       
        const userInfos: iLoginReturn = JSON.parse(userInfosString)

        const token: string = userInfos.token

        if (!token) {
            localStorage.clear()
            navigate("/")

            return
        }

        const ensureTokenIsValid = async () => {
            try {
                const response = await api.get("/transactions", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setTransactions(response.data)
            } catch (error) {

                if (error instanceof AxiosError && error.response!.status === 401) {
                    localStorage.clear()
                    navigate("/")
                }
            }
        }

        ensureTokenIsValid()
    }, [navigate, createTransactions])
    
    const transactionsTotalValue = transactions.map((item) => parseInt(item.value)).reduce((accumulator, current) => accumulator + current, 0) / 100

    return (
        <>
            {registerTransactionsWithSuccessModal && <RegisterTransactionsWithSuccessModal/>}
            <Header/>
            <main className="flex justify-center">

                <div className="mt-10 flex flex-col gap-5 w-[90%]">

                    <section className="bg-grey4 w-full h-[570px] overflow-x-auto overflow-y-auto">
                        {transactions.length === 0 && <div className="w-full h-full flex justify-center items-center">
                            <p className="font-inter">Nenhuma transação registrada</p>
                        </div>}
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="border-[1px] border-black">Id</th>
                                    <th className="border-[1px] border-black">Descrição</th>
                                    <th className="border-[1px] border-black">Natureza</th>
                                    <th className="border-[1px] border-black">Data / Hora</th>
                                    <th className="border-[1px] border-black">Produto</th>
                                    <th className="border-[1px] border-black">Valor</th>
                                    <th className="border-[1px] border-black">Vendedor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(item => <TransactionLine key={item.id} transaction={item}/>)}
                            </tbody>
                        </table>        
                    </section>

                    <section className="flex flex-col gap-5">
                        <div className="bg-grey4 w-full h-[300px] rounded-[10px]">
                            {transactions.length === 0 && <div className="w-full h-full flex justify-center items-center">
                                <p className="font-inter">Nenhuma transação registrada</p>
                            </div>}
                            {transactions.length !== 0 && <div className="w-full h-full flex justify-center items-center">
                            <p className="font-inter text-sm sm:text-base">Valor total das transações: R$ {transactionsTotalValue}</p>    
                            </div>}
                        </div>
                        <Form onSubmit={handleSubmit(createTransactions)} inputCSS="w-full h-[150px] bg-grey4 mb-10 rounded-[10px] flex justify-center items-center flex-col">
                            <input type="file" id="file_input" {...register("file", {required: "Enviar o arquivo é obrigatório.",})}/>
                            <Button children={"Enviar arquivo"} css="w-[200px] h-[50px] bg-brand1 text-white font-inter mt-[30px] rounded-[5px] hover:bg-random12 transition" type="submit"/>
                        </Form>
                    </section>

                </div>
                
            </main>
        </>
    )
}