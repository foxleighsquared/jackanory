export const threeLevelLinks = [
  {
    label: 'Item 1',
    url: '/admin'
  },
  {
    label: 'Item 2',
    url: '#',
    links: [
      {
        label: 'Item 2.1',
        url: '#',
        links: [
          {
            label: 'Item 2.1.1',
            url: '#'
          },
          {
            label: 'Item 2.1.2',
            url: '#'
          },
          {
            label: 'Item 2.1.3',
            url: '#'
          }
        ]
      },
      {
        label: 'Item 2.2',
        url: '#'
      },
      {
        label: 'Item 2.3',
        url: '#'
      }
    ]
  },
  {
    label: 'Item 3',
    url: '#'
  }
];

export default threeLevelLinks;
