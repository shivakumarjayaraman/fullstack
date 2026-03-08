import Spinner from './Spinner';

/**
 * Session 14/21: Higher-Order Component that injects a loading spinner.
 *
 * Usage:
 *   const UserListWithLoading = withLoading(UserList);
 *   <UserListWithLoading isLoading={loading} users={users} />
 */
function withLoading(WrappedComponent) {
  function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <Spinner />;
    }
    return <WrappedComponent {...props} />;
  }

  WithLoadingComponent.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name})`;
  return WithLoadingComponent;
}

export default withLoading;
