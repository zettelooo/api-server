import { ZettelTypes, version } from '@zettelooo/api-types'
import axios from 'axios'
import { apiConfig } from '../apiConfig'

export class Rest<D extends ZettelTypes.Data = ZettelTypes.Data.Default> {
  private baseUrl: string

  constructor(private readonly options: Rest.Options) {
    this.baseUrl =
      options.restApi?.baseUrl ||
      apiConfig.baseUrlsByTargetEnvironment[options.restApi?.targetEnvironment ?? 'live'].rest
  }

  private requestFactory<Request, Response>(endPoint: string): (request: Request) => Promise<Response> {
    return async request => {
      const response = await axios({
        url: `${this.baseUrl}/${version}/rest/${endPoint}`,
        method: 'POST',
        headers: {
          Authorization: `Key ${this.options.extensionAccessKey}`,
        },
        data: request,
      })
      return response.data
    }
  }

  getUsers = this.requestFactory<ZettelTypes.Service.Rest.GetUsers.Request, ZettelTypes.Service.Rest.GetUsers.Response>(
    'get-users'
  )

  getPages = this.requestFactory<
    ZettelTypes.Service.Rest.GetPages.Request,
    ZettelTypes.Service.Rest.GetPages.Response<D>
  >('get-pages')

  editPage = this.requestFactory<
    ZettelTypes.Service.Rest.EditPage.Request<D>,
    ZettelTypes.Service.Rest.EditPage.Response
  >('edit-page')

  getCards = this.requestFactory<
    ZettelTypes.Service.Rest.GetCards.Request,
    ZettelTypes.Service.Rest.GetCards.Response<D>
  >('get-cards')

  addCard = this.requestFactory<ZettelTypes.Service.Rest.AddCard.Request<D>, ZettelTypes.Service.Rest.AddCard.Response>(
    'add-card'
  )

  editCard = this.requestFactory<
    ZettelTypes.Service.Rest.EditCard.Request<D>,
    ZettelTypes.Service.Rest.EditCard.Response
  >('edit-card')
}

export namespace Rest {
  export interface Options {
    readonly restApi?: {
      readonly baseUrl?: string
      readonly targetEnvironment?: keyof typeof apiConfig.baseUrlsByTargetEnvironment
    }
    readonly extensionAccessKey: string
  }
}
