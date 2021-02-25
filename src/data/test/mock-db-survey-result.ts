import { SaveSurveyResultRepository } from "../protocols/db/survey-results/save-survey-result-repository"
import { SurveyResultModel } from "@/domain/models/survey-result"
import { SaveSurveyResultParams } from "@/domain/usecases/survey-result/save-survey-result"
import { mockSurveyResult } from "@/domain/test"

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
        async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
            return Promise.resolve(mockSurveyResult())
        }
    }
    return new SaveSurveyResultRepositoryStub()
}
