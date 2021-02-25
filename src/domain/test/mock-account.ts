import { AuthenticationParams } from "@/domain/usecases/account/authentication"
import { AccountModel } from "@/domain/models/account"
import { AddAccountParams } from "@/domain/usecases/account/add-account"

export const mockAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password'
})

export const mockAccountParams = (): AddAccountParams => ({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
})


export const mockAuthentication = (): AuthenticationParams => ({
    email: 'any_email@mail.com',
    password: 'any_password'
})
