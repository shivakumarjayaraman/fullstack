import { useState, useEffect } from 'react';
import Spinner from './Spinner';

/**
 * Session 14/21: HOC that fetches data from a URL and passes it as props.
 *
 * Usage:
 *   const UserListWithData = withDataFetching(UserList, '/users');
 *   <UserListWithData />   // data, loading, error are injected automatically
 */
function withDataFetching(WrappedComponent, dataUrl) {
  function WithDataFetchingComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      import('../services/api').then(({ default: api }) =>
        api.get(dataUrl)
          .then(res => setData(res.data))
          .catch(err => setError(err.message))
          .finally(() => setLoading(false))
      );
    }, []);

    if (loading) return <Spinner />;
    if (error) return <div>Error: {error}</div>;

    return <WrappedComponent data={data} {...props} />;
  }

  WithDataFetchingComponent.displayName = `withDataFetching(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithDataFetchingComponent;
}

export default withDataFetching;
