import * as core from '@actions/core'
import * as github from '@actions/github'
import {clean} from './clean'

async function run(): Promise<void> {
  try {
    const branch =
      core.getInput('branch', {required: false}) ||
      process.env.GITHUB_HEAD_REF ||
      github.context.ref

    const maxLengthString =
      core.getInput('max-length', {required: false}) || undefined
    const maxLength = maxLengthString ? parseInt(maxLengthString) : undefined

    const removeTrailingDash = core.getInput('remove-trailing-dash', {
      required: false
    })

    core.info(`Input: ${branch}`)

    const output = clean(branch, {
      maxLength,
      removeTrailingDash: removeTrailingDash === 'true'
    })

    core.info(`Output branch name: ${output}`)

    core.setOutput('branch', output)
    core.setOutput('raw_branch_input', branch)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
