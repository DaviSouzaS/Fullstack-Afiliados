import { useEffect, useRef } from "react";
import { iModal } from "./types";
import { Button } from "../Button";
import { IoMdClose }  from "react-icons/io";
import { createPortal } from "react-dom";

export const ModalTemplate = ({title, children, style, OpenOrClose, headerStyle}: iModal): JSX.Element => {

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {

            if (!ref.current) {
                return
            }

            if (!event.target) {
                return
            }

            if (!ref.current.contains(event.target as HTMLElement)){
                OpenOrClose()
            }
        }

        window.addEventListener("mousedown", handleClick)

        return () => {
            window.removeEventListener("mousedown", handleClick)
        }
    }, [])

    return createPortal (
        <div className="bg-modalBg fixed h-screen w-screen top-0 flex justify-center items-center">

            <div className={style} ref={ref}>
                
                <div className={`flex justify-between ${headerStyle}`}>
                    <p>{title}</p>
                    <Button children={<IoMdClose size={25} color="#ADB5BD"/>} css="bg-transparent" type="button" onClick={OpenOrClose}/>
                </div>

                {children}
            </div>

        </div>,
        document.body
    )
}