export default [
  {
    key: '1',
    icon: 'DashboardOutlined',
    title: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        key: '1-1',
        title: 'Production',
        path: '/dashboard',
      },
      {
        key: '1-2',
        title: 'Parameter',
        path: '/dashboard/parameter',
      },
    ],
  },
  {
    key: '2',
    icon: 'FileOutlined',
    title: 'Report',
    path: '/report',
    children: [
      {
        key: '2-1',
        title: 'Monthly',
        path: '/dashboard',
      },
      {
        key: '2-2',
        title: 'Yearly',
        path: '/dashboard/parameter',
      },
    ],
  },
  {
    key: '3',
    icon: 'DatabaseOutlined',
    title: 'Master Data',
    path: '/master',
    children: [
      {
        key: '3-1',
        title: 'Production',
        path: '/master-production',
      },
    ],
  },
  {
    key: '4',
    icon: 'UserOutlined',
    title: 'Admin',
    path: '/admin',
    children: [
      {
        key: '4.1',
        title: 'Account Control',
        path: '/account-control',
      },
    ],
  },
]
