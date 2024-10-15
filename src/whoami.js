class WhoAmIClient {
  constructor(apiHost) {
    this.apiHost = apiHost
  }
  async GetClientDetails(accessToken) {
    const res = await fetch(this.GetAPIWhoAmIURL(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const details = await res.json()
    return details.client
  }

  GetAPIWhoAmIURL() {
    return `https://${this.apiHost}/api/v1/whoami`
  }
}

module.exports = {
  WhoAmIClient
}
