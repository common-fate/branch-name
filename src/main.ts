import * as core from '@actions/core'
import * as github from '@actions/github'
import {clean} from './clean'

const getBranchName = (): string => {
  const branchInput = core.getInput('branch', {required: false})

  if (branchInput !== '') return branchInput
  if (github.context.eventName === 'delete') return github.context.payload.ref

  return github.context.ref || process.env.GITHUB_HEAD_REF || ''
}

async function run(): Promise<void> {
  try {
    core.info(`github context: ${JSON.stringify(github.context)}`)

    const branch = getBranchName()

    const maxLengthString =
      core.getInput('max-length', {required: false}) || undefined
    const maxLength = maxLengthString ? parseInt(maxLengthString) : undefined

    const removeTrailingDash = core.getInput('remove-trailing-dash', {
      required: false
    })

    const lowercase = core.getInput('lowercase', {
      required: false
    })

    core.info(`Input: ${branch}`)

    const output = clean(branch, {
      maxLength,
      removeTrailingDash: removeTrailingDash === 'true',
      lowercase: lowercase === 'true'
    })

    core.info(`Output branch name: ${output}`)

    core.setOutput('name', output)
    core.setOutput('raw_branch_input', branch)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
