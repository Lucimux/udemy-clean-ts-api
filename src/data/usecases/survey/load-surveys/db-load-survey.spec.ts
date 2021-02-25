import { LoadSurveysRepository } from './db-load-survey-protocols'
import { DbLoadSurveys } from './db-load-surveys'
import { mockSurveys, throwError } from '@/domain/test'
import MockDate from 'mockdate'
import { mockLoadSurveysRepository } from '@/data/test'

type SutTypes = {
    sut: DbLoadSurveys
    loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
    const loadSurveysRepositoryStub = mockLoadSurveysRepository()
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    return {
        sut,
        loadSurveysRepositoryStub
    }
}

describe('DbLoadSurveys', () => {

    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call LoadSurveysRepository', async () => {
        const { sut, loadSurveysRepositoryStub } = makeSut()
        const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
        await sut.load()
        expect(loadAllSpy).toHaveBeenCalled()
    })

    test('Should return a list of Surveys on success', async () => {
        const { sut } = makeSut()
        const surveys = await sut.load()
        expect(surveys).toEqual(mockSurveys())
    })

    test('Should throw if LoadSurveysRepository throws', async () => {
        const { sut, loadSurveysRepositoryStub } = makeSut()
        jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
        const promise = sut.load()
        await expect(promise).rejects.toThrow()
    })
})