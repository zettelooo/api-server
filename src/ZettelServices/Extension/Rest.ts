import { ZettelTypes, version } from '@zettelooo/api-types'
import axios from 'axios'
import { apiConfig } from '../../apiConfig'

export class Rest<PD = any, CD = any> {
  private baseUrl: string

  constructor(private readonly options: Rest.Options) {
    this.baseUrl =
      options.extensionRestApi?.baseUrl ||
      apiConfig.baseUrlsByTargetEnvironment[options.extensionRestApi?.targetEnvironment ?? 'live'].rest
  }

  private requestFactory<Request, Response>(endPoint: string): (request: Request) => Promise<Response> {
    return async request => {
      const response = await axios({
        url: `${this.baseUrl}/${version}/rest/extension/${endPoint}`,
        method: 'POST',
        headers: {
          Authorization: `Key ${this.options.extensionAccessKey}`,
        },
        data: request,
      })
      return response.data
    }
  }

  getUsers = this.requestFactory<
    ZettelTypes.Extension.Service.Rest.GetUsers.Request,
    ZettelTypes.Extension.Service.Rest.GetUsers.Response
  >('get-users')

  getPages = this.requestFactory<
    ZettelTypes.Extension.Service.Rest.GetPages.Request,
    ZettelTypes.Extension.Service.Rest.GetPages.Response<PD>
  >('get-pages')

  getPageMembers = this.requestFactory<
    ZettelTypes.Extension.Service.Rest.GetPageMembers.Request,
    ZettelTypes.Extension.Service.Rest.GetPageMembers.Response
  >('get-page-members')

  getCards = this.requestFactory<
    ZettelTypes.Extension.Service.Rest.GetCards.Request,
    ZettelTypes.Extension.Service.Rest.GetCards.Response<CD>
  >('get-cards')

  setPageExtensionData = this.requestFactory<
    ZettelTypes.Extension.Service.Rest.SetPageExtensionData.Request<PD>,
    ZettelTypes.Extension.Service.Rest.SetPageExtensionData.Response
  >('set-page-extension-data')

  setCardExtensionData = this.requestFactory<
    ZettelTypes.Extension.Service.Rest.SetCardExtensionData.Request<CD>,
    ZettelTypes.Extension.Service.Rest.SetCardExtensionData.Response
  >('set-card-extension-data')

  addPage = this.requestFactory<
    ZettelTypes.Extension.Service.Rest.AddPage.Request<PD>,
    ZettelTypes.Extension.Service.Rest.AddPage.Response
  >('add-page')

  editPage = this.requestFactory<
    ZettelTypes.Extension.Service.Rest.EditPage.Request<PD>,
    ZettelTypes.Extension.Service.Rest.EditPage.Response
  >('edit-page')

  addCard = this.requestFactory<
    ZettelTypes.Extension.Service.Rest.AddCard.Request<CD>,
    ZettelTypes.Extension.Service.Rest.AddCard.Response
  >('add-card')

  editCard = this.requestFactory<
    ZettelTypes.Extension.Service.Rest.EditCard.Request<CD>,
    ZettelTypes.Extension.Service.Rest.EditCard.Response
  >('edit-card')
}

export namespace Rest {
  export interface Options {
    readonly extensionRestApi?: {
      readonly baseUrl?: string
      readonly targetEnvironment?: keyof typeof apiConfig.baseUrlsByTargetEnvironment
    }
    readonly extensionAccessKey: string
  }
}
