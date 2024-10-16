class WhoAmIClient {
  constructor(apiHost) {
    this.apiHost = apiHost
  }
  async GetClientDetails(accessToken) {
    if (!accessToken) {
      throw new Error(
        `cannot get client details, expected access token to not be empty`
      )
    }
    const res = await fetch(this.GetAPIWhoAmIURL(this.apiHost), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (res.status !== 200) {
      throw new Error(
        `cannot get client details, expected 200 but got ${res.status}: ${res.statusText}`
      )
    }
    const details = await res.json()
    if (!details.client) {
      throw new Error(
        `cannot get client details, expected response to contain client details`
      )
    }
    return details.client
  }

  GetAPIWhoAmIURL(host) {
    return `https://${host}/api/v1/whoami`
  }
}

module.exports = {
  WhoAmIClient
}
