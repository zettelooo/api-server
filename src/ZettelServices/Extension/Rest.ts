import { ZettelTypes } from '@zettelyay/api-types'
import axios from 'axios'
import { apiConfig } from '../../apiConfig'

export class Rest {
  private baseUrl: string

  constructor(private readonly options: Rest.Options) {
    this.baseUrl = options?.extensionRestApiBaseUrl || apiConfig.baseUrls.rest
  }

  private requestFactory<Request, Response>(endPoint: string): (request: Request) => Promise<Response> {
    return async request => {
      const response = await axios({
        url: `${this.baseUrl}/rest/extension/${endPoint}`,
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
    ZettelTypes.Services.Extension.REST.GetUsers.Request,
    ZettelTypes.Services.Extension.REST.GetUsers.Response
  >('get-users')

  getPages = this.requestFactory<
    ZettelTypes.Services.Extension.REST.GetPages.Request,
    ZettelTypes.Services.Extension.REST.GetPages.Response
  >('get-pages')

  getPageMembers = this.requestFactory<
    ZettelTypes.Services.Extension.REST.GetPageMembers.Request,
    ZettelTypes.Services.Extension.REST.GetPageMembers.Response
  >('get-page-members')

  getCards = this.requestFactory<
    ZettelTypes.Services.Extension.REST.GetCards.Request,
    ZettelTypes.Services.Extension.REST.GetCards.Response
  >('get-cards')

  setPageExtensionManagedData = this.requestFactory<
    ZettelTypes.Services.Extension.REST.SetPageExtensionManagedData.Request,
    ZettelTypes.Services.Extension.REST.SetPageExtensionManagedData.Response
  >('set-page-extension-managed-data')

  addCard = this.requestFactory<
    ZettelTypes.Services.Extension.REST.AddCard.Request,
    ZettelTypes.Services.Extension.REST.AddCard.Response
  >('add-card')

  editCard = this.requestFactory<
    ZettelTypes.Services.Extension.REST.EditCard.Request,
    ZettelTypes.Services.Extension.REST.EditCard.Response
  >('edit-card')

  addBadge = this.requestFactory<
    ZettelTypes.Services.Extension.REST.AddBadge.Request,
    ZettelTypes.Services.Extension.REST.AddBadge.Response
  >('add-badge')
}

export namespace Rest {
  export interface Options {
    readonly extensionRestApiBaseUrl?: string
    readonly extensionAccessKey: string
  }
}
