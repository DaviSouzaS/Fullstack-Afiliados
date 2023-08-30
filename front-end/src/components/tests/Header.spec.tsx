import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom'
import { Header } from "../Header";

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
...jest.requireActual('react-router-dom'),
useNavigate: () => mockNavigate,
}))


describe("Header component", () => {

    const infos = {
        name: "nome exemplo"
    }

    localStorage.setItem("@INFOS", JSON.stringify(infos))

    it("Should render header title", () => {

        render(
        <BrowserRouter>
            <Header/>
        </BrowserRouter>)

        const title = screen.getByText("Fullstack Afiliados")

        expect(title).toBeTruthy()
    })

    it("Should render username in header", () => {

        render(
        <BrowserRouter>
            <Header/>
        </BrowserRouter>)

        const title = screen.getByText(`Olá, ${infos.name}`)

        expect(title).toBeTruthy()
    })

    it("Should render logout button in header", () => {

        render(
        <BrowserRouter>
            <Header/>
        </BrowserRouter>)

        const logoutButton = screen.getByRole("button")

        fireEvent.click(logoutButton)

        expect(mockNavigate).toHaveBeenCalledWith('/')
    })
})