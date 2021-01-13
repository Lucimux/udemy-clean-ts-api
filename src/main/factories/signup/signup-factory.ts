import { SignupController } from '../../../presentation/controllers/signup/signup-controller'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account-mongo-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log-mongo-repository'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    const signUpController = new SignupController(dbAddAccount, makeSignUpValidation())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(signUpController, logMongoRepository)
}