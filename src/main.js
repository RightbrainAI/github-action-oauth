const core = require('@actions/core')
const { TokenClient } = require('./token')
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

    const token = await tokenClient.CreateToken(
      core.getInput('oauth-client-id'),
      core.getInput('oauth-client-secret')
    )

    core.setOutput('access-token', token.access_token)
  } catch (error) {
    core.error('Failed to authenticate', error)
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
