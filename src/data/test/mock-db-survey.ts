import { AddSurveyModel } from "@/domain/usecases/survey/add-survey"
import { AddSurveyRepository } from "@/data/protocols/db/survey/add-survey-repository"
import { LoadSurveyByIdRepository } from "@/data/protocols/db/survey/load-survey-by-id-repository"
import { SurveyModel } from "@/domain/models/survey"
import { mockSurvey, mockSurveys } from "@/domain/test"
import { LoadSurveysRepository } from "../protocols/db/survey/load-surveys-repository"

export const mockAddSurveyRepository = (): AddSurveyRepository => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
        async add(surveyData: AddSurveyModel): Promise<void> {
            return Promise.resolve()
        }
    }
    return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async loadById(id: string): Promise<SurveyModel> {
            return Promise.resolve(mockSurvey())
        }
    }
    return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
        async loadAll(): Promise<SurveyModel[]> {
            return Promise.resolve(mockSurveys())
        }
    }
    return new LoadSurveysRepositoryStub()
}

