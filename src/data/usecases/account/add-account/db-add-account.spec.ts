import { mockAddAccountRepository, mockHasher } from '@/data/test'
import { mockAccount, mockAccountParams, throwError } from '@/domain/test'
import { DbAddAccount } from './db-add-account'
import { Hasher, AccountModel, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'

type SutTypes = {
    sut: DbAddAccount
    hasherStub: Hasher
    addAccountRepositoryStub: AddAccountRepository
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail(email: string): Promise<AccountModel> {
            return Promise.resolve(null)
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(Promise.resolve(null))
    const hasherStub = mockHasher()
    const addAccountRepositoryStub = mockAddAccountRepository()
    const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
    return {
        sut,
        hasherStub,
        addAccountRepositoryStub,
        loadAccountByEmailRepositoryStub
    }
}

describe('DbAddAccount Usecase', () => {
    test('Should call Hasher with correct password', async () => {
        const { sut, hasherStub } = makeSut()
        const encryptSpy = jest.spyOn(hasherStub, 'hash')
        await sut.add(mockAccountParams())
        expect(encryptSpy).toHaveBeenCalledWith('any_password')
    })

    test('Should throw if Hasher throws', async () => {
        const { sut, hasherStub } = makeSut()
        jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError)
        const promise = sut.add(mockAccountParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        await sut.add(mockAccountParams())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'hashed_password'
        })
    })

    test('Should return an account on success', async () => {
        const { sut } = makeSut()
        const account = await sut.add(mockAccountParams())
        expect(account).toEqual(mockAccount())
    })

    test('Should return null if LoadAccountByEmailRepository not return null', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(Promise.resolve(mockAccount()))
        const account = await sut.add(mockAccountParams())
        expect(account).toBeNull()
    })

    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
        await sut.add(mockAccountParams())
        expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
    })
})