import {expect, test} from '@jest/globals'
import {clean} from '../src/clean'

test('clean - basic', () => {
  expect(clean('deploy/branch/name')).toEqual('deploy-branch-name')
})

test('clean - maxLength', () => {
  expect(clean('deploy/branch/name', {maxLength: 5, lowercase: true})).toEqual(
    'deplo'
  )
})

test('clean - maxLength and removeTrailingDash', () => {
  expect(
    clean('deploy/branch/name', {
      maxLength: 7,
      removeTrailingDash: true,
      lowercase: true
    })
  ).toEqual('deploy')
})

test('clean - remove refs/heads from string', () => {
  expect(clean('refs/heads/main')).toEqual('main')
})

test('clean - lowercase', () => {
  expect(
    clean('MY-BRANCH', {
      lowercase: true
    })
  ).toEqual('my-branch')
})
