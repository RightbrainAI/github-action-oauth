const core = require('@actions/core')
const { TokenClient } = require('./token')
const { WhoAmIClient } = require('./whoami')
const fs = require('fs')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const tokenClient = new TokenClient(
      core.getInput('oauth-token-host'),
      core.getInput('oauth-token-path')
    )

    const token = tokenClient.CreateToken(
      core.getInput('oauth-client-id'),
      core.getInput('oauth-client-secret')
    )

    const whoAmIClient = new WhoAmIClient(core.getInput('tasks-api-host'))

    const tokenDetails = whoAmIClient.GetClientDetails(token.access_token)

    core.setOutput('access-token', token.access_token)
    core.setOutput('organization-id', tokenDetails.org_id)
    core.setOutput('project-id', tokenDetails.project_id)
  } catch (error) {
    core.error('Failed to authenticate', error)
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
