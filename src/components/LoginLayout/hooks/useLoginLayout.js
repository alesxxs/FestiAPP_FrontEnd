import { useState } from "react"

export const useLoginLayout = () => {

    const [isCreateNewAccount, setIsCreateNewAccount] = useState(false)

    const handleOnClickNewAccount = () => {
        setIsCreateNewAccount(true)
    }

    const handleOnClickLogin = () => {
        setIsCreateNewAccount(false)
    }

    return {
        isCreateNewAccount,
        handleOnClickNewAccount,
        handleOnClickLogin
    }
}