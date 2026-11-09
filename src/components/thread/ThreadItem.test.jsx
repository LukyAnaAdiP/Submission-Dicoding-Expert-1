import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import ThreadItem from './ThreadItem'

/**
 * skenario testing
 *
 * - ThreadItem component
 *   - should display thread category correctly
 *   - should display thread date correctly
 *   - should display thread title correctly
 *   - should navigate to thread detail when title is clicked
 *   - should display thread body correctly
 *   - should display owner avatar when avatar is available
 *   - should display owner initial when avatar is unavailable
 *   - should display question mark when owner name is unavailable
 *   - should display Unknown User when owner is unavailable
 *   - should display total comments correctly
 */

vi.mock('../../utils/formatDate', () => ({
  default: vi.fn(() => '4 November 2026')
}))

afterEach(() => {
  cleanup()
})

describe('ThreadItem component', () => {
  it('should display thread category correctly', () => {
    const thread = {
      id: 'thread-1',
      category: 'React',
      createdAt: '2026-11-04T08:00:00.000Z',
      title: 'Belajar React',
      body: 'Saya sedang belajar React.',
      totalComments: 5
    }
    const owner = { name: 'Luky', avatar: null }

    render(
      <MemoryRouter>
        <ThreadItem thread={thread} owner={owner} />
      </MemoryRouter>
    )

    const category = screen.getByText('#React')
    expect(category).toBeInTheDocument()
  })

  it('should display thread date correctly', () => {
    const thread = {
      id: 'thread-1',
      category: 'React',
      createdAt: '2026-11-04T08:00:00.000Z',
      title: 'Belajar React',
      body: 'Saya sedang belajar React.',
      totalComments: 5
    }
    const owner = { name: 'Luky', avatar: null }

    render(
      <MemoryRouter>
        <ThreadItem thread={thread} owner={owner} />
      </MemoryRouter>
    )

    const threadDate = screen.getByText('4 November 2026')
    expect(threadDate).toBeInTheDocument()
  })

  it('should display thread title correctly', () => {
    const thread = {
      id: 'thread-1',
      category: 'React',
      createdAt: '2026-11-04T08:00:00.000Z',
      title: 'Belajar React',
      body: 'Saya sedang belajar React.',
      totalComments: 5
    }
    const owner = { name: 'Luky', avatar: null }

    render(
      <MemoryRouter>
        <ThreadItem thread={thread} owner={owner} />
      </MemoryRouter>
    )

    const threadTitle = screen.getByText('Belajar React')
    expect(threadTitle).toBeInTheDocument()
  })

  it('should navigate to thread detail when title is clicked', () => {
    const thread = {
      id: 'thread-1',
      category: 'React',
      createdAt: '2026-11-04T08:00:00.000Z',
      title: 'Belajar React',
      body: 'Saya sedang belajar React.',
      totalComments: 5
    }
    const owner = { name: 'Luky', avatar: null }

    render(
      <MemoryRouter>
        <ThreadItem thread={thread} owner={owner} />
      </MemoryRouter>
    )

    const threadLink = screen.getByRole('link', {
      name: 'Belajar React'
    })

    expect(threadLink).toHaveAttribute('href', '/threads/thread-1')
  })

  it('should display thread body correctly', () => {
    const thread = {
      id: 'thread-1',
      category: 'React',
      createdAt: '2026-11-04T08:00:00.000Z',
      title: 'Belajar React',
      body: 'Saya sedang belajar React.',
      totalComments: 5
    }
    const owner = { name: 'Luky', avatar: null }

    render(
      <MemoryRouter>
        <ThreadItem thread={thread} owner={owner} />
      </MemoryRouter>
    )

    const threadBody = screen.getByText('Saya sedang belajar React.')
    expect(threadBody).toBeInTheDocument()
  })

  it('should display owner avatar when avatar is available', () => {
    const thread = {
      id: 'thread-1',
      category: 'React',
      createdAt: '2026-11-04T08:00:00.000Z',
      title: 'Belajar React',
      body: 'Saya sedang belajar React.',
      totalComments: 5
    }
    const owner = {
      name: 'Luky',
      avatar: 'https://example.com/avatar.png'
    }

    render(
      <MemoryRouter>
        <ThreadItem thread={thread} owner={owner} />
      </MemoryRouter>
    )

    const avatar = screen.getByRole('img', { name: 'Luky' })
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.png')
  })

  it('should display owner initial when avatar is unavailable', () => {
    const thread = {
      id: 'thread-1',
      category: 'React',
      createdAt: '2026-11-04T08:00:00.000Z',
      title: 'Belajar React',
      body: 'Saya sedang belajar React.',
      totalComments: 5
    }
    const owner = { name: 'Luky', avatar: null }

    render(
      <MemoryRouter>
        <ThreadItem thread={thread} owner={owner} />
      </MemoryRouter>
    )

    const ownerInitial = screen.getByText('L')
    expect(ownerInitial).toBeInTheDocument()
  })

  it('should display question mark when owner name is unavailable', () => {
    const thread = {
      id: 'thread-1',
      category: 'React',
      createdAt: '2026-11-04T08:00:00.000Z',
      title: 'Belajar React',
      body: 'Saya sedang belajar React.',
      totalComments: 5
    }
    const owner = { name: null, avatar: null }

    render(
      <MemoryRouter>
        <ThreadItem thread={thread} owner={owner} />
      </MemoryRouter>
    )

    const fallbackInitial = screen.getByText('?')
    expect(fallbackInitial).toBeInTheDocument()
  })

  it('should display Unknown User when owner is unavailable', () => {
    const thread = {
      id: 'thread-1',
      category: 'React',
      createdAt: '2026-11-04T08:00:00.000Z',
      title: 'Belajar React',
      body: 'Saya sedang belajar React.',
      totalComments: 5
    }
    const owner = null

    render(
      <MemoryRouter>
        <ThreadItem thread={thread} owner={owner} />
      </MemoryRouter>
    )

    const ownerName = screen.getByText('Unknown User')
    expect(ownerName).toBeInTheDocument()
  })

  it('should display total comments correctly', () => {
    const thread = {
      id: 'thread-1',
      category: 'React',
      createdAt: '2026-11-04T08:00:00.000Z',
      title: 'Belajar React',
      body: 'Saya sedang belajar React.',
      totalComments: 5
    }
    const owner = { name: 'Luky', avatar: null }

    render(
      <MemoryRouter>
        <ThreadItem thread={thread} owner={owner} />
      </MemoryRouter>
    )

    const totalComments = screen.getByText('5 komentar')
    expect(totalComments).toBeInTheDocument()
  })
})
