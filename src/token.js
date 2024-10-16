class TokenClient {
  constructor(oauthHost, oauthTokenPath) {
    this.oauthHost = oauthHost
    this.oauthTokenPath = oauthTokenPath
  }

  async CreateToken(clientId, clientSecret) {
    const res = await fetch(this.GetOAuthTokenURL(), {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.GetBasicAuthorizationHeader(clientId, clientSecret)}`
      },
      body: this.GetFormDataWithGrantType('client_credentials')
    })
    if (res.status !== 200) {
      throw new Error(
        `cannot create token, expected 200 but got ${res.status}: ${res.statusText}`
      )
    }
    const data = await res.json()
    if (!data.access_token) {
      throw new Error(
        `cannot create token, expected response to contain access token`
      )
    }
    return data
  }

  GetOAuthTokenURL() {
    return `https://${this.oauthHost}${this.oauthTokenPath}`
  }

  GetBasicAuthorizationHeader(clientId, clientSecret) {
    return btoa(`${clientId}:${clientSecret}`)
  }

  GetFormDataWithGrantType(grantType) {
    const formData = new FormData()
    formData.append('grant_type', grantType)
    return formData
  }
}

module.exports = {
  TokenClient
}
