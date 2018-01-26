export const mockFeed = [
  {
    key: 1,
    title: 'New release',
    date: new Date(),
    user: 'ollelauribostrom',
    description: 'created a new release in the repo ob222bw-examination-1',
    thumbnailUrl: 'https://avatars3.githubusercontent.com/u/23381822?s=200&v=4'
  },
  {
    key: 2,
    title: 'New Issue',
    date: new Date(),
    user: 'ollelauribostrom',
    description: 'opened a new issue in the repo ob222bw-examination-1',
    thumbnailUrl: 'https://avatars3.githubusercontent.com/u/23381822?s=200&v=4'
  },
  {
    key: 3,
    title: 'New release',
    date: new Date(),
    user: 'ollelauribostrom',
    description: 'created a new release in the repo ob222bw-examination-1',
    thumbnailUrl: 'https://avatars3.githubusercontent.com/u/23381822?s=200&v=4'
  },
]

export const mockOrganizations = [
  {
    name: '1dv527',
    description: 'A great organization',
    thumbnailUrl: 'https://avatars3.githubusercontent.com/u/23381822?s=200&v=4',
  },
  {
    name: '1dv023',
    description: 'A great organization',
    thumbnailUrl: 'https://avatars0.githubusercontent.com/u/12395417?s=200&v=4',
  }
]

export function mockFetch() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000)
  })
}