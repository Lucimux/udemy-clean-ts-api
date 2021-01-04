import { SignupController } from "./signup";
import { MissingParamError } from '../errors/missing-param-error'

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const sut = new SignupController()
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: "any",
                passordConfirmation: "any"
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))

    })
    test('Should return 400 if no email is provided', () => {
        const sut = new SignupController()
        const httpRequest = {
            body: {
                name: 'any',
                password: "any",
                passordConfirmation: "any"
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))

    })
})