import ContentLoader from 'react-content-loader'

export const TaskSkeletonLoader = () => {
  return (
    <li className="list-none">
      <ContentLoader
        speed={2}
        width="100%"
        height={80}
        viewBox="0 0 400 80"
        backgroundColor="#e0e0e0"
        foregroundColor="#eeeeee"
        preserveAspectRatio="none"
      >
        <rect x="5" y="22" rx="3" ry="3" width="15" height="40" />

        <rect x="25" y="25" rx="3" ry="3" width="100" height="15" />
        <rect x="25" y="45" rx="3" ry="3" width="70" height="12" />

        <rect x="355" y="30" rx="3" ry="3" width="10" height="20" />
        <rect x="370" y="30" rx="3" ry="3" width="10" height="20" />
        <rect x="385" y="30" rx="3" ry="3" width="10" height="20" />
      </ContentLoader>
    </li>
  )
}
