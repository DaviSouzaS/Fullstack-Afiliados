import { useEffect, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { api } from "../../service/axios"
import { AxiosError } from "axios"
import { iLoginReturn } from "../../schemas/user.schemas"
import { Header } from "../../components/Header"
import { Form } from "../../components/Form"
import { iTransaction } from "./types"
import { TransactionCard } from "../../components/TransactionCard"

export const DashboardPage = () => {

    const navigate: NavigateFunction = useNavigate()
    const [transactions, setTransactions] = useState<iTransaction[]>([])

    const userInfosString: string = localStorage.getItem("@INFOS") || ""

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
    }, [navigate])

    const teste = (data: any) => {
        console.log(data)
    }

    return (
        <>
            <Header/>
            <main className="flex justify-center">

                <div className="mt-10 flex flex-col gap-5 w-[90%]">

                    <section className="bg-grey4 w-full h-[570px] overflow-x-auto overflow-y-auto">
                        {transactions.length === 0 && <div className="w-full h-full flex justify-center items-center">
                            <p>Nenhuma transação registrada</p>
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
                                {transactions.map(item => <TransactionCard transaction={item}/>)}
                            </tbody>
                        </table>        
                    </section>

                    <section className="flex flex-col gap-5">
                        <div className="bg-grey4 w-full h-[300px] rounded-[10px]">
                            {transactions.length === 0 && <div className="w-full h-full flex justify-center items-center">
                                <p>Nenhuma transação registrada</p>
                            </div>}
                        </div>
                        <Form onSubmit={teste} inputCSS="w-full h-[150px] bg-grey4 mb-10 rounded-[10px] flex justify-center items-center">
                            <input type="file" name="" id=""/>
                        </Form>
                    </section>

                </div>
                
            </main>
        </>
    )
}